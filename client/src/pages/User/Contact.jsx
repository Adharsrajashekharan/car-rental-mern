
import React, { useState } from 'react'

import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Header from "../../components/UserComponents/Header/Header";
import Footer from "../../components/UserComponents/Footer/Footer";
import "../../styles/UserStyles/contact.css";
import CommonSection from "../../components/UserComponents/UI/CommonSection";


const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];
const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };
  return (
    <>
    <Header/>
    <CommonSection title="Contact" />
      <section>
        {/* <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                   dsdsdsdsd
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">96366</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">example@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}
          <Container>
      <Row>
        <Col lg="7" md="7">
          {!showPopup ? (
            <div>
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" required/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" required/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    required
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </div>
          ) : (
            <div className="popup">
              <h4>Thank you for your message!</h4>
              <p>We'll get back to you as soon as possible.</p>
            </div>
          )}
        </Col>

        <Col lg="5" md="5">
          <div className="contact__info">
            <h6 className="fw-bold">Contact Information</h6>
            <p className="section__description mb-0"></p>
            <div className=" d-flex align-items-center gap-2">
              <h6 className="fs-6 mb-0">Phone:</h6>
              <p className="section__description mb-0">9946633752</p>
            </div>

            <div className=" d-flex align-items-center gap-2">
              <h6 className="mb-0 fs-6">Email:</h6>
              <p className="section__description mb-0">
                adarshrajashekhar@gmail.com
              </p>
            </div>

            <h6 className="fw-bold mt-4">Follow Us</h6>

            <div className=" d-flex align-items-center gap-4 mt-3">
              {socialLinks.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  className="social__link-icon"
                >
                  <i className={item.icon}></i>
                </Link>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
      </section>
    <Footer/>
    </>
  )
}

export default Contact