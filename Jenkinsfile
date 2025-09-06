pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'main', url: 'https://github.com/Vistaar07/react-selenium-jenkins.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Running npm install...'
                sh 'npm install'
            }
        }
        stage('Run Selenium Tests') {
            steps {
                script {
                    sh """
                        #!/bin/bash
                        set +e
                        
                        # Start the React app in the background
                        echo 'Starting React app...'
                        npm start &
                        REACT_PID=\$!
                        
                        # Give the app a moment to start up
                        echo 'Waiting for application to start...'
                        sleep 15
                        
                        # Run the Selenium tests
                        echo 'Running Selenium tests...'
                        npm run test:selenium
                        TEST_RESULT=\$?
                        
                        # Stop the React app
                        echo "Stopping React app (PID: \$REACT_PID)..."
                        kill \$REACT_PID
                        
                        # Exit with the test result code to mark the build as success/failure
                        exit \$TEST_RESULT
                    """
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
