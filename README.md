## Devices shop application

Run the following commands to start the backend part of the application:

```
sbt docker:publishLocal
docker run -p 8080:8080 devices:0.1 server
```

To run the ui in the other terminal tab:

```
docker-compose up
```

Then you can open localhost:3000/ in your browser.

### Notes
I tried to add backend part start to docker-compose,
but can't fix the error 'main class not found' :(