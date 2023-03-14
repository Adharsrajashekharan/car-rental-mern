import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getallcars } from "../../redux/action/carsAction";

const NotFound = () => {
  const {cars}=useSelector(a=>a.carsReducer)
  const dispatch=useDispatch()
useEffect(() => {
  dispatch(getallcars())
}, [])



  return <div>NotFound{cars.length}</div>
}

export default NotFound;
