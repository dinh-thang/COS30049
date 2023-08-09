import { AiFillFacebook, AiOutlineInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
    return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl px-4 mx-auto">
        <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
          <li className="my-2"><a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="">Homepage</a></li>
          <li className="my-2"><a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="">Report</a></li>
          <li className="my-2"><a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="">About Us</a></li>
        </ul>
      </div>
      <div>
        <div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
          <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href=""
            ><AiFillFacebook className="text-3xl"/></a>
          <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href=""
            ><AiFillLinkedin className="text-3xl"/></a>
          <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href=""
            ><AiFillTwitterCircle className="text-3xl"/></a>
          <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href=""
            ><AiOutlineInstagram className="text-3xl"/></a>
        </div>
        <div className="ml-14 w-48">
          <h3 className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">Contact Us</h3>
          <hr />
          <h3 className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">Tel: (01) 2345 6789</h3>
          <h3 className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">cybersecurity@gmail.com</h3>
        </div>
      </div>
    </footer>
    )
}

export default Footer;