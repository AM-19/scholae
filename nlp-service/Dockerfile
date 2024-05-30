FROM openjdk:11

ADD ./target/nlp-service-0.0.1-SNAPSHOT.jar /usr/src/nlp-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "nlp-service-0.0.1-SNAPSHOT.jar"]
