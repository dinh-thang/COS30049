import { Link } from "react-router-dom";

// TODO: update Link component
const Hero = ({image, heading, button}) => {
  return (
    <div className="mt-16 max-w-6xl mx-auto sm:px-6 lg:px-8 relative sm:rounded-2xl sm:overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt="Digital Bitcoin"
        />
        <div className="absolute inset-0 bg-gray-600 mix-blend-multiply"></div>
      </div>
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-24 lg:px-8">
        <p className="text-center text-4xl text-white font-extrabold sm:text-5xl lg:text-6xl">
            {heading}
        </p>
        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
        Having trouble wondering if your code is safe? Try out now with our new project that can help you determine if your product is safe or not with 99.999% accuracy.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <Link
            to=""
            className="flex items-center justify-center px-4 py-3 rounded text-white bg-cyan-700 bg-opacity-100 hover:bg-opacity-80 sm:px-8"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
