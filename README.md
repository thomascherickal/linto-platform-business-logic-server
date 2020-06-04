# Business-Logic-Server

Business Logic Server (BLS) is a workflow runner for a fleet of LinTO that will perform multiple task. It's based on [Node-Red](https://nodered.org/) framework allowing us to create any workflow/tasks for any need. A workflow (or process) is a sets of a numbers of tasks defined to be executed in a specific order. 

A workflow will manage a voice (input), to text to speech (output) and all task between them called **skill** that will determine the suitable answer for LinTO. For all other workflow actions we use [LinTO-Platform-Admin](https://github.com/linto-ai/linto-platform-admin) (edit, setup, delete or create).

Node-Red can create any need (node/task) for LinTO, by default we include a default set of skills which allow to make some basic command ([LinTO-Skill-Core](https://github.com/linto-ai/linto-skills-core)). This set give access to these skills :
 * Speech To Text ([LinSTT - STT Skill](https://github.com/linto-ai/linto-platform-stt-server-worker-client)), transcribe voice to text
 * Natural Language Understanding ([TOCK - NLU Skill](https://voyages-sncf-technologies.github.io/tock/en/)), detect command intent
 * And a lot more

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development. 

Nodejs and npm are require  `sudo apt-get install nodejs npm`

### Installing
A step by step series of command that will give you a development environment running
```
git clone https://github.com/linto-ai/Business-Logic-Server.git
cd Business-Logic-Server
npm install
```

### Configuration environment
First copy the default environment file `cp .envdefault .env`, then update the `.env` file to manage your personal configuration

Here the different settings for BLS
```
LINTO_STACK_BLS_HTTP_PORT : BLS deployed port

LINTO_STACK_BLS_SERVICE_UI_PATH : Interface location
LINTO_STACK_BLS_SERVICE_API_PATH : REST api base location

LINTO_STACK_BLS_USE_LOGIN : Add an user to acces bls
LINTO_STACK_BLS_USER : User used for connection
LINTO_STACK_BLS_PASSWORD : Password used for the connection
```
The following settings can be ignored, they are only used for the linto-stack
```
LINTO_STACK_USE_SSL
LINTO_STACK_DOMAIN
```

### Run project
Normal : `npm run start`
Debug : `DEBUG=* npm run start`

### Application Interface

The access of the interface is only for test purpose, it should not be used in a full LinTO deployment because of LinTO-Platform-Admin.
By default you can reach the user interface on [http://localhost:9000/redui](http://localhost:9000/redui)

## Docker
### Install Docker

You will need to have Docker installed on your machine. If they are already installed, you can skip this part.
Otherwise, you can install them referring to [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/ "Install Docker")

### Build
Next step is to build the docker image with the following command `docker build -t bls .`
Then you just need to run bls image `docker run -d -it -p 9000:9000 bls`
Finally you have access to the interface on [http://localhost:9000/redui](http://localhost:9000/redui) based on the default settings

### Stack
You will find the full process to deploy the LinTO platform here : [LinTO-Platform-Stack](https://github.com/linto-ai/linto-platform-stack)
More information about the deployment can be found here : [doc.linto.ai](https://doc.linto.ai/#/infra)