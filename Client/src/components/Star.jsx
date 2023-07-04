import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ProfileContext } from "../app/ProfileContext";

const Star = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lidm-production.up.railway.app/LeaderBoard"
        );

        setLeaderboard(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve the profile name from local storage on page load
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfileName && storedProfilePhoto) {
      setProfileName(storedProfileName);
      setProfilePhoto(storedProfilePhoto);
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = leaderboard.slice(startIndex, endIndex);

  // if (!leaderboard || !profileName || !profilePhoto) {
  //   // Render a loading state or return null if data is not available yet
  //   return null;
  // }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-[90%] mx-24 px-24">
        <div className="flex justify-between  h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Leaderboard</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profilePhoto} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">{profileName}</h1>
            </Link>
          </div>
        </div>

        <div className="h-full bg-white mt-10 rounded-xl shadow-lg">
          <table className="h-full w-[95%] bg-white m-5">
            <thead>
              <tr>
                <th className="bg-white font-semibold text-left px-8 py-4">
                  Nama
                </th>
                <th className="bg-white font-semibold text-left px-8 py-4">
                  Asal Sekolah
                </th>
                <th className="bg-white font-semibold text-center px-8 py-4">
                  Nilai
                </th>
                <th className="bg-white font-semibold text-center px-8 py-4">
                  Peringkat
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((leader, index) => (
                <tr key={index} className="hover:bg-[#F4F4F4]">
                  <td className="border-t-2 font-medium px-8 py-4 border-[#CDCCEE]">
                    <div className="flex items-center">
                      {leader.name}
                    </div>
                  </td>
                  <td className="border-t-2 font-medium px-8 py-4 border-[#CDCCEE]">
                    <div>{leader.asal_instansi}</div>
                  </td>
                  <td className="border-t-2 text-center font-medium px-8 py-4 border-[#CDCCEE]">
                    {leader.score}
                  </td>
                  <td className="border-t-2 text-center font-medium px-8 py-4 border-[#CDCCEE]">
                    {startIndex + index + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-6">
            <ul className="flex">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`mx-1 ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                >
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Star;
