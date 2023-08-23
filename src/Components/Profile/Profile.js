import React from "react";
import basestyle from "../Base.module.css";
const Profile = ({ setUserState, username }) => {
  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <a href="/login">
      <button
        className={basestyle.button_common}
        style={{cursor:"pointer"}}
      >
        Logout
      </button>
      </a>
    </div>
  );
};
export default Profile;
