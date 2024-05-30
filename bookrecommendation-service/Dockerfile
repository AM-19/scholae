FROM openjdk:11

ADD ./target/bookrecommendation-service-0.0.1-SNAPSHOT.jar /usr/src/bookrecommendation-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "bookrecommendation-service-0.0.1-SNAPSHOT.jar"]
