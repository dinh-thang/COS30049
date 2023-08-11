import { MdOutlineSecurity } from 'react-icons/md';

const NavBar = () => {
    return (
        <div>
            <nav className="bg-white dark:bg-gray-800 shadow ">
            <div className="mx-3">
                <div className="flex items-center justify-between h-16">
                    <div className="w-full justify-between flex items-center">
                        <a className="flex-shrink-0 flex items-center justify-between text-2xl text-white font-serif" href="/">
                        <MdOutlineSecurity className="text-3xl text-white mr-5"/>Cyber Tech
                        </a>
                        <div className="hidden md:block">
                        <div className="flex items-baseline ml-10 space-x-4">
                            <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                Homepage
                            </a>
                            <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                Report
                            </a>
                            <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                About Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
        </div>
    )
}

export default NavBar;