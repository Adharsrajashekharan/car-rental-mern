import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import config from '../../../config'
import { cancelCarBooking, uncancelCarBooking } from "../../../redux/action/bookingActions";
import Modal from 'react-modal';
import { Button } from "react-bootstrap";
const CarItem = () => {
  const [car, setCar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [cancelledBookings, setCancelledBookings] = useState({});
  const [showCancelled, setShowCancelled] = useState(false);
  const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchReservedBookings() {
      try {
        const response = await config.get('api/v1/admin/reservedcars',{headers});
        const reservedBookings = response.data;
        setCar(response.data);
        console.log("Reserved Bookings: ", reservedBookings);
        // populate cancelledBookings object with initial cancelled status
        const initialCancelledStatus = reservedBookings.reduce((acc, cur) => {
          return {...acc, [cur._id]: cur.isCancelled}
        }, {});
        setCancelledBookings(initialCancelledStatus);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReservedBookings();
  }, []);

  // const handleCancelBooking = (bookingId) => {
  //   console.log(bookingId);
  //   dispatch(uncancelCarBooking(bookingId));

  //   setBookingIdToDelete(bookingId);
  //   setCancelledBookings(prevState => ({...prevState, [bookingIdToDelete]: true}));

  //   setShowModal(true);
  // };
  
  
  
  
  
  const handleCancelBooking = (bookingId) => {
    dispatch(uncancelCarBooking(bookingId));
    
    // update cancelled status in local state
    setCar(prevState => {
      const updatedCar = prevState.map(booking => {
        if (booking._id === bookingId) {
          return {...booking, cancelled: true};
        } else {
          return booking;
        }
      });
      return updatedCar;
    });
  
    setBookingIdToDelete(bookingId);
    setShowModal(true);
  };




  
  const deleteBooking = () => {
    dispatch(cancelCarBooking(bookingIdToDelete));
    // update cancelled status in local state
    setCancelledBookings(prevState => ({...prevState, [bookingIdToDelete]: true}));
    setShowModal(false);
  };

  // const handleUncancelBooking = (bookingId) => {
  //   console.log(bookingId);
  //   dispatch(uncancelCarBooking(bookingId));
  //   // update cancelled status in local state
  //   setCancelledBookings(prevState => ({...prevState, [bookingId]: false}));
  //   setShowModal(false);

  // };
  
  
  
  const handleUncancelBooking = (bookingId) => {
    dispatch(uncancelCarBooking(bookingId));
    
    // update cancelled status in local state
    setCar(prevState => {
      const updatedCar = prevState.map(booking => {
        if (booking._id === bookingId) {
          return {...booking, cancelled: false};
        } else {
          return booking;
        }
      });
      return updatedCar;
    });
  
    setShowModal(false);
  };


  const customStyles = {
    content: {
      width: '30%',
      height: '30%',
      margin: 'auto'
    }
  };
  const handleToggleCancelled = () => {
    setShowCancelled(!showCancelled);
  };


  return (

  // <>
  //   {car.map((booking) => (
  //     <div className="car__item" key={booking._id}>
  //       <div className="car__item-top">
  //         <div className="car__item-tile">
  //           <h3>{booking.car.name}</h3>
  //           <span>
  //             <i class="ri-heart-line"></i>
  //           </span>
  //         </div>
  //         <p>{booking.bookedTimeSlots.from}---{booking.bookedTimeSlots.to}</p>
  //         <p>Total Hours:{booking.totalHours}</p>
  //       </div>
  //       <div className="car__img">
  //         <img src={booking.car.image.url} alt="" />
  //       </div>
  //       <div className="car__item-bottom">
  //         <div className="car__bottom-left">
  //           <p>
  //             <i class="ri-money-dollar-circle-line">  </i> {booking.totalAmount}
  //           </p>
  //           <p>
  //             <i class="ri-time-line"></i>
  //             {booking.totalHours}
  //           </p>
  //         </div>
  //         <p className="car__rent">
  //           <i class="ri-steering-2-fill"></i>
  //           {booking?.driverRequired ? 'Yes' : 'No'}
  //         </p>
  //       </div>
  //       <div className="btn-group">
  //         {booking.cancelled ==true ? (
  //           <button
  //             className="btn btn-success"
  //             onClick={() => handleUncancelBooking(booking._id)}
  //           >
  //             Uncancel 
  //           </button>
  //         ) : (
  //           <button
  //             className="btn btn-danger"
  //             onClick={() => handleCancelBooking(booking._id)}
  //           >
  //             Cancel 
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   ))}
  //   <Modal
  //     isOpen={showModal}
  //     style={customStyles}
  //     onRequestClose={() => setShowModal(false)}
  //   >
  //     <h2>Confirm Cancellation</h2>
  //     <p>Are you sure you want to cancel this booking?</p>
  //     <div className="modal__buttons">
  //       <button className="btn btn-danger" onClick={() => deleteBooking()}>
  //         Yes
  //       </button>
  //       <button
  //         className="btn btn-primary"
  //         onClick={() => setShowModal(false)}
  //       >
  //         No
  //       </button>
  //     </div>
  //   </Modal>
  // </>
  <>
  {car.map((booking) => (
    <div className="car__item" key={booking._id} style={{ display: (booking.cancelled && !showCancelled) ? 'none' : 'block' }}>
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3>{booking.car.name}</h3>
          <span>
            <i className="ri-heart-line"></i>
          </span>
        </div>
        <p>{booking.bookedTimeSlots.from}---{booking.bookedTimeSlots.to}</p>
        <p>Total Hours:{booking.totalHours}</p>
      </div>
      <div className="car__img">
        <img src={booking.car.image.url} alt="" />
      </div>
      <div className="car__item-bottom">
        <div className="car__bottom-left">
          <p>
            <i className="ri-money-dollar-circle-line"></i> {booking.totalAmount}
          </p>
          <p>
            <i className="ri-time-line"></i>
            {booking.totalHours}
          </p>
        </div>
        <p className="car__rent">
          <i className="ri-steering-2-fill"></i>
          {booking?.driverRequired ? 'Yes' : 'No'}
        </p>
      </div>
      <div className="btn-group">
        {booking.cancelled ? (
          <button
            className="btn btn-success"
            onClick={() => handleUncancelBooking(booking._id)}
          >
            Uncancel
          </button>
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => handleCancelBooking(booking._id)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  ))}
  <div className="toggle-button">
    <Button className="centered-button" onClick={handleToggleCancelled}>
      {showCancelled ? 'Hide Cancelled' : 'Show Cancelled'}
    </Button>
  </div>
  <Modal
    isOpen={showModal}
    style={customStyles}
    onRequestClose={() => setShowModal(false)}
  >
    <h2>Confirm Cancellation</h2>
    <p>Are you sure you want to cancel this booking?</p>
    <div className="modal__buttons">
      <button className="btn btn-danger" onClick={deleteBooking}>
        Yes
      </button>
      <button className="btn btn-primary" onClick={() => setShowModal(false)}>
        No
      </button>
    </div>
  </Modal>
</>


  );
};

export default CarItem;
