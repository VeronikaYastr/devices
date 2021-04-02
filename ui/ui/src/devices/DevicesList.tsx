import {observer} from "mobx-react";
import {Table} from "react-bootstrap";
import {devicesStore} from "./DevicesStore";
import {useEffect} from "react";
import {ResultsNotFoundOrLoading} from "../components/ResultsNotFoundOrLoading";
import {DevicesQuantityChangeModal} from "./DevicesQuantityChangeModal";
import {DeviceRow} from "./DeviceRow";
import {ActionModal} from "../components/ActionModal";

const DevicesList = observer(() => {
  useEffect(() => {
    devicesStore.loadDevices();
    devicesStore.loadDevicesCart();
  }, []);

  return (
    <ResultsNotFoundOrLoading listEmpty={!devicesStore.devicesList.length} isLoading={devicesStore.isLoading}>
      <DevicesQuantityChangeModal
        show={devicesStore.showQuantityModal}
        device={devicesStore.selectedDevice}
        itemsInCart={devicesStore.devicesCart.find(
          i => i.deviceId === devicesStore.selectedDevice?.id)?.quantity || 0}
        itemsInStock={devicesStore.devicesList.find(d => d.id === devicesStore.selectedDevice?.id)?.leftInStock || 0}
        onAddToCart={devicesStore.onAddDeviceToCart}
        onRemoveFromCart={devicesStore.onRemoveDeviceFromCart}
        onCancel={devicesStore.onQuantityModalClose}/>
      <ActionModal
        show={devicesStore.showChangeDataModal}
        title={"Data was changed!"}
        body={<div>{devicesStore.changeDataText}</div>}
        onCancel={devicesStore.onChangeDataModalClose}/>
      <Table className={"mt-3"}>
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Left in stock</th>
        </tr>
        </thead>
        <tbody>
        {devicesStore.devicesList.map((d, index) =>
          <DeviceRow key={index} index={index} device={d}
                     onDeviceClick={() => devicesStore.onShowQuantityModalChange(true, d)}/>)}
        </tbody>
      </Table>
    </ResultsNotFoundOrLoading>
  );
});

export default DevicesList;