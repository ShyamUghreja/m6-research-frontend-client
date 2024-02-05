import React from 'react'
import "./advertise.sass"
import Allhero from '../../shared/all-hero/all-hero'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Advertise = () => {
    return (
        <>
            <Allhero />
            <div>
                <section className='advertise-sec mt-5'>
                    <Container>
                        <div className='advertise-news text-center'>
                            <h2 className='heading-2'>Our Audience</h2>
                            <div className='footer-card-1 mt-lg-5 mt-3 text-center'>
                                <p className='medium-p mb-lg-4 mb-3'>M6 Labs is a fast-growing publication focused on crypto. Our readership includes over 4,000 executives,<br /> investors, founders, and crypto enthusiasts.</p>
                                <Button className='advertise-btn' onClick={() => window.open("https://o7fat38478c.typeform.com/to/BToKDy0q", "_blank")}>Advertise</Button>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Advertise