import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { BiLogIn } from "react-icons/bi";
import Input from "../components/Input";
import Image from "../assets/login.svg"; // Reference: https://undraw.co/

// Login page: for account management and retrieval of previous reports
// Login page rendered using AuthForm component which provides layout for the form
const Login = () => {
  // state variables to store and keep track of email and password, by default they are empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior of form submission
    // code to handle login logic - to be implemented in the backend
  };

  return (
    // pass different props defined in the AuthForm component 
    <AuthForm
      // props for the icon component for Login form
      icon={<BiLogIn className="text-blue-600" />}
      // props for the title text for Login form
      title="Login to your account"
      // text for the link to the Signup page
      linkText="Signup"
      // URL for the link to the Signup page
      linkUrl="/signup"
      // function to handle form submission
      onSubmit={handleSubmit}
      // text for the submit button
      buttonText="Login"
      // URL for the link in the paragraph
      to="/signup"
      // image source for the Login form
      image={Image}
      // alt text for the image in the Login form
      alt="Login image"
      // text for the paragraph in the Login form
      paragraph="Don't have an account yet?"
    >
      <Input
        // Input type for the email field
        type="email"
        // Placeholder text for the email field
        placeholder="Email address"
        // Value of the email field
        value={email}
        // event handler for changes in the email input field
        // updates the 'email' state variable with the new value entered by the user
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        // Input type for the password field
        type="password"
        // Placeholder text for the password field
        placeholder="Password"
        // Value of the password field
        value={password}
        // event handler for changes in the password input field
        // updates the 'password' state variable with the new value entered by the user
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default Login;
