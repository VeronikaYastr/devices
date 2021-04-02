package com.dropwizard.service

import com.dropwizard.dto.{DeviceDTO, DeviceItemDTO}

class DeviceService {
  private val devicesList = List(
    DeviceDTO(1, "Iphone XS", "Phone", BigDecimal(100.99), 0),
    DeviceDTO(2, "Mac book", "Laptop", BigDecimal(555.2), 0)
  )

  private var devicesCart = Map[Int, Int]()
  private var devicesInStock = Map[Int, Int](1 -> 10, 2 -> 20)

  def getDevicesList: List[DeviceDTO] = devicesList
    .map(d => DeviceDTO(d.id, d.name, d.description, d.price, devicesInStock.getOrElse(d.id, 0)))

  def getDevicesCart: List[DeviceItemDTO] = devicesCart.map {
    case (dId, quantity) => DeviceItemDTO(dId, quantity)
  }.toList

  def addDeviceToCart(deviceId: Int): Unit = {
    val previousCartQuantity = devicesCart.getOrElse(deviceId, 0)
    val previousStockQuantity = devicesInStock.getOrElse(deviceId, 0)
    if (previousStockQuantity > 0) {
      devicesCart += (deviceId -> (previousCartQuantity + 1))
      devicesInStock += (deviceId -> (previousStockQuantity - 1))
    }
  }

  def removeDeviceFromCart(deviceId: Int): Unit = {
    val previousCartQuantity = devicesCart.getOrElse(deviceId, 0)
    val previousStockQuantity = devicesInStock.getOrElse(deviceId, 0)
    if (previousCartQuantity > 0) {
      devicesCart += (deviceId -> (previousCartQuantity - 1))
      devicesInStock += (deviceId -> (previousStockQuantity + 1))
    }
  }
}
