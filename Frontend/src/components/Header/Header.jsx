import React from 'react';
import {Link , NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0 ml-0 mr-0 mt-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 rounded-lg">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                   <Link className="flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJVwPr9yvbMr7n-Jd6tbI4qHKb6uUNM887w&s"
                            className="mr-3 h-12 w-full rounded-md"
                            alt="Logo"
                        /> 
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                        to='/Login'
                            className="bg-slate-400 text-white  hover:bg-red-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                        to='/Signup'
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Sign up
                        </Link>
                    </div>
                    <div
                        className=" hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to='/'
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                >
                                    About
                                </button>
                            </li>

                            <li>
                                <button
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                >
                                    Contact
                                </button>
                            </li>

                            <li>
                                <button
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                >
                                    Github
                                </button>
                            </li>
                            <li>
                                <button
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                >
                                    Finance
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
