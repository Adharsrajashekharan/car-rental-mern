// import React from "react";
// import styles from "./styles.module.css";
// import "../../styles/UserStyles/RegisterStyles.css";
// import { Form, Input, message } from "antd";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Google from "../../components/UserComponents/Authenticate/Authenticate"
// import config from '../../config'

// const Register = () => {

//   const navigate = useNavigate();
//   //form handler
//   const onfinishHandler = async (values) => {
//     try {
//       const res = await config.post("/api/v1/user/register", values);
//       if (res.data.success) {
//         // message.success("Register Successfully!");
//         console.log(values);
//         navigate("/verify-otp",{state:{phoneNumber:values.phoneNumber,sessionId:res.data.sessionId}});
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       message.error("Something Went Wrong");
//     }
//   };
//   return (
      
//       <>
//       <div className="form-container register">
//         <Form
//           layout="vertical"
//         onFinish={onfinishHandler}
//           className="register-form "
//         >
//           <div className={styles.container}>

//  <h1 className={styles.heading}>Registration Form</h1>
//             <div className={styles.form_container}>
//               <div className={styles.left}>
//      <img className={styles.img} src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1676212010~exp=1676212610~hmac=ccd4ffcb8c12ee1859f441cc7f965542d8928765b1a47d9d1eac0c13589132fc" alt="login" />
//               </div>
//               <div className={styles.right}>

//      <Form.Item className="input" style={{width:'70%'}} label="Name" name="name">
//                   <Input type="text" className="input" required />
//                 </Form.Item>
//      <Form.Item className="input" style={{width:'70%'}} label="Email" name="email">
//                   <Input type="email" className="input" required />
//                 </Form.Item>
//         <Form.Item className="input" style={{width:'70%'}} label="Mobile" name="phoneNumber">
//                   <Input type="phone" className="input" required />
//                 </Form.Item>
                
//         <Form.Item label="Password" style={{width:'70%'}} name="password">
//           <Input type="password"  required />
//                 </Form.Item>
//         <Form.Item label="Favourite car" style={{width:'70%'}} name="answer">
//           <Input type="text"  required />
//                 </Form.Item>
//                 <button className={styles.btn}>Sign up</button>
//                 <p className={styles.text}>or</p>
//                 <Google />

//                 <p className={styles.text}>
//        Already user ? <Link to="/login">Log in</Link>
//                </p>
     
//                </div>
//            </div>
//              </div>
//              </Form>
//          </div>
// </>

//    );
//  };

//  export default Register;









import React from "react";
import styles from "./styles.module.css";
import "../../styles/UserStyles/RegisterStyles.css";
import { Form, Input, message,Button } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../components/UserComponents/Authenticate/Authenticate"
import config from '../../config'


const Register = () => {
  const navigate = useNavigate();
    //form handler
    const onfinishHandler = async (values) => {
      try {
        const res = await config.post("/api/v1/user/register", values);
        console.log("THIS is value",values)
        if (res.data.success) {
          // message.success("Register Successfully!");
          console.log(values);
          navigate("/verify-otp",{state:{phoneNumber:values.phoneNumber,sessionId:res.data.sessionId}});
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        message.error("Something Went Wrong");
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img
              className={styles.img}
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1676212010~exp=1676212610~hmac=ccd4ffcb8c12ee1859f441cc7f965542d8928765b1a47d9d1eac0c13589132fc" alt="login" 
            />
          </div>
          <div className={styles.right}>
            <Form
              layout="vertical"
              onFinish={onfinishHandler}
              className="register-form"
            >
              {/* name */}
              <Form.Item
                label="Name"
                name="name"
                style={{width:'26rem'}}
                rules={[
                  
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input className={styles.input} />
              </Form.Item>

              {/* email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input className={styles.input} />
              </Form.Item>

              {/* phoneNumber */}
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone",
                  },
                ]}
              >
                <Input className={styles.input} />
              </Form.Item>

              {/* password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password className={styles.input} />
              </Form.Item>

              {/* answer */}
              <Form.Item
                label="Your favourite car"
                name="answer"
                rules={[
                  {
                    required: true,
                    message: "Please enter your answer",
                  },
                ]}
              >
                <Input className={styles.input} />
              </Form.Item>



              <Button style={{width:'10rem',align:'center'}} type="primary" htmlType="submit" className={styles.btn}>
              Sign Up              
              </Button>
              <p className={styles.text}></p>
              {/* <Google /> */}
              <p  className={styles.text}>
                Already user ? <Link style={{textDecoration:'none'}} to="/login">Sign Up</Link>
              </p>
              <p className={styles.text}>
                <Link style={{textDecoration:'none'}} to="/forgot-password">Forgot Password ??</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default Register;
