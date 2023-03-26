import React from "react";
import "../../styles/AdminStyles/dashboard.css";
import SingleCard from "../../components/AdminComponents/reuseable/SingleCard";
import MileChart from "../../assets/AdminAssets/charts/MileChart";
import CarStatsChart from "../../assets/AdminAssets/charts/CarStatsChart";
import RecommendCarCard from "../../components/AdminComponents/UI/RecommendCarCard";
import recommendCarsData from "../../assets/AdminAssets/dummy-data/recommendCars";
import TopNav from "../../components/AdminComponents/TopNav/TopNav";

// import { getallcars } from "../../../redux/action/carsAction";

// import { getallcars } from "../../redux/action/carsAction";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";

const carObj = {
  title: "Total Cars",
  totalNumber: 12,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Daily Trips",
  totalNumber: 16,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Clients Annually",
  totalNumber: "2k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 216,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  // const { cars } = useSelector((a) => a.carsReducer);
  // const { loading } = useSelector((a) => a.alertsReducer);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getallcars());
  // }, []);
  return (

    <>
          <TopNav/>

      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>
      
        <div className="statics">
          <div className="stats">
            
            <h3 className="stats__title">Miles Statistics </h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics </h3>
            <CarStatsChart />
          </div>
        </div>
        <div className="recommend__cars-wrapper">
          {recommendCarsData.slice(0,1).map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    {/* {cars.map((cars) => {
        return (
          <h1>{cars.name}</h1>
          ) })} */}

    </>
      
  );
};

export default Dashboard;
