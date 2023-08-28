import { Link } from "react-router-dom"; // import link component from react-router-dom to route between pages

// Authentication Form component to be used in Login and Signup pages 
// because both pages have the same layout, styling and functionality, just different props such as icon, title etc.
const AuthForm = ({
  icon, // icon to be displayed in the form
  title, // title of the form
  linkText, // text for the link in the form
  to, // URL for the link in the form
  onSubmit, // function to be called when the form is submitted
  buttonText, // text for the submit button
  children, // input components to be rendered inside the form
  image, // image source for the form
  alt, // alt text for the image
  paragraph, // text for the paragraph in the form
}) => {
  return (
    // the form will have grid layout, with 1 column in small screen i.e mobile, tablet version, and 2 cols in large screen i.e desktop version
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* the first section of the grid is the header, form and submit button */}
      <section className="px-6">
          {/* use flexbox i.e. flex and flex-col Tailwind classes to align the icon, title and form */}
        <header className="flex flex-col justify-center items-center my-4">
          {/* display icon and title as part of form header */}
          <h1 className="text-center text-3xl lg:text-4xl font-extrabold mb-1 flex flex-col items-center">
            {icon}
            {title}
          </h1>
          <div className="flex items-center">
            {/* display the paragraph that will be passed as props to the component */}
            <p>{paragraph}</p>
            {/* link to Signup or Login page */}
            <Link
              to={to}
              className="text-blue-600 hover:text-blue-900 font-semibold ml-1.5"
            >
              {linkText}
            </Link>
          </div>
        </header>
        <form onSubmit={onSubmit} className="mt-8">
          {/* children are the Input component(s) to be rendered when used in Login and Signup pages */}
          {children}
          {/* display the submit button */}
          <button
            type="submit"
            className="group relative w-full py-2 px-4 border rounded-lg text-white bg-blue-600 hover:bg-blue-700 my-3"
          >
            {buttonText}
          </button>
        </form>
      </section>
      {/* 2nd section of grid is the image */}
      {/* image source and alt text for the image will be passed as props to the component */}
      <img src={image} alt={alt} />
    </div>
  );
};

export default AuthForm;
