import React, { useEffect,useState }  from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
function Navigationbar() {
  let [host, setHost] = useState("");
  const navigate = useNavigate();
    const activeLink = {
      color: "49EA46",
      fontSize: "1.2rem",
      fontWeight: "bold",
    };
  
    const inactiveLink = {
      color: "49EA46" ,
      fontSize: "1.2rem",
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
  
      axios
        .post("http://localhost:5000/user-api/pathjump", { token: token })
        .then((res) => {
          if (res.data.success !== true) {
            localStorage.clear();
            localStorage.clear();
            setHost("");
            navigate("/");
          } else {
            const user = localStorage.getItem("user");
            setHost(user);
          }
        })
        .catch((err) => alert("Error: " + err.message));
    }, [localStorage.getItem("user")]);

    let logoutUser=()=>{
      localStorage.clear();
      navigate('/login')
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/WLM_logo-2.svg/404px-WLM_logo-2.svg.png"
              width="60px"
              className="shadow"
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  style={({ isActive }) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                >
                  Home
                </NavLink>
              </li>
              {
                host.length !== 0 ?
                (<li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Chatall"
                  style={({ isActive }) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                >
                  Chatbox
                </NavLink>
              </li> )
              : (
              <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/register"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Register
              </NavLink>
            </li>)
              }
                
              { host.length === 0 ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    style={({ isActive }) => {
                      return isActive ? activeLink : inactiveLink;
                    }}
                  >
                    Login
                  </NavLink>
                </li>
               ) : (
               <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    style={({ isActive }) => {
                      return isActive ? activeLink : inactiveLink;
                    }}
                    onClick={logoutUser}
                  >
                    Logout
                  </NavLink>
                </li> 
            )}
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  

export default Navigationbar