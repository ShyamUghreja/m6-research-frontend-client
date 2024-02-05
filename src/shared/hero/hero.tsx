import React from 'react'
import "./hero.sass"
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import News from '../../assets/hero-news.svg';
import Herobg from '../../assets/BG Vector.svg';

const Hero = () => {
    return (
        <div>
            <section className='home-hero-sec position-relative padding-100'>
                <Container>
                    <Row>
                        <Col className='align-self-end' lg={6} md={6}>
                            <div className='hero-text'>
                                <h1 className='heading-1'>Daily <br /> <span> Crypto </span> News & <br /><span>Industry </span>Analysis</h1>
                                <p className='paragraph-large mt-4 me-lg-5'>Your personal crypto intern, we provide <br /> actionable insights so that you know what's really important</p>
                                <div className='mt-4' style={{ maxWidth: 500 }}>
                                    <iframe src="https://embeds.beehiiv.com/cf87d4ab-2414-4b97-931a-afdab81222cc?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: 0, backgroundColor: "transparent", width: "100%" }}></iframe>
                                </div>
                                {/* <Form.Group className="position-relative d-flex subscribe mt-5 me-lg-5" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder="Enter email address" />
                                    <Button className='news-sign-button'>Subscribe</Button>
                                </Form.Group> */}
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='text-end mt-4 mt-md-0 mt-lg-0'>
                                <img className='img-fluid' src={News} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className='hero-bgimg'>
                    <img className='img-fluid' src={Herobg} alt="" />
                </div>
            </section>
        </div>
    )
}

export default Hero