import {FC} from "react";
import {ActionModal} from "../components/ActionModal";
import {Button, Col, Row} from "react-bootstrap";
import {Device} from "./types/Device";

export interface DevicesQuantityChangeModalProps {
  show: boolean;
  device?: Device;
  itemsInCart: number;
  itemsInStock: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onCancel: () => void;
}

export const DevicesQuantityChangeModal: FC<DevicesQuantityChangeModalProps> = ((props) => {
  const device = props.device;
  const title = `${device?.name} ${device?.price}$ (${device?.leftInStock} in stock)`;

  const body = <Row>
    <Col>
      {device?.description}
    </Col>
    <Col>
      {props.itemsInStock > 0 && <Button onClick={props.onAddToCart} variant={"outline-primary"}>Add to cart</Button>}
      {props.itemsInCart > 0 && <Button onClick={props.onRemoveFromCart} className={"mt-2"} variant={"outline-danger"}>Remove from cart</Button>}
      <div className={"mt-2"}>This items in cart: {props.itemsInCart}</div>
    </Col>
  </Row>

  return <ActionModal show={props.show} title={title} body={body} onCancel={props.onCancel}/>
})