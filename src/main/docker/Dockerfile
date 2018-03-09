FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    SAS_SLEEP=0 \
    JAVA_OPTS=""

# add directly the war
ADD *.jar /app.jar

EXPOSE 8081
CMD echo "The application will start in ${SAS_SLEEP}s..." && \
    sleep ${SAS_SLEEP} && \
    java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.jar
