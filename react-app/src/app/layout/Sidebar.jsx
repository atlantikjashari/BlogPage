import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
    navigate(0);
  }
    
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li onClick={handleHomeClick}>
            <DashboardIcon className="icon" />
            <span>Go to Homepage</span>
          </li>

          <p className="title">Lists</p>
          <Link to="/admin/articles" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Articles</span>
            </li>
          </Link>
          <Link to="/admin/comments" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Comments</span>
            </li>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/roles" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Roles</span>
            </li>
          </Link>
          <p className="title">User</p>

          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
