import React from "react";
import Image from "../assets/hacker-mind.svg";

const Login = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Sign in to your account</h1>
      <div className="flex flex-col md:flex-row">
        <form action=""></form>
        <img src={Image} alt="Hacker mind" />
      </div>
    </>
  );
};

export default Login;
