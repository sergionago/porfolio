## Getting Started

Es necesario crear un archivo .env y determinar la dirección del servidor en la variable de entorno **SERVER_URI**.

<br>

### `Despliegue para producción`<br>
1º Instalar las dependencias necesarias ejecutando el siguiente comando:
```bash
npm install
```
2º Construir la aplicación optimizada para producción:
```bash
npm run build
```
3º Finalmente, ya sería posible levantar el servidor Next.js:
```bash
npm start
```

<br>

### `Despliegue para desarrollo`<br>
1º Instalar las dependencias necesarias ejecutando el siguiente comando:
```bash
npm install
```
2º Ejecutar el siguiente comando para levantar el servidor de desarrollo:
```bash
npm run dev
```

<br>

Tras estos pasos, la aplicación ya sería accesible desde [http://localhost:3000](http://localhost:3000)