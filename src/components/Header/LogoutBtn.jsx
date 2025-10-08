import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth/auth.js";
import { logout } from "../../store/authSlice.js";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        type="button"
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logOutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
