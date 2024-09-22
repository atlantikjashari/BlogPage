import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import axios from "axios";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7153/api/roles/getallusers"
        ); //5052
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg flex-5 m-[50px]">
      <UserTable users={users} style={{ marginTop: "20px" }} />
    </div>
  );
}
