import { Link } from "react-router-dom"; // import Link component from React router to enable routing between pages

// Hero component with an image background, heading, paragraph, and button
const Hero = ({image, heading, linkText, paragraph, to, alt}) => {
  return (
    // container for hero section 
    <section className="mt-10 max-w-6xl mx-auto px-6 lg:px-8 relative sm:rounded-2xl sm:overflow-hidden ">
      <div className="absolute inset-0">
        {/* background image */}
        {/* the image source and alt text for the image will be passed as props to the component */}
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={alt}
        />
        {/* overlay for the image by applying blending mode, add a translucent layer on top of the image */}
        <div className="absolute inset-0 bg-gray-600 mix-blend-multiply"></div>
      </div>
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-24 lg:px-8">
        {/* heading and paragraph passed as props to the component */}
        <p className="text-center text-4xl font-extrabold text-white lg:text-6xl">
            {heading}
        </p>
        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
          {paragraph}
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          {/* link to other pages and link text will be passed as props */}
          <Link
            to={to}
            className="flex items-center justify-center px-4 py-3 rounded text-white bg-cyan-700 bg-opacity-100 hover:bg-opacity-80 sm:px-8"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
