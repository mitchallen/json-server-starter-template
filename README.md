json-server-starter-template
==

## Usage

* To run as a server:

```js
npm start
```

* Browse to the root endpoint - showing server status:

* http://localhost:3000/

* Browse to the API Swagger Explorer: 

* http://localhost:3000/api-docs/


* * *

## Docker

### Make sure Docker is running

On a Mac:

```sh
open -a Docker
```

### Build

```sh
npm run docker:build
```

```sh
 docker images | grep json
```

### Run 

* Confirm that Docker is running
* Make sure nothing else is running on the port

```sh
npm run docker:run
```

The port was loaded from the env.docker.list file:

Browse to:
* http://localhost:3100
* http://localhost:3100/api-docs/

or:

```sh
curl http://localhost:3100
```

### Rebuild and Run again

```sh
npm run docker:rerun
```

### Stop

```sh
npm run docker:stop
```

### Cleanup

```sh
npm run docker:clean
```

This does the same thing:

```sh
docker stop my-service
docker rm my-service
docker rmi json-server-img
```

* * *

## References

* https://scriptable.com/docker/how-to-publish-a-docker-container 
