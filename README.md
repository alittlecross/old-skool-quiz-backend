# old-skool-quiz-backend

## Prerequisites

### Environment Variables

| Name         | Description                               | Used By   | Required | Default               |
|--------------|-------------------------------------------|-----------|----------|-----------------------|
| ORIGIN_REGEX | URL pattern with which socket.io can talk | Socket.io | No       | http://localhost:3001 |
| PORT         | The port to listen for connections on     | Express   | No       | 3000                  |
| PUBLIC_URL   | The path to serve assets from             | Express   | No       |                       |

## Getting Started

```
npm install
```

### Run the app

```
npm start
```

### Run in development mode

```
npm run start:nodemon
```
