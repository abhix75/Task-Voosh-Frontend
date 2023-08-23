import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = ({ setUserState }) => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.phone) {
      errors.phone = "Phone Number is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Confirm password and password should be same";
    }
    return errors;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new URLSearchParams();
      formData.append("name", user.name);
      formData.append("phone_number", user.phone);
      formData.append("password", user.password);

      axios
        .post("http://localhost:3000/api/v1/user/signup", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          alert(res.data.message);
          setUserState(res.data.user);
          navigate("/login", { replace: true });
        })
        .catch((error) => {
          // Handle error
          console.error("Error signing up:", error);
        });
    }
  }, [formErrors, isSubmit]);

  return (
    <div className={registerstyle.register}>
      <form>
        <h1>Create your account</h1>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={changeHandler}
          value={user.name}
        />
        <p className={basestyle.error}>{formErrors.name}</p>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          onChange={changeHandler}
          value={user.phone}
        />
        <p className={basestyle.error}>{formErrors.phone}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={changeHandler}
          value={user.cpassword}
        />
        <p className={basestyle.error}>{formErrors.cpassword}</p>
        <button className={basestyle.button_common} onClick={signupHandler}>
          Register
        </button>
      </form>
      <NavLink to="/login">Already registered? Login</NavLink>
    </div>
  );
};

export default Register;
