// import React, { useState, } from "react";
// import { Form, Input, Button, message } from "antd";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from '../../config'

// const OtpForm = () => {
//     const location =useLocation();
//     const phoneNumber=location.state.phoneNumber
//     const sessionId =location.state.sessionId
//   const [loading, setLoading] = useState(false);
// const navigate =useNavigate()
//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const response = await config.post("/api/v1/user/verify-otp", {
//         phoneNumber,
//         otp: values.otp,
//         sessionId
//       });
//       if (response.data.success) {
//         message.success("OTP verified successfully!");
//         navigate('/login')

//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Something went wrong");
//     }
//     setLoading(false);
//   };

//   return (
//     // <Form name="otp-form" onFinish={onFinish}>
//     //   <Form.Item
//     //     label="OTP"
//     //     name="otp"
//     //     rules={[
//     //       { required: true, message: "Please enter the OTP you received" },
//     //     ]}
//     //   >
//     //     <Input maxLength={6} />
//     //   </Form.Item>

//     //   <Form.Item>
//     //     <Button type="primary" htmlType="submit" loading={loading}>
//     //       Verify OTP
//     //     </Button>
//     //   </Form.Item>
//     // </Form>
//     <Form
//   name="otp-form"
//   onFinish={onFinish}
//   style={{ maxWidth: 400, margin: '0 auto',justifyContent: "center" }}
// >
//   <Form.Item
//     label="OTP"
//     name="otp"
//     rules={[
//       { required: true, message: "Please enter the OTP you received" },
//     ]}
//     style={{ marginBottom: 20 }}
//   >
//     <Input
//       maxLength={6}
//       style={{ fontSize: 24, textAlign: 'center', letterSpacing: 16 }}
//     />
//   </Form.Item>
import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import spinnerAnimation from "./spinner.json";
import config from "../../config";

const OtpForm = () => {
  const container = useRef(null);
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;
  const sessionId = location.state.sessionId;
  const [loading, setLoading] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setAnimationState(true);
    setLoading(true);
    try {
      const response = await config.post("/api/v1/user/verify-otp", {
        phoneNumber,
        otp: values.otp,
        sessionId,
      });
      if (response.data.success) {
        message.success("OTP verified successfully!");
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    }
    setLoading(false);
    setAnimationState(false);
  };

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./bank.json"),
    });
    return () => {
      animation.destroy();
    };
  }, []);



  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);
  
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
  };

  return (
    <div className="containe_r">
      <div className="lottie" ref={container}></div>
      
      <div className="form-containe_r">
        <div className="wq">

        <h1>OTP Verification <br /> <h6>Check your registered Phone  Number</h6></h1>
        {/* <h1>An otp has been sent to your phone </h1> */}
        <Form
          name="otp-form"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please enter the OTP you received" },
            ]}
            className="form-item"
          >
            <Input
              maxLength={6}
              style={{ fontSize: 24, textAlign: "center", letterSpacing: 16 }}
            />
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>

    </div>
  );
  
};

export default OtpForm;


// .containe_r {
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background-color: #f5f5f5;
//   position: relative;
// }

// .containe_r .lottie {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
// }

// .form-containe_r {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   width: 100%;
//   max-width: 400px;
//   background-color: #fff;
//   padding: 30px;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// }

// .form-containe_r h1 {
//   font-size: 24px;
//   font-weight: 700;
//   margin-bottom: 30px;
//   /* bottom: -30px; */
//   text-align: center;
// }



// .ant-btn {
//   font-size: 16px;
//   font-weight: 700;
//   width: 100%;
// }

// .ant-form-explain {
//   color: red;
// }
// .form-item {
//   margin-bottom: 20px;
// }

// .ant-input {
//   font-size: 24px !important;
//   text-align: center;
//   letter-spacing: 16px;
// }