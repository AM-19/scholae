FROM openjdk:11

ADD ./target/bookquery-service-0.0.1-SNAPSHOT.jar /usr/src/bookquery-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "bookquery-service-0.0.1-SNAPSHOT.jar"]
