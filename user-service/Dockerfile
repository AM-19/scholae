FROM openjdk:11

WORKDIR usr/src

ADD ./target/user-service-0.0.1-SNAPSHOT.jar /usr/src/user-service-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar", "user-service-0.0.1-SNAPSHOT.jar"]
