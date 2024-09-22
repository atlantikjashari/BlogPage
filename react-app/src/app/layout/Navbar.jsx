import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import axios from "axios";

export default function Navbar({ history }) {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Instead of useHistory
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const handleSearch = async () => {
    try {
      navigate(`/search?q=${searchQuery}`); // Instead of history.push
    } catch (error) {
      console.error("Error searching articles:", error);
    } finally {
      setSearchQuery(""); // Clear the search box
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      axios
        .get("https://localhost:7153/api/authentication")
        .then((res) => {
          console.log(res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  const handleDropDown = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("jwt");
    dispatch(
      setUser({
        token: "",
        firstName: "",
        userName: "",
        roli: "",
        email: "",
      })
    );
    navigate("/blog");
  };

  return (
    <header className="bg-white h-[15%]">
      <nav className="flex justify-between items-center w-[92%] mx-auto h-full">
        <div>
          <h1 className="w-36 font-bold text-3xl cursor-pointer">Blog Page</h1>
        </div>
        <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[50vh] left-0 ${
            toggle === true ? "top-[15%]" : "top-[-100%]"
          } md:w-auto  w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link className="hover:text-gray-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/Categories">
                Categories
              </Link>
            </li>
            {/* <li>
              <Link className="hover:text-gray-500" to="/">
                Contact Us
              </Link>
            </li> */}
            {toggle === true ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="border rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="flex items-center gap-6 hidden sm:block">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="border rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          {user.userName ? (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                onClick={handleDropDown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://res.cloudinary.com/djcyviakx/image/upload/v1714091393/vecteezy_user-profile-vector-flat-illustration-avatar-person-icon_37336395_hbsh4w.jpg"
                  alt=""
                />
              </button>
              <div
                className={`z-50 ${
                  open ? "" : "hidden"
                } absolute top-[70px] right-[50px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">
                    {user.firstName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2">
                  {user.roli.includes("Administrator") ? (
                    <li>
                      <Link
                        to="/admin/articles"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <Link
                      to="/articles"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Articles
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={handleLogOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/LogInForm"
              className="bg-blue-800 text-white px-5 py-2 rounded-full hover:bg-blue-900"
            >
              Log in
            </Link>
          )}
          {toggle === false ? (
            <FontAwesomeIcon
              icon={faBars}
              className="text-3xl cursor-pointer md:hidden"
              onClick={onToggleMenu}
            />
          ) : (
            <FontAwesomeIcon
              icon={faX}
              className="text-3xl cursor-pointer md:hidden"
              onClick={onToggleMenu}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
