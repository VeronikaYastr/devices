import {DeviceItem} from "./types/DeviceItem";
import {Device} from "./types/Device";

export default class DevicesService {
  readonly serverUrl = "http://localhost:8080/";

  async http<T>(url: string, method: string = "GET"): Promise<T> {
    const response = await fetch(`${this.serverUrl}/${url}`, {
      method: method,
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
    });
    return await response.json();
  }

  getAllDevices = async () => {
    return await this.http<Device[]>('devices');
  }

  getDevicesCart = async () => {
    return await this.http<DeviceItem[]>('devices/cart');
  }

  addDeviceToCart = async (deviceId: number) => {
    return await this.http<string>(`devices/add?deviceId=${deviceId}`, "POST");
  }

  removeDeviceFromCart = async (deviceId: number) => {
    return await this.http<string>(`devices/remove?deviceId=${deviceId}`, "POST");
  }
}