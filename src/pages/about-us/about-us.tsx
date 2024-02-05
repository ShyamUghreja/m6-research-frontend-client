import React from 'react'
import "./about-us.sass"
import Allhero from '../../shared/all-hero/all-hero'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Reliable from '../../assets/reliable.svg';
import Timely from '../../assets/timely.svg';
import Intuitive from '../../assets/intuitive.svg';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    id: 1,
    title: "Reliable",
    description: "The crypto industry is full of scammers and fake news. We guarantee that all of our news is accurate.",
    image: Reliable,
  },
  {
    id: 2,
    title: "Timely",
    description: "Thanks to our global network of contributors, we are able to provide non-stop coverage of everything crypto.",
    image: Timely,
  },
  {
    id: 3,
    title: "Intuitive",
    description: "The tech is already complicated enough. We believe in the power of simple and straightforward communication.",
    image: Intuitive,
  },
]

const Aboutus = () => {
  const nav = useNavigate();

  return (
    <>
      <Allhero />
      <div className='about-us-sec mt-5'>
        <Container>
          <div className='text-center'>
            <h3 className='heading-3'>Our Mission</h3>
            <p className='paragraph-small sub-head mb-lg-0 mb-3'>M6 Labs is dedicated to making crypto news and research more accessible and easier to <br /> understand. We achieve this by empowering a community of researchers to deliver the most <br /> concise and high-quality news and research around the clock.</p>
          </div>
          <Row className='justify-content-lg-around justify-content-left'>
            {cardData.map((item, i) => (
              <Col lg={4} md={6} sm={6} xs={12} key={i}>
                <div className="subscribe-card mt-lg-5 mt-3">
                  <img className='img-fluid mx-auto' src={item.image} alt="" />
                  <h3 className='my-4 text-center'>{item.title}</h3>
                  <p className='paragraph-small mb-3 text-center'>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div>
        <section className='about-sec mt-lg-5 mt-3'>
          <Container>
            <div className='service-news text-center'>
              <h2 className='heading-2'>Contact Us</h2>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className='footer-card-1 mt-lg-5 mt-3'>
                    <h4 className='heading-4 mb-4'>Help us get better</h4>
                    <p className='medium-p mb-4'>Have a tip, suggestion, or request ?</p>
                    <Button onClick={() => { nav("/promotion") }} className='service-btn'>Contact our editorial team</Button>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <div className='footer-card-1 mt-lg-5 mt-3'>
                    <h4 className='heading-4 mb-4'>Advertise with M6 Labs</h4>
                    <p className='medium-p mb-4'>Ready to grow your brand? Let’s talk.</p>
                    <Button onClick={() => { nav("/advertise") }} className='service-btn'>Contact for advertising</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Aboutus