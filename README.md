# Business-Logic-Server
This services is mandatory in a complete LinTO platform stack as the main process that actualy executes a workflow defined as a collection of LinTO skills. This service itself mainly consists of a wrapper for a node-red runtime. Any user defined workflow on linto-admin (a given set of configured skills) is therefore backed by a node-red flow.

## Define LinTO contexts as node-red flows
This service provides for a node-red web interface wich is meant to get embedded in the main [LinTO platform admin web interface](https://github.com/linto-ai/linto-platform-admin/). LinTO skills are node-red _nodes_ 

## Usage

See documentation : [https://doc.linto.ai](https://doc.linto.ai)

# Deploy

With our proposed stack [https://github.com/linto-ai/linto-platform-stack](https://github.com/linto-ai/linto-platform-stack)

# Develop

## Install project
```
git clone https://github.com/linto-ai/Business-Logic-Server.git
cd Business-Logic-Server
npm install
```

### Configuration environement
`cp .envdefault .env`
Then update the `.env` to manage your personal configuration

### Run project
Normal : `npm run start`
Debug : `DEBUG=* npm run start`

### Interface connect
By default you can reach the user interface on [http://localhost:9000](http://localhost:9000)

## Docker
### Install Docker and Docker Compose
You will need to have Docker and Docker Compose installed on your machine. If they are already installed, you can skip this part.
Otherwise, you can install them referring to [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/ "Install Docker"), and to [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/ "Install Docker Compose").

### Build
You can build the docker with `docker-compose build`
Then run it with `docker-compose run`
Then you can acces it on  [http://localhost:9000](http://localhost:9000)
