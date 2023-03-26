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
  const [dateRange, setDateRange] = useState([]);
  const [pickupAddress, setPickupAddress] = useState('');


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
    setDateRange(values);

  }
  // function bookNow() {
  //   const reqObj = {
  //     user: JSON.parse(localStorage.getItem("User"))._id,
  //     car: car._id,
  //     totalAmount,
  //     totalHours,
  //     place:car.pickType,
  //     pickupAddress,
  //     driverRequired: driver,
  //     bookedTimeSlots: {
  //       from,
  //       to,
  //     },
  //   };
  //   dispatch(bookCarOffline(reqObj));
  //   navigate('/userbookings')

  // }

  async function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("User"))._id,
      car: car._id,
      totalAmount,
      totalHours,
      place:car.pickType,
      pickupAddress,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
  
    await new Promise((resolve) => {
      dispatch(bookCarOffline(reqObj));
      resolve();
    });
  
    setTimeout(() => {
      navigate('/userbookings');
    }, 4000);
  }
 
  
  
  
  
  
  // function onToken(token) {
  //   const reqObj = {
  //     token,
  //     user: JSON.parse(localStorage.getItem("User"))._id,
  //     car: car._id,
  //     place:car.pickType,
  //     totalAmount,
  //     totalHours,
  //     pickupAddress,
  //     driverRequired: driver,
  //     bookedTimeSlots: {
  //       from,
  //       to,
  //     },
  //   };
  //   dispatch(bookCar(reqObj));
  //   console.log(token);
  //   navigate('/userbookings')

  // }

  async function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("User"))._id,
      car: car._id,
      place:car.pickType,
      totalAmount,
      totalHours,
      pickupAddress,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
  
    await new Promise((resolve) => {
      dispatch(bookCar(reqObj));
      resolve();
    });
  
    console.log(token);
  
    setTimeout(() => {
      navigate('/userbookings');
    }, 4000);
  }
  


  function handleReserveNowClick() {
    const selectedPaymentMethod = document.querySelector('input[type="radio"]:checked');
  
    if (selectedPaymentMethod.value === "pay-after-ride") {
      // Code to handle Pay After Ride option
      bookNow();

      console.log("Pay After Ride selected");
    } else if (selectedPaymentMethod.value === "cheque-payment") {
      // Code to handle Cheque Payment option
      console.log("Cheque Payment selected");



    } else if (selectedPaymentMethod.value === "paypal") {
      // Code to handle Paypal option
      console.log("Paypal selected");
      // Call the bookNow function that you have in your code snippet
    } else {
      console.log("Please select a payment method");
    }
  }


  function paywithstripe(){
    <StripeCheckout
    shippingAddress
    token={onToken}
    amount={totalAmount * 100}
    stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
  >
  </StripeCheckout>
  }

  function disabledDate(current) {
    // can't select days before today
    return current && current < new Date(Date.now() - 86400000); // 86400000 is the number of milliseconds in a day
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
                
                {/* <RangePicker
                  style={rangePickerStyle}
                  className="ml-3 mx-4 mb-4 p-5 fw-bold"
                  showTime={{ format: "HH:mm" }}
                  format="MMM DD YYYY HH:mm"
                  onChange={selectTimeSlots}
                  disabledDate={disabledDate} // add disabledDate prop
                   
                 /> */}
          <RangePicker
  style={rangePickerStyle}
  className="ml-3 mx-4 mb-4 p-5 fw-bold"
  showTime={{ format: "HH:mm" }}
  format="MMM DD YYYY HH:mm"
  onChange={selectTimeSlots}

  disabledDate={date => {
    // Get the current date and set hours to 0 to compare with the selected date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    // Check if the selected date is before the current date
    if (date < currentDate) {
      return true;
    }
  
    // Loop through the booked time slots
    for (let i = 0; i < car.bookedTimeSlots.length; i++) {
      const from = new Date(car.bookedTimeSlots[i].from).setHours(0, 0, 0, 0);
      const to = new Date(car.bookedTimeSlots[i].to).setHours(0, 0, 0, 0);
  
      // Check if the current date falls within a booked time slot
      if (date >= from && date <= to) {
        return true;
      }
    }
  
    // If the current date does not fall within a booked time slot and is not before the current date, allow selection
    return false;
  }}
/>


                <h5 className=" p-3 fw-bold ">Total hours:{totalHours}</h5>
                {/* <Checkbox
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
                </Checkbox> */}

        <Checkbox 
          checked={driver}
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

      {driver && (
        <div>
          <label>
            Pickup Address:
            <input 
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
          </label>
        </div>
      )}


                {/* <BookingForm /> */}
                <h4 className=" p-3 fw-bold ">Total Amount:{totalAmount?totalAmount:"0"}</h4>
              </div>
            </Col>
                {dateRange.length > 0 && (
        <Col lg="5" className="mt-5">
        <div className="payment__info mt-5">
          <h5 className="mb-4 m-4 fw-bold p-5  ">Payment Information</h5>
          {/* <PaymentMethod /> */}
          <div className="payment">

          <StripeCheckout
shippingAddress
token={onToken}
amount={totalAmount * 100}
stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
>
</StripeCheckout>

<label htmlFor="" className="d-flex align-items-center mt-3 gap-2">
<input type="radio" value="pay-after-ride" name="payment-method" /> Pay After Ride
</label>
</div>

<div className="payment mt-3">
<label htmlFor="" className="d-flex align-items-center gap-2">
<input type="radio" value="cheque-payment" name="payment-method" /> Cheque Payment
</label>
</div>



<div className="payment mt-3 d-flex align-items-center justify-content-between">
<label htmlFor="" className="d-flex align-items-center gap-2">
<input type="radio" value="paypal" name="payment-method" /> Paypal
</label>
</div>


          {/* <div className="payment text-center mt-5">
            <StripeCheckout
              shippingAddress
              token={onToken}
              amount={totalAmount * 100}
              stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
            >
              <button>Reserve Now</button>
            </StripeCheckout>
          </div> */}




<div className="payment text-center mt-5">
<button onClick={handleReserveNowClick}>Reserve Now</button>

</div>







        </div>
      </Col>
      )}

            
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CarDetails;
