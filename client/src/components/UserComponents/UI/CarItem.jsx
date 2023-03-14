import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../styles/UserStyles/car-item.css";
import { getallcars } from "../../../redux/action/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { DatePicker, Row } from "antd";
import { DateTime } from 'luxon';

const CarItem = (props) => {
  const { cars } = useSelector((a) => a.carsReducer);
  const { loading } = useSelector((a) => a.alertsReducer);
  const [totalcars, settotalcars] = useState([]);
  const { RangePicker } = DatePicker;

 

  function setFilter(values) {
    var selectedFrom = values[0].format("MMM DD YYYY HH:mm");
    var selectedTo = values[1].format("MMM DD YYYY HH:mm");
    console.log(selectedFrom, selectedTo);
    var temp = [];
  
    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          var bookingFrom = new Date(booking.from);
          var bookingTo = new Date(booking.to);
  
          if (
            (new Date(selectedFrom) >= bookingFrom && new Date(selectedFrom) <= bookingTo) ||
            (new Date(selectedTo) >= bookingFrom && new Date(selectedTo) <= bookingTo) ||
            (bookingFrom >= new Date(selectedFrom) && bookingFrom <= new Date(selectedTo)) ||
            (bookingTo >= new Date(selectedFrom) && bookingTo <= new Date(selectedTo))
          ) {
            // do nothing
          } else {
            temp.push(car);
          }
        }
      }
    }
  
    settotalcars(temp);
  }
  


  
  //   const fromDate = moment(values[0], "MMM DD YYYY HH:mm");
      // function setFilter(values) {
    // console.log(values);
    // console.log(values[0].format("MMM DD YYYY HH:mm"));
    // console.log(values[1].format("MMM DD YYYY HH:mm"));
    // setFrom(values[0].format("MMM DD YYYY HH:mm"));
    // setTo(values[1].format("MMM DD YYYY HH:mm"));
    // setTotalHours(values[1].diff(values[0], "hours"));
//   const toDate = moment(values[1], "MMM DD YYYY HH:mm");
//   console.log("fdf444", fromDate, toDate);

//   const temp = [];

//   for (let car of totalcars) {
//     if (car.bookedTimeSlots.length === 0) {
//       temp.push(car);
//     } else {
//       let isAvailable = true;
//       for (let booking of car.bookedTimeSlots) {
//         if (
//           fromDate.isBetween(booking.from, booking.to) ||
//           toDate.isBetween(booking.from, booking.to) ||
//           moment(booking.from).isBetween(fromDate, toDate) ||
//           moment(booking.to).isBetween(fromDate, toDate)
//         ) {
//           isAvailable = false;
//           break;
//         }
//       }
//       if (isAvailable) {
//         temp.push(car);
//       }
//     }
//   }
//   settotalcars(temp);
// }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallcars());
  }, []);

  useEffect(() => {
    settotalcars(cars);
  }, [cars]);

  const { imgUrl, model, carName, automatic, speed, price, time } = props.item;

  return (
    <>
      {/* <FindCarForm /> */}

      <Row>
        <Col lg="6" className="p-1 about_section-item">
          Check for the available dates
        </Col>
      </Row>
      <Row>
        <Col className="p-3">
          <RangePicker
            className="fw-bold padding br"
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            style={{ height: 2, width: 200, padding: 20 }}
            onChange={setFilter}
          />
        </Col>
      </Row>
      {loading == true && <Spinner />}
      {totalcars.map((cars) => {
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
                    <i class="ri-car-line"></i> {model}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-settings-2-line"></i> {automatic}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-speed-line"></i> {speed}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-timer-flash-line"></i> {time}
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
    </>
  );
};

export default CarItem;
