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
    /*if (this.selectedDeviceQuantity) {
      const deviceInCart = this.cartItems.find(i => i.device.id === this.selectedDeviceQuantity?.id);
      if (deviceInCart) {
        this.cartItems = [{device: this.selectedDeviceQuantity, amount: deviceInCart.amount + 1},
          ...this.cartItems.filter(i => i.device.id !== this.selectedDeviceQuantity?.id)]
      } else {
        this.cartItems.push({device: this.selectedDeviceQuantity, amount: 1});
      }
      this.showChangeDataModal = true;
      this.changeDataText = `${this.selectedDeviceQuantity.name} quantity increased.`;
    }*/
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
    /*if (this.selectedDeviceQuantity) {
      const deviceInCart = this.cartItems.find(i => i.device.id === this.selectedDeviceQuantity?.id);
      if (deviceInCart) {
        this.cartItems = [{device: this.selectedDeviceQuantity, amount: deviceInCart.amount - 1},
          ...this.cartItems.filter(i => i.device.id !== this.selectedDeviceQuantity?.id)]
        this.showChangeDataModal = true;
        this.changeDataText = `${this.selectedDeviceQuantity.name} quantity decreased.`;
      }
    }*/
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