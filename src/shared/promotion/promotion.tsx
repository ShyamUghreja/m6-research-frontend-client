import React from 'react'
import "./promotion.sass"
import Allhero from '../all-hero/all-hero'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Promotionbg from '../../assets/promotion.svg';


const Promotion = () => {
    return (
        <div>
            <Allhero />
            <div>
                <section className='promotion-sec my-5'>
                    <Container>
                        <div className='promotion-news text-center'>
                            <div className="Promotion-img">
                                <img className='img-fluid' src={Promotionbg} alt="" />
                            </div>
                            <Row>
                                <Col lg={6}>
                                    <div className='text-start'>
                                        <h2 className='heading-2'>Contact us</h2>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='footer-card-1'>
                                        <p className='medium-p mb-4'>Promote your newsletter to our community of crypto professionals</p>
                                        <p className='medium-p mb-4'>M6 Labs is a fast-growing publication focused on crypto. Our readership includes over 4,000 executives, investors, founders, and crypto enthusiasts.</p>
                                        <p className='medium-p mb-5'>Cross-promotions are a simple but effective growth strategy. You give a shout-out to your partner. In return, they give a shout-out to you. Simple. And free.</p>
                                        <Button className='promotion-btn' onClick={() => window.open("https://o7fat38478c.typeform.com/to/ixPk6fIK", "_blank")}>Contact for Cross Promo</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
            </div>
        </div>
    )
}

export default Promotion