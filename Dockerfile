# Etapa de compilación
FROM node:20-alpine as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiar el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar todas las dependencias, incluidas las de desarrollo
RUN npm install

# Copiar el resto de los archivos al directorio de trabajo
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /App
# Copiar solo los archivos necesarios para la etapa de producción desde la etapa de compilación
COPY --from=build /App/package*.json ./
COPY --from=build /App/dist ./dist
COPY .env .

ARG ARG_TIMEZONE=America/Guayaquil
ENV ENV_TIMEZONE=${ARG_TIMEZONE}

# Configurar la zona horaria
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/$ENV_TIMEZONE /etc/localtime \
    && echo $ENV_TIMEZONE > /etc/timezone

# Instalar solo las dependencias de producción
RUN npm install --only=production
# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 81

# Comando para iniciar la aplicación en modo de producción
CMD ["npm", "run", "start"]
