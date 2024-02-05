import React from 'react'
import './subscribe-modal.sass'
import { Button, Form, Modal } from 'react-bootstrap';
import brainImg from '../../../assets/images/brain-img.svg';
import m6LabsLogo from '../../../assets/images/m6-labs-logo.svg';
interface createModalProps {
    isOpen: boolean,
    toggle: () => void,
    setRefreshData: any,
    removeCross?: Boolean
}

const SubscribeModal = ({ isOpen, toggle, removeCross }: createModalProps) => {
    return (
        <>
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggle}
                className="p-lg-5 p-3 subscribe-modal"
                centered
            >
                {removeCross ? null : <Modal.Header closeButton={isOpen}>
                </Modal.Header>}
                <Modal.Body className='p-2 p-lg-3'>
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h3 className='heading-3'>Get <br /> smarter <br /> about <span>crypto</span></h3>
                            <div className='main-image-div'>
                                <img style={{width: 170}} className='img-fluid modelImg' src={brainImg} alt="" />
                                <img className='second-img' src={m6LabsLogo}/>
                            </div>
                        </div>
                        <p className='medium-p mb-lg-5 mb-3 mt-4'>Join 250,000+ subscribers and get our 5 min daily newsletter on what matters in crypto</p>
                        <div>
                            <iframe src="https://embeds.beehiiv.com/cf87d4ab-2414-4b97-931a-afdab81222cc?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: 0, backgroundColor: "transparent", width: "100%" }}></iframe>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SubscribeModal