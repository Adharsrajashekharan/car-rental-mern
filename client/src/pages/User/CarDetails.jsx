import React, { useEffect, useState } from "react";
import Header from "../../components/UserComponents/Header/Header";
import Footer from "../../components/UserComponents/Footer/Footer";
import { Container, Row, Col } from "reactstrap";
import { useParams,useNavigate } from "react-router-dom";
import { DatePicker, Checkbox } from "antd";
import StripeCheckout from "react-stripe-checkout";
// import carData from "../../assets/UserAssets/data/carData";
// import BookingForm from "../../components/UserComponents/UI/BookingForm";
import PaymentMethod from "../../components/UserComponents/UI/PaymentMethod";
import { getallcars } from "../../redux/action/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { bookCar, bookCarOffline } from "../../redux/action/bookingActions";
import StripeContainer from "../../components/UserComponents/Payment/StripeContainer";
// import BookingForm from "../components/UI/BookingForm";
// import PaymentMethod from "../components/UI/PaymentMethod";
const CarDetails = () => {
  // const { slug } = useParams();
  const rangePickerStyle = {
    backgroundColor: "grey",
    color: "red",

    // Set the text color
  };
  const [car, setcar] = useState([]);
  const { carsid } = useParams();
  const { cars } = useSelector((a) => a.carsReducer);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getallcars());
    } else {
      //pass the use state function and returns the data for a specific id
      setcar(cars.find((o) => o._id == carsid));
    }
  }, [cars]);
  console.log("gff",car);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    console.log(values);
    console.log(values[0].format("MMM DD YYYY HH:mm"));
    console.log(values[1].format("MMM DD YYYY HH:mm"));
    setFrom(values[0].format("MMM DD YYYY HH:mm"));
    setTo(values[1].format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }
  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("User"))._id,
      car: car._id,
      totalAmount,
      totalHours,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCarOffline(reqObj));
    navigate('/userbookings')

  }
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("User"))._id,
      car: car._id,
      totalAmount,
      totalHours,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
    console.log(token);
    navigate('/userbookings')

  }

  return (
    <>
      <Header />
      <section>
        {/* <h1>carsid={car.name}</h1> */}
        <Container>
          <Row>
            <Col lg="6">
              <img src={car.image?car.image.url:''} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{car.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${car.rentPerHour}.00 / Hour
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    {/* {car.fuelType} */}

                    {/* ({singleCarItem.rating} ratings) */}
                  </span>
                </div>

                <p className="section__description">
                  {car.description}

                  {/* {/* {singleCarItem.description} */}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.model} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.automatic} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.speed} */}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.gps} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.seatType} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.fuelType}
                    {/* {singleCarItem.brand} */}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <h5 className="mb-4 p-3 fw-bold ">Select-time slots</h5>
                <RangePicker
                  style={rangePickerStyle}
                  className=" mx-4 mb-4 p-5 fw-bold"
                  showTime={{ format: "HH:mm" }}
                  format="MMM DD YYYY HH:mm"
                  onChange={selectTimeSlots}
                />
                <h5 className=" p-3 fw-bold ">Total hours:{totalHours}</h5>
                <Checkbox
                  className="p-3 fw-bold"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDriver(true);
                    } else {
                      setDriver(false);
                    }
                  }}
                >
                  Driver Required
                </Checkbox>
                {/* <BookingForm /> */}
                <h4 className=" p-3 fw-bold ">Total Amount:{totalAmount?totalAmount:"0"}</h4>
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 m-4 fw-bold p-5  ">Payment Information</h5>
                {/* <PaymentMethod /> */}
                <div className="payment">
                  <label htmlFor="" className="d-flex align-items-center gap-2">
                    <input type="radio"  onDoubleClick={bookNow}/> pay After Ride
                  </label>
                </div>

                <div className="payment mt-3">
                  <label htmlFor="" className="d-flex align-items-center gap-2">
                    <input type="radio" /> Cheque Payment
                  </label>
                </div>

                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                  <label htmlFor="" className="d-flex align-items-center gap-2">
                    <input type="radio" /> Paypal
                    <button onClick={bookNow}></button>
                  </label>
                </div>
                <div className="payment text-center mt-5">
                  <StripeCheckout
                    shippingAddress
                    token={onToken}
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
                  >
                    <button>Reserve Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CarDetails;