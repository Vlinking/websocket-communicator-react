## Philosophy

A simple tool to send and receive notifications in browser.

The client ran from the browser can send a message that will be immediately displayed on all OTHER connected clients
(excluding the one sending the message).

The serwer is written in Python 3.5.1 using asyncio/websockets.

The client is written using React.js and Node.js 4.4.5.

There is a desktop notification displayed when the message is received, if the user has granted the app desktop notification
permissions.

The application is packed using Docker and docker-compose.

## Usage

```
docker-compose build
docker-compose up
```

Two endpoints will be enabled. Go to `localhost:3000` and you will get the client app that will connect to the websocket
server enabled on port 8765.

(Windows 7 users will have to run `docker-machine ip default` and use its IP instead of localhost to connect to the client).