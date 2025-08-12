import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdSubscriptions, MdVideoLibrary, MdOutlineWatchLater } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col z-10">
      <div className="p-4 text-xl font-bold bg-gray-900">
        Menu
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="list-none p-0 m-0">
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <AiFillHome size={24} className="mr-3" />
            <span>Home</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <SiYoutubeshorts size={24} className="mr-3" />
            <span>Shorts</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <MdSubscriptions size={24} className="mr-3" />
            <span>Subscriptions</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <MdVideoLibrary size={24} className="mr-3" />
            <span>Library</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <FaHistory size={24} className="mr-3" />
            <span>History</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <MdOutlineWatchLater size={24} className="mr-3" />
            <span>Watch Later</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
