FROM openjdk:11

ADD ./target/book-service-0.0.1-SNAPSHOT.jar /usr/src/book-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "book-service-0.0.1-SNAPSHOT.jar"]
