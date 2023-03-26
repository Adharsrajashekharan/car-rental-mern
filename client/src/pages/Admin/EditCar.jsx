import React,{useState,useEffect} from 'react'
import TopNav from '../../components/AdminComponents/TopNav/TopNav'
import '../../styles/AdminStyles/editcar.css'
import { useParams } from "react-router-dom";
import { editCar, getallcars } from "../../redux/action/carsAction";
// import { getallcars } from "../../redux/action/carsAction";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../User/styles.module.css";
import "../../styles/UserStyles/RegisterStyles.css";
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { addCar } from '../../redux/action/carsAction';
import Spinner from '../../components/UserComponents/Spinner/Spinner';

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const EditCar = () => {
  const { cars } = useSelector((a) => a.carsReducer);

  const [car, setcar] = useState()
const [Image, setImage] = useState([])
  const { carid } = useParams();
  const [totalcars, settotalcars] = useState([])

  // const cars = useSelector(state=>state.carsReducer)
const dispatch =useDispatch()
// useEffect(() => {
//   if(cars.length == 0){
//         dispatch(getallcars());

//     // setcar(cars.find(o=>o._id==carsid))
//   }else{
//     // dispatch(getallcars());
//         setcar(cars.find((o)=>o._id==carsid))
//         console.log("tracycrazy",car)

//   }
// }, [cars]);
useEffect(() => {
  if (cars.length == 0) {
    dispatch(getallcars());
  } else {
    settotalcars(cars)
    //pass the use state function and returns the data for a specific id
    setcar(cars.find((o) => o._id == carid));
  }
}, [cars]);
console.log(car);
const loading = useSelector(state=>state.alertsReducer)

  const onfinishHandler = (values) => {
    values._id =car._id
    dispatch(editCar(values))
    console.log('Success:', values);
  };
  const handleImage = (file) => {
    setImage(file);
  };
return (
  <>
    <TopNav/>
    <>

    {/* {loading && <Spinner />} */}
      <div className="register">
     {totalcars.length>0 &&(<Form
        layout="vertical"
        initialValues={car}
        onFinish={onfinishHandler}
        className="register-form "
      >
 <div className={styles.container}>
   {/* <h1 className={styles.heading}>Registration Form</h1> */}

 <div className={styles.form_container}>

   {/* <div className={styles.left}> */}
     {/* <img className={styles.img} src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1676212010~exp=1676212610~hmac=ccd4ffcb8c12ee1859f441cc7f965542d8928765b1a47d9d1eac0c13589132fc" alt="login" /> */}
   {/* </div> */}
   <div className={styles.right}>
     <h2 >Edit Car</h2>
     {car.name}
     {/* <input type="text" className={styles.input} placeholder="Email" /> */}
     <Form.Item className="input" style={{width:'70%'}} label="Name" name="name">
          <Input type="text"   className="input" required />
        </Form.Item>
        <Form.Item name="image" style={{width:'70%'}} label="Image">
        <img style={{width:'100px',height:'40'}} src={car.image.url} alt={car.name} />

</Form.Item>
        <Form.Item label="rent" style={{width:'70%'}} name="rentPerHour">
          <Input type="number"  required />
        </Form.Item>
        <Form.Item label="capacity" style={{width:'70%'}} name="capacity">
          <Input type="text"  required />
        </Form.Item>
        <Form.Item label="fuelType" style={{width:'70%'}} name="fuelType">
          <Input type="text"  required />
        </Form.Item>
     {/* <input type="text" className={styles.input} placeholder="Password" /> */}
     
     <button className={styles.btn}>Edit-car</button>      
     {/* <p className={styles.text}>or</p> */}
     {/* <button className={styles.google_btn} onClick=""> */}
       {/* <img src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg" alt="google icon" /> */}
       {/* <span>Sign in with Google</span>
     </button> */}
     {/* <p className={styles.text}>
       Already user ? <Link to="/login">Log in</Link>
     </p> */}
     {/* <p className={styles.text}>
        <Link to="/forgot-password">ForgotPassword ??</Link>
     </p> */}
   </div>
 </div>
</div>
</Form>)} 
</div>
</>    </>

);
  
  
}

export default EditCar
// import { useParams } from "react-router-dom";

// function EditCar() {
//   const { carid } = useParams();

//   // Use the id parameter in your component as needed
//   // For example, you can fetch the car data from an API using the id
//   // and use it to prepopulate a form for editing the car details.

//   return (
//     <div>
//       <h2>Editing Car {carid}</h2>
//       {/* Rest of your component */}
//     </div>
//   );
// }
// export default EditCar
