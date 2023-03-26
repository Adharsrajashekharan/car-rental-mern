
import React, { useState, useEffect } from "react";
import { Card } from "antd";
import config from "../../config";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Header from "../../components/UserComponents/Header/Header";

const CarUsa = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

        const response = await config.get("/api/v1/user/trivandrum");
        const bookingCars = response.data;
        setBookings(bookingCars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
    <Header />

    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {bookings.map((cars) => {
        return (
          <Col lg="4" md="4" sm="6" className="mb-5">
            <div className="car__item">
              <div className="car__img">
                <img src={cars.image.url} alt="" className="w-100" />
              </div>

              <div className="car__item-content mt-4">
                <h4 className="section__title text-center">{cars.name}</h4>
                <h6 className="rent__price text-center mt-">
                  ${cars.rentPerHour}.00 <span>/ Day{cars.length}</span>
                </h6>

                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-car-line"></i> 2012
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-settings-2-line"></i> automatic
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-speed-line"></i> 90km/hr
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-timer-flash-line"></i> 9-5
                  </span>
                </div>
                <Link style={{ color: "white" }} to={`/booking/${cars._id}`}>
                  <button className=" w-50 car__item-btn car__btn-rent">
                    Rent
                  </button>
                </Link>
                {/* <Link to={"/booking"}>
                <button>hh</button>
                </Link> */}
                <Link style={{ color: "white" }} to={`/booking/${cars._id}`}>
                  <button className=" w-50 car__item-btn car__btn-details">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </Col>
        );
      })}

    </div>
    </>
  );
};

export default CarUsa;




