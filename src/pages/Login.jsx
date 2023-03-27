import { IconPhotoUp } from "@tabler/icons-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase";

const Login = () => {
  const { currentUser } = useAuth();

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">line</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit} action="">
          <input
            type="email"
            placeholder="メールアドレス"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="パスワード"
            autoComplete="password"
          />

          <button>ログイン</button>
          {err && <p>何かが間違っています</p>}
        </form>
        <p>
          お持ちでない方はこちら <Link to="/register">アカウント作成</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
