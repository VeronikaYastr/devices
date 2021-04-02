import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import DevicesService from "./DevicesService";
import {DeviceItem} from "./types/DeviceItem";
import {Device} from "./types/Device";

class DevicesStore {
  @observable devicesList: Device[] = [];
  @observable devicesCart: DeviceItem[] = [];
  @observable selectedDevice?: Device = undefined;
  @observable showQuantityModal = false;
  @observable showChangeDataModal = false;
  @observable changeDataText = "";
  @observable isLoading = false;

  devicesService: DevicesService;

  constructor(devicesService: DevicesService) {
    this.devicesService = devicesService;
    makeAutoObservable(this);
  }

  @action
  onShowQuantityModalChange = (showModal: boolean, selectedDevice?: Device) => {
    this.showQuantityModal = showModal;
    this.selectedDevice = selectedDevice;
  }

  @action
  onQuantityModalClose = () => {
    this.onShowQuantityModalChange(false, undefined);
  }

  @action
  onChangeDataModalClose = () => {
    this.showChangeDataModal = false;
    this.changeDataText = "";
  }

  @action
  onAddDeviceToCart = async () => {
    this.setIsLoading(true);
    if (this.selectedDevice) {
      await this.devicesService.addDeviceToCart(this.selectedDevice.id);
      await this.loadDevicesCart();
      await this.loadDevices();
    }
    this.setIsLoading(false);
  }

  @action
  onRemoveDeviceFromCart = async () => {
    this.setIsLoading(true);
    if (this.selectedDevice) {
      await this.devicesService.removeDeviceFromCart(this.selectedDevice.id);
      await this.loadDevices();
      await this.loadDevicesCart();
    }
    this.setIsLoading(false);
  }

  @action
  loadDevices = async () => {
    this.setIsLoading(true);
    const response = await this.devicesService.getAllDevices();
    runInAction(() => {
      this.devicesList = response;
    });
    this.setIsLoading(false);
  }

  @action
  loadDevicesCart = async () => {
    this.setIsLoading(true);
    const response = await this.devicesService.getDevicesCart();
    runInAction(() => {
      this.devicesCart = response;
    });
    this.setIsLoading(false);
  }

  @action
  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }
}

export const devicesStore = new DevicesStore(new DevicesService())