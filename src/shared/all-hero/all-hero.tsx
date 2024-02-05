import React from 'react'
import "./all-hero.sass"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import News from '../../assets/hero-news.svg';
import Herobg from '../../assets/BG Vector.svg';
import { useLocation } from 'react-router-dom';

const Allhero = () => {

    const location = useLocation();
    const pathname = location.pathname;
    return (
        <div>
            <section className='all-hero-sec position-relative'>
                <Container>
                    <Row>
                        <Col className='align-self-center' lg={6} md={6} sm={12}>
                            {pathname === "/aboutus" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>About Us</h2>
                                    <p className='paragraph-small mt-4 me-lg-5'>M6 Labs is a community of researchers who tell the story of crypto through the lens of natives. Whether you're curious about DeFi or NFTs, M6 Labs has you covered with a daily newsletter, in-depth research, and insights into current narratives.</p>
                                </div>
                            }
                            {pathname === "/advertise" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Advertise <br /> on M6 Labs</h2>
                                </div>
                            }
                            {pathname === "/promotion" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Newsletter Cross- <br />Promotion on M6 Labs</h2>
                                </div>
                            }
                            {pathname === "/subscribe" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Daily crypto news <br /> and industry analysis</h2>
                                    <p className='paragraph-small my-3 my-md-4 me-lg-5'>Your personal crypto intern, we provide actionable insights so <br /> that you know what's really important</p>
                                    <div style={{ maxWidth: 500, marginTop: "1rem" }}>
                                        <iframe src="https://embeds.beehiiv.com/cf87d4ab-2414-4b97-931a-afdab81222cc?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: 0, backgroundColor: "transparent", width: "100%" }}></iframe>
                                    </div>
                                    {/* <Form.Group className="position-relative d-flex subscribe me-lg-5 mb-lg-0 mb-md-0 mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Enter email address" />
                                        <Button className='news-sign-button'>Subscribe</Button>
                                    </Form.Group> */}
                                </div>
                            }
                            {pathname === "/research" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>Research</h2>
                                    <p className='paragraph-small my-4 me-lg-5'>M6 Labs is a community of researchers who tell the story <br /> of crypto through the lens of natives.</p>
                                </div>
                            }
                            {pathname === "/news" &&
                                <div className='hero-text'>
                                    <h2 className='heading-2 font-color-black'>News</h2>
                                    <p className='paragraph-small my-4 me-lg-5'>M6 Labs is a community of researchers who tell the story of crypto through the lens of natives.</p>
                                </div>
                            }
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <div className='text-end all-hero-img'>
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

export default Allhero