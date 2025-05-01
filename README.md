# Bootcamp-fullstack Mongo + Node.js API Docker
Este pryecto es una práctica del Máster Full Stack en Threepoints

# Proyecto Full Stack – Mongo + Node.js API Dockerizada

Este proyecto es una práctica del Máster Full Stack en Threepoints. Consiste en:

- Desplegar una db con MongoDB/Docker con persistencia
- Crear una API REST sencilla en Node.js para acceder y manipular los datos
- Dockerizar la API y conectar los servicios usando Docker Compose

## 💻 Tecnologías usadas

- Node.js
- Express
- MongoDB
- Docker
- Docker Compose

## 🚀 Cómo ejecutarlo en tu máquina

### 1. Clona el repositorio

```bash
git clone https://github.com/cibarra95/bootcamp-fullstack.git
```

```
cd bootcamp-fullstack
```

### 2. Levantar docker desde la raiz del proyecto
```
docker compose up --build -d
```

### 3. Endpoints disponibles
| Método | Ruta             | Descripción                          |
|--------|------------------|--------------------------------------|
| GET    | /users           | Devuelve todos los usuarios          |
| GET    | /users/search    | Filtra usuarios por parámetros       |
| PUT    | /users/update    | Crea o actualiza un usuario por email|
| DELETE | /users/delete    | Elimina un usuario por email         |