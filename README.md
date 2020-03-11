# Business-Logic-Server

Business Logic Server (BLS) is a workflow runner for a fleet of LinTO that will perform multiple task. It is based on the framework [Node-Red](https://nodered.org/) allowing us to create any workflow/tasks for the require need. A workflow (or process) is a sets of a numbers of tasks defined to be executed in a specific order. 

A workflow will manage input (voice), to output (text to speech) and the task part between both of them called **skill** that allow to determine the suitable answer for LinTO. For all other workflow actions we use [LinTO-Platform-Admin](https://github.com/linto-ai/linto-platform-admin) to manage the edit, setup, delete or create.

With Node-Red we can create any node/task needed for LinTO, by default we include a default set of skills which allow to make some basic command ([LinTO-Skill-Core](https://github.com/linto-ai/linto-skills-core)). This set give access to these skills :
 * Speech To Text ([LinSTT - STT Skill](https://github.com/linto-ai/linto-platform-stt-server-worker-client)), transcribe voice to text
 * Natural Language Understanding ([TOCK - NLU Skill](https://voyages-sncf-technologies.github.io/tock/en/)), detect command intent

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development. 

Nodejs shall be installed `sudo apt-get install nodejs`, also npm shall be installed `sudo apt-get install npm`

### Installing
A step by step series of command that will give you a development environment running
```
git clone https://github.com/linto-ai/Business-Logic-Server.git
cd Business-Logic-Server
npm install
```

### Configuration environment
First copy the default environment file `cp .envdefault .env`, then update the `.env` file to manage your personal configuration

Here is the require environment setting for BLS
* `NODE_ENV` : Environment of the process (`production`, `debug` or `dev`)
* `LINTO_STACK_BLS_HTTP_PORT` : Port where will be deployed the Business-Logic-Server
* `LINTO_STACK_BLS_SERVICE_UI_PATH` : Path of the interface `http://localhost/LINTO_STACK_BLS_SERVICE_UI_PATH`
* `LINTO_STACK_BLS_SERVICE_API_PATH` : Path of the API `http://localhost/LINTO_STACK_BLS_SERVICE_API_PATH`
* `DEFAULT_LANGUAGE` : Default LinTO language that will be speak. (Supported value :`en-US`, `fr-FR` based on [LinSTT](https://github.com/linto-ai/linto-platform-stt-server-worker-client))

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
