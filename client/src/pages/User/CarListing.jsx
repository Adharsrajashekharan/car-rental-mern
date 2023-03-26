
import React from 'react'
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/UserComponents/Header/Header";
import CommonSection from "../../components/UserComponents/UI/CommonSection";
import CarItem from "../../components/UserComponents/UI/CarItem";
import carData from "../../assets/UserAssets/data/carData";
import Footer from "../../components/UserComponents/Footer/Footer";

const CarListing = () => {
  return (
    <>
    <Header/>
    <CommonSection title="Car Listing" />

<section>
  <Container>
    <Row>
      {/* <Col lg="12">
        <div className=" d-flex align-items-center gap-3 mb-5">
          <span className=" d-flex align-items-center gap-2">
            <i class="ri-sort-asc"></i> Sort By
          </span>

          <select>
            <option>Select</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </Col> */}

      {carData.slice(0,1).map((item) => (
        <CarItem item={item} key={item.id} />
      ))}
    </Row>
  </Container>
</section>
    <Footer/>
    
    </>
  )
}

export default CarListing
