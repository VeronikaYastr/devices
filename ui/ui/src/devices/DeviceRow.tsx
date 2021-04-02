import {FC} from "react";
import {Badge} from "react-bootstrap";
import {Device} from "./types/Device";

export interface DeviceRowProps {
  index: number;
  device: Device;
  onDeviceClick: () => void;
}

export const DeviceRow: FC<DeviceRowProps> = (props => {
  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>
        <Badge variant={"secondary"} onClick={props.onDeviceClick}>{props.device.name}</Badge></td>
      <td>{props.device.price}{"$"}</td>
      <td>{props.device.leftInStock}</td>
    </tr>
  )
})
