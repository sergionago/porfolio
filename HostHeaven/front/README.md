## Getting Started

Es necesario crear un archivo .env y darle valor a las siguientes variables de entorno:
REACT_APP_BACKEND_DOMAIN: *Dirección del backend*<br>
REACT_APP_EMAIL_REMITENT: *Remitente del sistema de email*<br>
REACT_APP_API_KEY_NGROK: *API key de NGROK*<br>
REACT_APP_URL_NGROK: *Dirección servidor NGROK*<br>

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
3º Finalmente, ya sería posible levantar el servidor local con la aplicación React:
```bash
npm run serve:prod
```

<br>

### `Despliegue para desarrollo`<br>
1º Instalar las dependencias necesarias ejecutando el siguiente comando:
```bash
npm install
```
2º Ejecutar el siguiente comando para levantar el servidor de desarrollo:
```bash
npm start
```

<br>

Tras estos pasos, la aplicación ya sería accesible desde [http://localhost:3000](http://localhost:3000)
