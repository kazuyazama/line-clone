import { signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="navbar">
      <span className="logo">LINE CLONE</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>ログアウト</button>
      </div>
    </div>
  );
};

export default Navbar;
