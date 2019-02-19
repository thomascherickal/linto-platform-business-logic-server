### Install project
```
git clone ssh://git@ci.linagora.com:7999/linagora/lgs/labs/Linto-Device/Linto-Backend/linto-red.git
cd linto-red
npm install
```

### Configuration environement
`cp .envdefault .env`
Then update the `.env` to manage your personal configuration

### Run project
Normal : `npm run start`
Debug : `DEBUG=* npm run start`

### Connexion interface
```
> localhost:9000/redui
```

## Docker
### Install Docker and Docker Compose

You will need to have Docker and Docker Compose installed on your machine. If they are already installed, you can skip this part.
Otherwise, you can install them referring to [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/ "Install Docker"), and to [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/ "Install Docker Compose").

### Pre-Requis

Until `linto-skills-core`, `linto-skills-optional` and `linto-utility` is publishing in git, you will need to have these three folder locally in this folder

### Build

You can build the docker with `docker-compose build`
Then run it with `docker-compose run`