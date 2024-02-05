import React from 'react'
import "./offer.sass"
import { Button, Col, Container, Row } from 'react-bootstrap';
import Daily from '../../assets/daily.svg';
import Weekly from '../../assets/weekly.svg';
import M6logo from '../../assets/m6-logo.svg';

const cardData = [
    {
        id: 1,
        title: "Daily Bullets",
        description: "Daily in-depth news coverage and analysis on everything you need to know happening in the crypto space.",
        image: Daily,
        link: "https://www.m6labs.co/subscribe",
    },
    {
        id: 2,
        title: "Weekly Alpha Leak",
        description: "Weekly overview and analysis of all the pertinent information & narratives to keep up to date with everything crypto.",
        image: Weekly,
        link: "https://www.renoded.com/subscribe"
    },
    {
        id: 3,
        title: "M6 Labs Research",
        description: "Brilliant minds coming together to further our understanding of our developing sector.",
        image: M6logo,
        link: "https://www.0xilluminati.com/subscribe"
    },
]

const Offer = () => {
    return (
        <div className='offer-sec my-5'>
            <Container>
                <div className='text-center'>
                    <h1 className='heading-1'>What we offer</h1>
                    <p className='paragraph sub-head mb-0'>Our content is designed to provide actionable insights, cutting through the noise so <br /> that you can focus on what's truly important!</p>
                </div>
                <Row className='justify-content-lg-around justify-content-left'>
                    {cardData.map((item, i) => (
                        <Col lg={4} md={6} xs={12} key={i}>
                            <div className="subscribe-card mt-5 text-center">
                                <img className='img-fluid mx-auto' src={item.image} alt="" />
                                <h4 className='my-lg-4 my-2 heading-4 font-color-black text-center'>{item.title}</h4>
                                <p className=' paragraph-small mb-3 text-center'>{item.description}</p>
                                <Button className='subscribe-btn' onClick={() => window.open(item.link)}>Subscribe</Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Offer