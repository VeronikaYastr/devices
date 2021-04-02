package com.dropwizard

import javax.ws.rs.container.{ContainerRequestContext, ContainerResponseContext, ContainerResponseFilter}
import javax.ws.rs.ext.Provider

@Provider
class CORSFilter extends ContainerResponseFilter {

  override def filter(requestContext: ContainerRequestContext, cres: ContainerResponseContext): Unit = {
    cres.getHeaders.add("Access-Control-Allow-Origin", "*")
    cres.getHeaders.add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
    cres.getHeaders.add("Access-Control-Allow-Credentials", "true")
    cres.getHeaders.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
    cres.getHeaders.add("Access-Control-Max-Age", "1209600")
  }
}
