pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "node-dockerimage-pipeline"
        CONTAINER_NAME = "node-dockercontainer-pipeline"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/gabrieldamke/Node_TopicosAvancados.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }
        
        stage('Run Docker Container') {
            steps {
                script {
                    docker.image(env.DOCKER_IMAGE).run("-d --name ${env.CONTAINER_NAME}")
                }
            }
        }
    }
    
    post {
        always {
            echo 'A pipeline executou até o fim!'
        }
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'Falha na execução da pipeline!'
        }
    }
}