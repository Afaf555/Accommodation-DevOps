# Build + Run inside Maven image
FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests && cp target/*.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]