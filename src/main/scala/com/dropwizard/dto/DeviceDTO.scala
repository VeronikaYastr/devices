package com.dropwizard.dto

final case class DeviceDTO(
  id: Int,
  name: String,
  description: String,
  price: BigDecimal,
  leftInStock: Int
)
