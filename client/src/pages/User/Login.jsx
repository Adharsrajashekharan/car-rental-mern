import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../components/UserComponents/Authenticate/Authenticate";
import config from "../../config";
import styles from "./styles.module.css";
import { getUserInfo} from '../../../src/redux/action/userActions'
import { useDispatch } from "react-redux";



const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()


  //form handler
  const onFinishHandler = async (values) => {
    try {
      const res = await config.post("/api/v1/user/login", values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");

        //  dispatch(getUserInfo())

        
        navigate("/");
        localStorage.setItem("User", JSON.stringify(res.data.user));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img
              className={styles.img}
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              alt="login"
            />
          </div>
          <div className={styles.right}>
            <Form
              layout="vertical"
              onFinish={onFinishHandler}
              className="register-form"
            >
              <Form.Item
                label="Email"
                name="email"
                style={{width:'26rem'}}
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input className={styles.input} />
              </Form.Item>
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
              <Button style={{width:'10rem',align:'center'}} type="primary" htmlType="submit" className={styles.btn}>
                Log In
              </Button>
              <p className={styles.text}></p>
              {/* <Google /> */}
              <p  className={styles.text}>
                New Here ? <Link style={{textDecoration:'none'}} to="/register">Sign Up</Link>
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

export default Login;
