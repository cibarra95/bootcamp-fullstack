# Imagen de node
FROM node:20

# Crear carpeta en el container
WORKDIR /app

# Copiar archivos e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar los archivos restantes
COPY .. .

# Exponer puerto
EXPOSE 3000

# Correr comando de node
CMD ["node", "index.js"]