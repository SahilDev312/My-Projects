import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHomeVideo } from '../store/reducer/getHomeVideo';
import { IoMdSearch } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import { PiVideoCameraFill } from 'react-icons/pi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [regionCode, setRegionCode] = useState('US'); // Default region code
  const [relevanceLanguage, setRelevanceLanguage] = useState('en'); // Default language

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getHomeVideo({ query: searchQuery, isNext: false, regionCode, relevanceLanguage }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
      <div className="container mx-auto flex items-center p-3">
        <div className="flex-1 flex items-center">
          <GiHamburgerMenu size={24} className="mr-4 cursor-pointer" />
          <span className="flex items-center text-xl font-medium">
            <FaYoutube size={30} className="mr-2" />
            YouTube
          </span>
        </div>
        <div className="flex-1 flex justify-center">
          <form className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border-none outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white border-none cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
          <select
            value={regionCode}
            onChange={(e) => setRegionCode(e.target.value)}
            className="ml-4 border border-gray-300 rounded-lg"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            {/* Add more options as needed */}
          </select>
          <select
            value={relevanceLanguage}
            onChange={(e) => setRelevanceLanguage(e.target.value)}
            className="ml-4 border border-gray-300 rounded-lg"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex items-center ml-4">
          <IoNotifications size={24} className="mr-4 cursor-pointer" />
          <PiVideoCameraFill size={24} className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
