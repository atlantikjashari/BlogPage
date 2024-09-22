import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddRoleForm() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7153/api/roles", null, {
        params: {
          name: role,
        },
      });
      navigate("/admin/roles");
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  return (
    <div style={{ display: "flex", margin: "0 auto" }}>
      <div style={{ flex: 5, margin: "50px" }}>
        <div className="top gap-4 mb-4 text-center font-bold">
          <h1>Add/Edit</h1>
        </div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Role
            </label>
            <input
              type="role"
              id="role"
              value={role}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link to="/admin/roles">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleRoleSave}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
