import React, { useState } from "react";
import AuthForm from "../components/AuthForm"; // import AuthForm component to be used in Login and Signup pages
import Input from "../components/Input"; // import Input component to be used in Login and Signup pages
import { BiUserPlus } from "react-icons/bi";
import Image from "../assets/signup.svg"; // Reference: https://undraw.co/

const Signup = () => {
  // state variables to store user information, by default they are empty strings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior of form submission
    // Add code here to handle signup logic - to be implemented in the backend
  };

  return (
    // pass different props defined in the AuthForm component
    <AuthForm
      // icon component for Signup form passed as props
      icon={<BiUserPlus className="text-blue-600" />}
      // title text for Signup form
      title="Create an account"
      // text for the link to the Login page
      linkText="Login"
      // URL for the link to the Login page
      to="/login"
      // pass handleSubmit function defined above as AuthForm component's props
      onSubmit={handleSubmit}
      // text for the submit button
      buttonText="Signup"
      // image source for the Signup form
      image={Image}
      // alt text for the image in the Signup form
      alt="Signup image"
      // text for the paragraph in the Signup form
      paragraph="Already have an account?"
    >
      <Input
        // input type for the email field
        type="email"
        // placeholder text for the email field
        placeholder="Email address"
        // value of the email field
        value={email}
        // event handler for changes in the email input field
        // updates the 'email' state variable with the new value entered by the user
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        // input type for the password field
        type="password"
        // placeholder text for the password field
        placeholder="Password"
        // value of the password field
        value={password}
        // event handler for changes in the password input field
        // updates the 'password' state variable with the new value entered by the user
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        // input type for confirm password field
        type="password"
        // placeholder text for the confirm password field
        placeholder="Confirm Password"
        // value of the confirm password field
        value={confirmPassword}
        // event handler for changes in the confirm password input field
        // updates the 'confirmPassword' state variable with the new value entered by the user
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default Signup;
