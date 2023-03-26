import React from 'react'
import "../../styles/UserStyles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import styles from "./styles.module.css";
import "../../styles/UserStyles/RegisterStyles.css";
import {  Link, useNavigate } from "react-router-dom";
import config from '../../config'

const ForgotPassword = () => {
    const navigate = useNavigate();
    //form handler
    const onfinishHandler = async (values) => {
      try {
        const res = await config.post("/api/v1/user/forgot-password", values);
        if (res.data.success) {
          message.success("Login Successfully");
          navigate("/login");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        message.success("successfully changed ");
        navigate("/login");

      }
    };
  return (
//     <div className="form-container ">
//     <Form
//       layout="vertical"
//       onFinish={onfinishHandler}
//       className="register-form"
//     >
//       <h3 className="text-center">reset password</h3>

//       <Form.Item label="Email" name="email">
//         <Input type="email" required />
//       </Form.Item>
//       <Form.Item label="newPassword" name="newpassword">
//         <Input type="password" required />
//       </Form.Item>
//       <Form.Item label="secret answer" name="answer">
//         <Input type="text" required />
//       </Form.Item>
      
//       <button className="btn btn-primary" type="submit">
// reset      </button>
//     </Form>
    <>
     <div className="form-container register">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form "
      >
 <div className={styles.container}>
 {/* <h1 className={styles.heading}>Forgot Password</h1> */}
 <div className={styles.form_container}>
   <div className={styles.left}>
     <img className={styles.img} style={{marginLeft:"10%"}} src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-4652.jpg?w=740&t=st=1676263392~exp=1676263992~hmac=ea77b10ef063b8e09b2f2a2c34ba4a09491f9c8d8fac3d6b7fab4752b6c3a774" alt="login" />
   </div>
   <div className={styles.right}>
    
     {/* <h2 className={styles.from_heading}></h2> */}
     {/* <input type="text" className={styles.input} placeholder="Email" /> */}
     <Form.Item className="input" style={{width:'70%'}} label="Registered Email-id" name="email">
          <Input type="text" className="input" required />
        </Form.Item>
     <Form.Item className="input" style={{width:'70%'}} label="New-password" name="newpassword">
          <Input type="password" className="input" required />
        </Form.Item>
        <Form.Item label="Secret-Answer" style={{width:'70%'}} name="answer">
          <Input type="text"  required />
        </Form.Item>
      
     {/* <input type="text" className={styles.input} placeholder="Password" /> */}
     
     <button type='submit' className={styles.btn}>Reset-password</button>      
     <p className={styles.text}>or</p>
     {/* <button className={styles.google_btn} onClick="">
       <img src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg" alt="google icon" />
       <span>Sign in with Google</span>
     </button> */}
     <p className={styles.text}>
       Know-Password ? <Link to="/login">Log in</Link>
     </p>
     {/* <p className={styles.text}>
        <Link to="/forgot-password">ForgotPassword ??</Link>
     </p> */}
   </div>
 </div>
</div>
</Form>
</div>
</>

//   </div>  
  
  
  
  )
}

export default ForgotPassword