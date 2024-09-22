import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoleTable from "./RoleTable";

export default function RoleDashboard() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://localhost:7153/api/roles"); //5052
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ml-[50px]">
        <h1 className="font-bold">Add Role</h1>
        <div className="flex flex-row justify-center items-center gap-4">
          <Link to="/admin/roles/add" className="w-fit h-fit">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              Add New Role
            </button>
          </Link>
          <Link to="/admin/roles/user/add" className="w-fit h-fit">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              Add User to Role
            </button>
          </Link>
          <Link to="/admin/roles/user/delete" className="w-fit h-fit">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              Remove User from Role
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg flex-5 m-[50px]">
        <RoleTable roles={roles} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}
