FROM openjdk:8-jre-alpine
RUN mkdir -p /app
USER 1000
WORKDIR /app
COPY target/scala-2.12/devices-shop-backend_2.12-0.1.jar /app/app.jar
ENTRYPOINT java -jar /app/app.jar server