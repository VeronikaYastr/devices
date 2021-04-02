name := "devices"

version := "0.1"

scalaVersion := "2.12.10"

libraryDependencies += "io.dropwizard" % "dropwizard-core" % "1.0.5"
libraryDependencies += "javax.xml.bind" % "jaxb-api" % "2.3.1"
libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.10.5"
libraryDependencies += "com.fasterxml.jackson.module" % "jackson-module-afterburner" % "2.10.5"

enablePlugins(JavaAppPackaging)
enablePlugins(DockerPlugin)

mainClass in Compile := Some("com.dropwizard.App")
