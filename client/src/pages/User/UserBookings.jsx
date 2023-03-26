import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {cancelCarBooking, getAllBookings} from '../../redux/action/bookingActions'
import Header from "../../components/UserComponents/Header/Header";
import { Col, Row } from 'antd'
import { Spinner } from 'reactstrap'
import moment from "moment";
import {useNavigate} from 'react-router-dom'


const UserBookings = () => {
  const [showPopup, setShowPopup] = useState(false);
const [bookingid, setbookingid] = useState('')
  const handleCancelBooking = (bookingId) => {
    dispatch(cancelCarBooking(bookingId));
    setcancelcar([...cancelcar,bookingId])  
    setShowPopup(false); // close the popup after canceling
  };

  const [cancelcar, setcancelcar] = useState([])
    const { bookings } = useSelector((state) => state.bookingsReducer);
const {loading} = useSelector((state) => state.alertsReducer);
const navigate=useNavigate()
const user = JSON.parse(localStorage.getItem("User"));

    const dispatch=useDispatch()

    useEffect(() => { 
            dispatch(getAllBookings())
            
        
    console.log("111",bookings)
    
      
    }, [])
    

const cancelConfirmation=(id)=>{
  setbookingid(id)
  setShowPopup(true)
}
// const handleCancelBooking = (bookingId) => {
//     dispatch(cancelCarBooking(bookingId));
//      setcancelcar([...cancelcar,bookingId])
    
//   };

  return (
    <>
      <Header />

      <h3 className="text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user === user._id)
            .map((booking) => {
                if (cancelcar.includes(booking._id)) {
                //   If the _id is included in deletedCars, the function returns null, which means the card for that car will not be rendered.
                // This is a way to remove deleted cars from the array of cars that will be displayed.
                //   If the _id is not included in deletedCars, the function returns the card for that car, which will be rendered in the UI.         
                 return null;
                 }
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Total hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per hour : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                    <p>
                    Pickup location: <b>{booking?.pickupAddress?booking.pickupAddress:
                    
                    booking.place
                    }</b>
                    </p>
                  </Col>

                  <Col lg={12} sm={24}>
                  {booking.transactionId?
                  <p>
                        
                 online Transaction Id : <b>{booking.transactionId}</b>
                </p>
                  :<p> Offline Transaction</p>
                  }
                    
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{' '}
                      <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b>
                    </p>
                  </Col>

                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image.url}
                      height="140"
                      className="p-2"
                    />
                    {/* <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-danger mt-3"
                    >
                      Cancel Booking
                    </button> */}

<button
        onClick={() => cancelConfirmation(booking._id)}
        className="btn btn-danger mt-3"
      >
        Cancel Booking
      </button>
      {showPopup && bookingid==booking._id && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to cancel this booking?</p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPopup(false)}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleCancelBooking(booking._id)}
            >
              Yes
            </button>
          </div>
        </div>
      )}
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </>
  );
};

export default UserBookings;

