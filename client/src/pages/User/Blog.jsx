
import React from 'react'
import Header from "../../components/UserComponents/Header/Header";
 import { Container, Row } from "reactstrap";
 import CommonSection from "../../components/UserComponents/UI/CommonSection";
import BlogList from "../../components/UserComponents/UI/BlogList";

import Footer from "../../components/UserComponents/Footer/Footer";

const Blog = () => {
  return (
    <>
    <Header/>
    <CommonSection title="Blogs" />
       <section>
         <Container>
           <Row>
             <BlogList />
             <BlogList />
           </Row>
         </Container>
       </section>
    <Footer/>
    </>
  )
}

export default Blog