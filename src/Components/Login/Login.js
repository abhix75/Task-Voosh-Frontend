import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    phone_number: "",
    password: "",
  });

  const validateForm = () => {
    let errors = {};
    if (!user.phone_number) {
      errors.phone_number = "Phone number is required.";
    }
    if (!user.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new URLSearchParams();
      formData.append("phone_number", user.phone_number);
      formData.append("password", user.password);

      axios
        .post("http://localhost:3000/api/v1/user/signin", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          setUserState(res.data.user);
          navigate("/", { replace: true });
        }).catch((error) => {
          alert("Invalid username or password")});
    }
  }, [formErrors, isSubmit]);

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          placeholder="Phone Number"
          onChange={changeHandler}
          value={user.phone_number}
        />
        <p className={basestyle.error}>{formErrors.phone_number}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button
          className={basestyle.button_common}
          onClick={loginHandler}
          style={{ cursor: "pointer" }}
        >
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
