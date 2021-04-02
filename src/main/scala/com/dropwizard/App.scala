package com.dropwizard

import com.dropwizard.resource.DeviceResource
import io.dropwizard.setup.{Bootstrap, Environment}
import io.dropwizard.{Application, Configuration}

class MyConfiguration extends Configuration {
}

class App extends Application[MyConfiguration] {
  def init(bootstrap: Bootstrap[MyConfiguration]): Unit = {
  }

  def run(conf: MyConfiguration, env: Environment) {
    env.jersey().register(new DeviceResource())
    env.jersey().register(new CORSFilter())
    env.jersey.register(new CustomJacksonJaxbJsonProvider)
  }
}

object App {
  def main(args: Array[String]) {
    new App().run(args: _*)
  }
}
