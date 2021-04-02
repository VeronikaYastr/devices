import {DeviceItem} from "./types/DeviceItem";
import {Device} from "./types/Device";

export default class DevicesService {
  async http<T>(url: string, method: string = "GET"): Promise<T> {
    const response = await fetch(url, {
      method: method,
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
    });
    return await response.json();
  }

  getAllDevices = async () => {
    return await this.http<Device[]>('http://localhost:8080/devices');
  }

  getDevicesCart = async () => {
    return await this.http<DeviceItem[]>('http://localhost:8080/devices/cart');
  }

  addDeviceToCart = async (deviceId: number) => {
    return await this.http<string>(`http://localhost:8080/devices/add?deviceId=${deviceId}`, "POST");
  }

  removeDeviceFromCart = async (deviceId: number) => {
    return await this.http<string>(`http://localhost:8080/devices/remove?deviceId=${deviceId}`, "POST");
  }
}