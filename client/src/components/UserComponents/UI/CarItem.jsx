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

 


  function disabledDate(current) {
    // can't select days before today
    return current && current < new Date(Date.now() - 86400000); // 86400000 is the number of milliseconds in a day
  }


//   function setFilter(values) {
//     var selectedFrom = values[0].format("MMM DD YYYY HH:mm");
//     var selectedTo = values[1].format("MMM DD YYYY HH:mm");
//     console.log(selectedFrom, selectedTo);
//     var temp = [];
  
//     for (var car of cars) {
//       if (car.bookedTimeSlots.length == 0) {
//         temp.push(car);
//       } else {
//         // for (var booking of car.bookedTimeSlots) {
//           // console.log("first",typeof(booking))
//           car.bookedTimeSlots.forEach(element => {

//          var bookingFrom = new Date(element.from);
//           var bookingTo = new Date(element.to);
//           console.log("object1111",bookingFrom)
//           console.log("object2222",bookingTo)

//           if (
//             (new Date(selectedFrom) >= bookingFrom && new Date(selectedFrom) <= bookingTo) ||
//             (new Date(selectedTo) >= bookingFrom && new Date(selectedTo) <= bookingTo) ||
//             (bookingFrom >= new Date(selectedFrom) && bookingFrom <= new Date(selectedTo)) ||
//             (bookingTo >= new Date(selectedFrom) && bookingTo <= new Date(selectedTo))
//           ) {
//             // do nothing
//           } else {
//             temp.forEach(el=>{
//               if(el._id != car._id){
//                 temp.push(car);
//               }else{
//                 return ;

//               }
//             })
            
//           }
//  });
//           // var bookingFrom = new Date(booking.from);
//           // var bookingTo = new Date(booking.to);
  
//           // if (
//           //   (new Date(selectedFrom) >= bookingFrom && new Date(selectedFrom) <= bookingTo) ||
//           //   (new Date(selectedTo) >= bookingFrom && new Date(selectedTo) <= bookingTo) ||
//           //   (bookingFrom >= new Date(selectedFrom) && bookingFrom <= new Date(selectedTo)) ||
//           //   (bookingTo >= new Date(selectedFrom) && bookingTo <= new Date(selectedTo))
//           // ) {
//           //   // do nothing
//           // } else {
//           //   temp.push(car);
//           // }
//         // }
//       }
//     }
  
//     settotalcars(temp);
//   }
  


  
   



function setFilter(values) {
  var selectedFrom = values[0].format("MMM DD YYYY HH:mm");
  var selectedTo = values[1].format("MMM DD YYYY HH:mm");
  console.log(selectedFrom, selectedTo);
  var temp = [];

  for (var car of cars) {
    var hasOverlap = false;
    for (var booking of car.bookedTimeSlots) {
      var bookingFrom = new Date(booking.from);
      var bookingTo = new Date(booking.to);

      if (
        (new Date(selectedFrom) >= bookingFrom && new Date(selectedFrom) <= bookingTo) ||
        (new Date(selectedTo) >= bookingFrom && new Date(selectedTo) <= bookingTo) ||
        (bookingFrom >= new Date(selectedFrom) && bookingFrom <= new Date(selectedTo)) ||
        (bookingTo >= new Date(selectedFrom) && bookingTo <= new Date(selectedTo))
      ) {
        hasOverlap = true;
        break; // exit the loop early if there is an overlap
      }
    }
    if (!hasOverlap) {
      temp.push(car);
    }
  }

  settotalcars(temp);
}







  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallcars());
    console.log("this is total cars",totalcars)
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
            disabledDate={disabledDate}
          />
        </Col>
      </Row>
      {/* {loading == true && <Spinner />} */}
      {totalcars?.map((cars) => {
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
