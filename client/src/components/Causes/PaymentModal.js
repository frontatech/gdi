import React from 'react'
import {
    Button,
    Modal,
    ModalBody,
  } from "reactstrap";
import DonateMain from "components/misc/DonateMain.js";
const PaymentModal = ({openModal,paidFor,setModal}) => {
    return (
        <Modal className="my-modal-dialog" isOpen={openModal} toggle={() => setModal(false)}>
            <div className="modal-header justify-content-center">
                <button
                className="close"
                type="button"
                onClick={() => setModal(false)}
                >
                <i className="now-ui-icons ui-1_simple-remove"></i>
                </button>
                <h4 className="title title-up">Donation Information</h4>
            </div>
            <ModalBody>
                <DonateMain paidFor={paidFor} />
            </ModalBody>
            <div className="modal-footer">
                <Button color="default" type="button">
                Nice Button
                </Button>
                <Button
                color="danger"
                type="button"
                onClick={() => setModal(false)}
                >
                Close
                </Button>
            </div>
        </Modal>
    )
}

export default PaymentModal
