import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../../styles/UserStyles/header.css";
import { Button } from "antd";
import { Menu, Dropdown } from 'antd';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  // {
  //   path: "/messenger",
  //   display: "Message",
  // },

  // {
  //   path: "/blogs",
  //   display: "Blog",
  // },
  {
    path: "/contact",
    display: "Contact",
  },
];



const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [selectedCountry, setSelectedCountry] = useState("choose state");

  function handleCountryChange(value) {
    console.log("nam",name)
    setSelectedCountry(value);
    navigate(`/${value.toLowerCase()}`);
  }

  const User =localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null
  // const userInfo =  localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : " "


const login=()=>{
  navigate("/login");
}

  const logout = () => {
    localStorage.clear()
    navigate("/login");
  };

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const items = [
    {
      key: "1",
      label: (
        <Link to='/userbookings'>

Bookings


        </Link>
       
      ),
    },
    {
      key: "2",
      label: (
        <Link to='/profile'>
        
        Profile
        </Link>
        
      ),
    },
    {
      key: "3",
      label: (
        <a
        onClick={logout}
        style={{ backgroundColor: "black", color: "white" }}
        className=" d-flex align-items-center gap-1"
      >
        <i class="ri-user-line"></i> Logout
        </a>
      ),
    },
  ];
  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +1-202-555-0149
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
               
           

            {User ? (
    <Dropdown menu={{ items }} placement="bottom">
      <Button>{User.name}</Button>
    </Dropdown>
  ) : (
    <Button onClick={login}>Login</Button>
  )
}

              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/" className=" d-flex align-items-center gap-2">
                    {/* <i class="ri-car-line"></i> */}
                    <span>
                      Dream Ride <br /> Rentals
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

    

{/* <Col lg={3} md={3} sm={4}>
      <div className="header__location d-flex align-items-center gap-2">
      <span>
          <i class="ri-earth-line"></i>
        </span>
        <div className="header__location-content">
          <h4 className="header__location-content">
            <span>{selectedCountry}</span>
          </h4>
          <h6 className="location-selector__subtitle">
            <span className="location-selector__dropdown">
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="form-select location-selector__select"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </span>
          </h6>
        </div>
      </div>
    </Col> */}


<Col lg={3} md={3} sm={4}>
      <div className="header__location d-flex align-items-center gap-2">
        <span>
          <i className="ri-earth-line"></i>
        </span>
        <div className="header__location-content">
          <h4 className="header__location-content">
            <span>{selectedCountry}</span>
          </h4>
          <h6 className="location-selector__subtitle">
            <span className="location-selector__dropdown">
            <Select value={selectedCountry} onChange={handleCountryChange}>
      <Option value="trivandrum">Trivandrum</Option>
      <Option value="ernakulam">Ernakulam</Option>
      <Option value="kozhikode">Kozhikode</Option>
    </Select>
            </span>
          </h6>
        </div>
      </div>
    </Col>

 



            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <Link to="/contact">
              <div className="header__btn btn ">
                
                  <i class="ri-phone-line"></i> Request a call
              </div>
              </Link>

            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div> */}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
