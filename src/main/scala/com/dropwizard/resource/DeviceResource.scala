package com.dropwizard.resource

import com.dropwizard.dto.Status
import com.dropwizard.service.DeviceService

import javax.ws.rs.core.{MediaType, Response}
import javax.ws.rs.{GET, POST, Path, Produces, QueryParam}

@Path("/devices")
class DeviceResource {

  val deviceService = new DeviceService()

  @Produces(Array(MediaType.APPLICATION_JSON))
  @GET def getDevicesList: Response = {
    Response.ok(deviceService.getDevicesList).build()
  }

  @Produces(Array(MediaType.APPLICATION_JSON))
  @Path("/cart")
  @GET def getDevicesCart: Response = {
    Response.ok(deviceService.getDevicesCart).build()
  }

  @Produces(Array(MediaType.APPLICATION_JSON))
  @Path("/add")
  @POST def addDevice(@QueryParam("deviceId") deviceId: Int): Response = {
    deviceService.addDeviceToCart(deviceId)
    Response.ok(Status("OK")).build()
  }

  @Produces(Array(MediaType.APPLICATION_JSON))
  @Path("/remove")
  @POST def removeDevice(@QueryParam("deviceId") deviceId: Int): Response = {
    deviceService.removeDeviceFromCart(deviceId)
    Response.ok(Status("OK")).build()
  }
}
