## Getting Started

Es necesario crear un archivo .env y darle un valor a las siguientes variables de entorno:<br>
CLIENT_URI = *Dirección frontend*<br>
PORT = 4000<br>
MONGO_URI = *Dirección base de datos Mongo*<br>
DB_NAME = *Nombre base de datos*<br>
JWT_SECRET = *Número secreto JWT*<br>

<br>

1º Instalar las dependencias necesarias ejecutando el siguiente comando:
```bash
npm install
```

2º Levantar el servidor Node.js:
```bash
npm start
```

<br>


Tras estos pasos, el servidor ya estaría activo en [http://localhost:4000](http://localhost:4000)