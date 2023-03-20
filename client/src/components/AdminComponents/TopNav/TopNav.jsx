// import React from "react";
// import { Link } from "react-router-dom";
// import profileImg from "../../../assets/AdminAssets/images/profile-02.png";
// import navLinks from "../../../assets/AdminAssets/dummy-data/navLinks";
// import "./top-nav.css";
// import { NavLink } from "react-router-dom";

// const TopNav = () => {
//   return (
//     <div className="top__nav">
//       <div className="top__nav-wrapper">
//         {/* <div className="search__box">
//           <input type="text" placeholder="search or type" />
//           <span>
//             <i class="ri-search-line"></i>
//           </span>
//         </div> */}
//         <ul className="navbar">
//             {navLinks.map((item, index) => (
//               <li className="navbar hello" key={index}>
//                 <NavLink
//                   to={item.path}
//                   className={(navClass) =>
//                     navClass.isActive ? "nav__active nav__link" : "nav__link"
//                   }
//                 >
//                   <i className={item.icon}></i>

//                   {item.display}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         <div className="top__nav-right">
//           <span className="notification">
//             <i class="ri-notification-3-line"></i>
//             <span className="badge">1</span>
//           </span>
//           <div className="profile">
//             <Link to="/settings">
//               <img src={profileImg} alt="" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopNav;
import React from "react";
import socketIOClient from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import profileImg from "../../../assets/AdminAssets/images/profile-02.png";
import navLinks from "../../../assets/AdminAssets/dummy-data/navLinks";
// import logoImg from "../../../assets/AdminAssets/images/logo.png";
import "./top-nav.css";
import { useDispatch } from "react-redux";
const TopNav = () => {



   const User =localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null












  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
       
        <ul className="navbar">
          {navLinks.map((item, index) => (
            <li className="navbar hello" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav__active nav__link" : "nav__link"
                }
              >
                <i className={item.icon}></i>
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="top__nav-right">
          <span className="notification">
            <i class="ri-notification-3-line"></i>
            <span className="badge">1</span>
          </span>
          <div className="profile">
            <Link to="/settings">
              <img src={profileImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
