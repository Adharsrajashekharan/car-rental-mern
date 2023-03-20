import React from "react";
import { useEffect,useState } from "react";
import HeroSlider from "../../components/UserComponents/UI/HeroSlider";
import Header from "../../components/UserComponents/Header/Header";
import Footer from "../../components/UserComponents/Footer/Footer";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../../components/UserComponents/UI/FindCarForm";
import AboutSection from "../../components/UserComponents/UI/AboutSection";
import ServicesList from "../../components/UserComponents/UI/ServicesList";
import carData from "../../assets/UserAssets/data/carData";
import { getallcars } from "../../redux/action/carsAction";
import { useSelector,useDispatch } from "react-redux";
import CarItem from "../../components/UserComponents/UI/CarItem";
import Testimonial from "../../components/UserComponents/UI/Testimonial";
import {DatePicker} from "antd"
import config from '../../config'
// setFrom(values[0].format("MMM DD YYYY HH:mm"));
// setTo(values[1].format("MMM DD YYYY HH:mm"));
import BlogList from "../../components/UserComponents/UI/BlogList";
import axios from "axios";

const Home = () => {

const getUserData=async()=>{
 try {
  const res = await config.post("/api/v1/user/getuserdata",{},{
    headers:{
Authorization:"Bearer " + localStorage.getItem("token")
    }
  })
 } catch (error) {
  console.log(error)
 }
}

useEffect(() => {
  
getUserData()
  
}, [])





useEffect(() => {
 

},);









const [totalcars, setTotalcars] = useState([])


  // const { RangePicker } = DatePicker;
  // const rangePickerStyle = {
  //   padding: "4px 56px 12px",
  // }
  // function setFilter(values){

  // }
  const {cars}=useSelector(a=>a.carsReducer)
  const dispatch=useDispatch()


  useEffect(() => {
  dispatch(getallcars())
}, [])   


useEffect(() => {
  setTotalcars(cars)

}, [cars])
//We are giving cars because whenever the value changes it should rerender

    return (
      <>
      <Header/>
      {/* hero section */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        
             

                {/* <FindCarForm /> */}
         
      </section>
      {/* about */}
      <AboutSection />
      {/* services section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/*  car offer section*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {carData.slice(0, 1).map((item) => (
              <CarItem item={item}/>
            ))}
          </Row>
        </Container>
      </section>
       
      {/*  testimonial section*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/*  blog section  */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>

        </Container>
      </section>
      <Footer/>
      </>
    )
  }



export default Home;
// import React from 'react'
// import Header from "../components/UserComponents/Header/Header";
// import Footer from "../components/UserComponents/Footer/Footer";
// 

// export default Home
