import { IconPhotoUp } from "@tabler/icons-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { auth, db, storage } from "../firebase";

const Register = () => {
  const { currentUser } = useAuth();

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // const res = await signUp(email, password);
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const storageRef = ref(storage, displayName);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (error) {
          setErr(true);
        }
      });
    });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">line</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder="名前" autoComplete="off" />
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
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            autoComplete="file"
          />
          <label htmlFor="file">
            <IconPhotoUp />
            <span>Add an avatar</span>
          </label>

          <button>アカウント作成</button>
        </form>
        <p>
          アカウントはお持ちですか？ <Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
