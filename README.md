# Business-Logic-Server
The BLS will manage a LinTO processus defined by an user
It regroup all connector to server functionality for linto (LinStt, OpenPaas, TOCK, ...)
This will allow to make Speach To Text, Natural Language Processing, Interpretation of the data to finish has an answer

# Install project
```
git clone https://github.com/linto-ai/Business-Logic-Server.git
cd Business-Logic-Server
npm install
```

## Configuration environement
`cp .envdefault .env`
Then update the `.env` to manage your personal configuration

## Run project
Normal : `npm run start`
Debug : `DEBUG=* npm run start`

## Interface connect
By default you can reach the user interface on [http://localhost:9000](http://localhost:9000)

# Docker
## Install Docker and Docker Compose
You will need to have Docker and Docker Compose installed on your machine. If they are already installed, you can skip this part.
Otherwise, you can install them referring to [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/ "Install Docker"), and to [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/ "Install Docker Compose").

## Build
You can build the docker with `docker-compose build`
Then run it with `docker-compose run`
Then you can acces it on  [http://localhost:9000](http://localhost:9000)
