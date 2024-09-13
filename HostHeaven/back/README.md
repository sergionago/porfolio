## Getting Started

Para ejecutar el proyecto es recomendable hacerlo desde un IDE específico para Java, como Spring Tool 4 (ST4), explicaré el proceso para este entorno de desarrollo.<br>

### `Despliegue para producción`<br>
Es necesario establecer valores concretos en el archivo application.properties con las siguientes variables de entorno:<br>
spring.datasource.url=*url base de datos*<br>
spring.datasource.username=*usuario base de datos*<br>
spring.datasource.password=*contraseña base de datosl*<br>
spring.datasource.driver-class-name=org.postgresql.Driver<br>
spring.jpa.hibernate.ddl-auto=update<br>
spring.jpa.show-sql=true<br>
server.tomcat.accesslog.enabled=true<br>
spring.jpa.open-in-view=false<br>
spring.mail.host=*host servidor email*<br>
spring.mail.port=*puerto servidor email*<br>
spring.mail.username=*dirección email*<br>
spring.mail.password=*contraseña email*<br>
spring.mail.properties.mail.smtp.starttls.enable=true<br>
spring.mail.properties.mail.smtp.auth=true

<br>

1. Abrir el proyecto desde ST4 pulsando sobre:
```bash
File -> Open Projects From File System -> Directory -> back
```

<br>

2. Construir la aplicación optimizada para producción:
```bash
mvn clean package
```
<br>

3. Finalmente, ya sería posible ejecutar la aplicación Spring:
```bash
java -jar target/hostheaven-0.0.1-SNAPSHOT.jar
```

<br>

### `Despliegue para desarrollo`<br>
Es necesario determinar las mismas variables de entorno que en el despliegue de producción, pero en el archivo application-dev.properties.<br>


<br>

1. Abrir el proyecto desde ST4 pulsando sobre:
```bash
File -> Open Projects From File System -> Directory -> back
```

<br>

2. Para ejecutar el backend es posible hacerlo desde la interfaz de ST4:<br>
```bash
Haciendo click en Run -> Run Configurations -> Perfil dev -> Click sobre Run
```
O teniendo Maven instalado y ejecutando el comando:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```


<br>

Tras estos pasos, la aplicación ya sería accesible desde [http://localhost:8080](http://localhost:8080)