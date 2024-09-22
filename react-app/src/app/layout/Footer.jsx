import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white-900 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl font-bold">About Us</h2>
            <p className="mt-2">We are a team of passionate writers dedicated to bringing you insightful articles on various topics.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-2">Email: contact@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div>
          <ul className="flex md:flex-colum flex-col md:items-center md:gap-[2vw] gap-2">
                    <li>
                        <Link className="hover:text-gray-500" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" to="/blog">Blog</Link>
                    </li>
                    <li>
                         <Link className="hover:text-gray-500" to="/Categories">Categories</Link>
                     </li>
                    <li>
                        <Link className="hover:text-gray-500" to="/">Contact Us</Link>
                    </li>
                </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Your Blog. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;