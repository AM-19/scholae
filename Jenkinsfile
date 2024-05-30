// pipeline {
//     agent any
//     environment {
//         repo_path = '$(basename $PWD)'
//     }
//     stages {
//         stage('sync source code') {
//             when{ branch 'v1.0.0' }
//             steps {
//                 sh "rsync -rva ../${repo_path} ubuntu@10.20.1.136:/home/ubuntu/"
//             }
//         }
//         stage('build') {
//             when { branch 'v1.0.0' }
//             steps {
//                 sh "ssh ubuntu@10.20.1.136 'cd ~/'shopperzoid_master' ; mvn clean package -DskipTests'"
//                 sh "ssh ubuntu@10.20.1.252 'cd ~/'shopperzoid_master'/frontend ; npm install'"
//                 sh "ssh ubuntu@10.20.1.252 'cd ~/'shopperzoid_master'/frontend ; ng build'"
//
//             }
//         }
//         stage('Deploy') {
//             when { branch 'v1.0.0' }
//             steps {
//                 sh "ssh ubuntu@10.20.1.136 'cd ~/'shopperzoid_master' ; docker-compose up --build -d'"
//             }
//         }
//         stage('Deployment status') {
//             when { branch 'v1.0.0' }
//             steps {
//                 sh "ssh ubuntu@10.20.1.136 'cd ~/'shopperzoid_master' ; sleep 30 ; docker ps'"
//             }
//         }
//     }
// }
