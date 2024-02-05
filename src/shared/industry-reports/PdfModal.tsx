import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

interface createModalProps {
    isOpen: boolean,
    toggle: () => void,
    removeCross?: Boolean,
    children: React.ReactNode
}

const PdfModal = ({ isOpen, toggle, removeCross, children }: createModalProps) => {
    return (
        <>
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggle}
                centered
            >
                {removeCross ? null : <Modal.Header closeButton={isOpen}>
                </Modal.Header>}
                <Modal.Body className='text-center mx-auto'>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PdfModal