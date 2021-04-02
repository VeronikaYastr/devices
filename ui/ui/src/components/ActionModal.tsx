import React, {FC} from "react";
import {Button, Modal} from "react-bootstrap";

export interface ModalProps {
  show: boolean;
  title: string;
  body: React.ReactElement;
  onCancel: () => void;
}

export const ActionModal: FC<ModalProps> = (props => {
  return (
    <Modal keyboard={true} show={props.show} onHide={props.onCancel}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
})
