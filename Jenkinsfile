pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = 'lintoai/linto-platform-business-logic-server'
        DOCKER_HUB_CRED = 'docker-hub-credentials'

        VERDACCIO_REGISTRY_HOST = 'verdaccio.linto.ai'
        REALM_AUTH = credentials('realm-verdaccio-auth')    //_USR & _ PSW

        VERSION = ''
    }

    stages{
        stage('Docker build for master branch'){
            when{
                branch 'master'
            }
            steps {
                echo 'Publishing latest'
                script {
                    image = docker.build(env.DOCKER_HUB_REPO)
                    VERSION = sh(
                        returnStdout: true, 
                        script: "awk -v RS='' '/#/ {print; exit}' RELEASE.md | head -1 | sed 's/#//' | sed 's/ //'"
                    ).trim()

                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKER_HUB_CRED) {
                        image.push("${VERSION}")
                        image.push('latest')
                    }
                }
            }
        }

        stage('Docker build for next (unstable) branch'){
            when{
                branch 'next'
            }
            steps {
                echo 'Publishing unstable'
                script {
                    def unstableImgArg = "--build-arg VERDACCIO_USR=${REALM_AUTH_USR} --build-arg VERDACCIO_PSW=${REALM_AUTH_PSW} --build-arg VERDACCIO_REGISTRY_HOST=${VERDACCIO_REGISTRY_HOST}"
                    def unstableImgPath = "-f ./deployment/Dockerfile ."
                    image = docker.build(env.DOCKER_HUB_REPO, unstableImgArg, unstableImgPath)

                    VERSION = sh(
                        returnStdout: true, 
                        script: "awk -v RS='' '/#/ {print; exit}' RELEASE.md | head -1 | sed 's/#//' | sed 's/ //'"
                    ).trim()
                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKER_HUB_CRED) {
                        image.push('latest-unstable')
                    }
                }
            }
        }
    }// end stages
}
