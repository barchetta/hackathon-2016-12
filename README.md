# hackathon-2016-12

## Docker Notes

See [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

1. `scripts/buildit`: Will build the docker image
2. `docker images`: list images
3. `docker rmi <image id>`: remove image
4. `docker run -p 3030:3000 -d <image id>`: Run image mapping private port 3000 to public (external) port 3030
5. `docker ps -a`: show all running containers

## Kubernetes Notes


