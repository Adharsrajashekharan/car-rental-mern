import React, { useState, } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from '../../config'

const OtpForm = () => {
    const location =useLocation();
    const phoneNumber=location.state.phoneNumber
    const sessionId =location.state.sessionId
  const [loading, setLoading] = useState(false);
const navigate =useNavigate()
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await config.post("/api/v1/user/verify-otp", {
        phoneNumber,
        otp: values.otp,
        sessionId
      });
      if (response.data.success) {
        message.success("OTP verified successfully!");
        navigate('/login')

      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    // <Form name="otp-form" onFinish={onFinish}>
    //   <Form.Item
    //     label="OTP"
    //     name="otp"
    //     rules={[
    //       { required: true, message: "Please enter the OTP you received" },
    //     ]}
    //   >
    //     <Input maxLength={6} />
    //   </Form.Item>

    //   <Form.Item>
    //     <Button type="primary" htmlType="submit" loading={loading}>
    //       Verify OTP
    //     </Button>
    //   </Form.Item>
    // </Form>
    <Form
  name="otp-form"
  onFinish={onFinish}
  style={{ maxWidth: 400, margin: '0 auto',justifyContent: "center" }}
>
  <Form.Item
    label="OTP"
    name="otp"
    rules={[
      { required: true, message: "Please enter the OTP you received" },
    ]}
    style={{ marginBottom: 20 }}
  >
    <Input
      maxLength={6}
      style={{ fontSize: 24, textAlign: 'center', letterSpacing: 16 }}
    />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit" loading={loading}>
      Verify OTP
    </Button>
  </Form.Item>
</Form>
  );
};

export default OtpForm;