import React from "react";
import "../../styles/AdminStyles/bookings.css";
import carData from "../../assets/AdminAssets/dummy-data/booking-cars.js";
import CarItem from "../../components/AdminComponents/UI/CarItem";
import TopNav from "../../components/AdminComponents/TopNav/TopNav";



const Bookings = () => {
  return (
   
    <div>
          <TopNav />

      <div className="booking__wrapper">
        <h2 className="booking__title">Booking</h2>

        {/* <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select>
              <option value="toyota">Toyota</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div> */}

        <div className="booking__car-list">
          {carData?.slice(0,1).map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
          {/* .slice(0,1) */}
        </div>
      </div>
    </div>
    

  );
};

export default Bookings;
