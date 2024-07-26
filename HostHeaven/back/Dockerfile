FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /back
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
WORKDIR /back
COPY --from=build /back/target/hostheaven-0.0.1-SNAPSHOT.jar back.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "back.jar"]