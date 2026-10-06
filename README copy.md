# Donde Nacha Fast Food — Menú QR

MVP de menú digital estático. No necesita base de datos ni servidor.

## Archivos
- `index.html`: estructura de la página.
- `styles.css`: diseño responsive.
- `app.js`: productos, precios, búsqueda, carrito y WhatsApp.
- `logo.png`: logo extraído del menú suministrado.

## Antes de publicar
En `app.js`, cambia:

```js
const WHATSAPP_NUMBER = "";
```

por el número del negocio con indicativo de país, por ejemplo:

```js
const WHATSAPP_NUMBER = "573001234567";
```

## Hosting gratuito recomendado: GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `donde-nacha-menu`.
2. Sube `index.html`, `styles.css`, `app.js` y `logo.png`.
3. En GitHub entra a `Settings` → `Pages`.
4. En "Build and deployment", selecciona `Deploy from a branch`.
5. Selecciona `main` y `/root`.
6. Guarda.
7. GitHub generará una URL parecida a:
   `https://TU-USUARIO.github.io/donde-nacha-menu/`

## QR

Cuando tengamos la URL definitiva, generamos un QR que apunte directamente a esa dirección.

## Siguiente iteración
Podemos agregar:
- botón fijo de WhatsApp;
- dirección y horario;
- imágenes individuales de productos;
- opciones/modificadores (maíz, jamón, tocineta, etc.);
- pedido con nombre, teléfono y observaciones;
- panel administrativo;
- estadísticas de clics;
- dominio propio;
- QR dinámico si el negocio cambia de URL.
