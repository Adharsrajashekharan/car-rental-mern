
import React, { useState } from "react";
import { deleteCar, getallcars } from "../../../redux/action/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import { message, Popconfirm } from 'antd';

const RecommendCarCard = (props) => {
  const { cars } = useSelector((a) => a.carsReducer);
  const { loading } = useSelector((a) => a.alertsReducer);
  const dispatch = useDispatch();

  const [deletedCars, setDeletedCars] = useState([]);

  useEffect(() => {
    dispatch(getallcars());
  }, []);

  const handleDeleteCar = (carId) => {
    dispatch(deleteCar({ carid: carId }));
    setDeletedCars([...deletedCars, carId]);
    // message.success('Car deleted successfully');
  }

  const { carName, retweet, imgUrl, rentPrice, percentage } = props.item;

  return (
    <>
      {cars.map((car) => {
        if (deletedCars.includes(car._id)) {
        //   If the _id is included in deletedCars, the function returns null, which means the card for that car will not be rendered.
        // This is a way to remove deleted cars from the array of cars that will be displayed.
        //   If the _id is not included in deletedCars, the function returns the card for that car, which will be rendered in the UI.         
         return null;
         }

        return (
          <div key={car._id} className="recommend__car-card">
            <div className="recommend__car-top">
              <h5>
                <span>
                  <i className="ri-refresh-line"></i>
                </span>
                {percentage}% Recommended
              </h5>
            </div>

            <div className="recommend__car-img">
              <img src={car.image.url} alt="" />
            </div>
            <div className="recommend__car-bottom">
              <h4>{car.name}</h4>
              <div className="recommend__car-other">
                <div className="recommend__icons">
                  <p>
                    <i className="ri-repeat-line"></i>
                    <i className="ri-user-4-fill">{car.capacity}</i>
                  </p>
                  <p>
                    <i className="ri-settings-2-line"></i>
                  </p>
                  <p>
                    <i className="ri-timer-flash-line"></i>
                  </p>
                  <p>
                    <Link to={`/admin/editcar/${car._id}`}>
                      <i className="ri-edit-line"></i>
                    </Link>
                  </p>
                  <Popconfirm
                    title="Are you sure you need to delete this car?"
                    onConfirm={() => handleDeleteCar(car._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <p>
                      <i className="ri-delete-bin-line"></i>
                    </p>
                  </Popconfirm>

                </div>
                <span>${car.rentPerHour}/h</span>
              </div>
            </div>
          </div>
        )
      })}

    </>

  );
};

export default RecommendCarCard;
