# Serena

Serena es una aplicación web interactiva diseñada para acompañar a las personas adultas en la gestión de su ansiedad, ofreciéndoles orientación, ejercicios y recursos psicoeducativos.

La plataforma no realiza diagnósticos médicos ni sustituye la atención profesional, sino que sirve como una herramienta de apoyo para ayudar al usuario a identificar su estado emocional, reflexionar sobre sus síntomas y mejorar su bienestar emocional a lo largo del tiempo. Si en algún momento necesitas ayuda especializada, te animamos a consultar con un profesional de la salud mental.

[Accede a la aplicación](https://tfg-app.xyz)
> **Nota:**  
> Solo estará disponible si la instancia en la nube en la que se encuentra la aplicación está levantada. 

---

## Funcionalidades

- Página de aterrizaje
- Registro y autentificación de usuarios
- Evaluación psicológica inicial
- Chatbot conversacional
- Perfil de usuario y seguimiento

---

## Tecnologías

- **Frontend:** React
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **API externa:** OpenAI
- **Despliegue:** AWS (EC2)

---

## Instalación y prueba en entorno Linux

### 1. Requisitos previos

Asegúrate de tener instalados en la máquina:
- Git
- Node.js (v18 o superior)
- npm (gestor de paquetes de Node)
- PostgreSQL

### 2. Clona el repositorio y accede a la carpeta principal

```bash
git clone https://github.com/AlejandroGarciaMenor/TFG_GISI.git
cd TFG_GISI
```

### 3. Configura las variables de entorno

Para que la aplicación funcione correctamente, es necesario configurar variables de entorno tanto en el backend como en el frontend.  
En el repositorio se incluyen los archivos `.env.example` en las carpetas `backend` y `frontend`, que sirven como plantilla.  
Copia estos archivos a `.env` y edita los valores de las variables con tus propios datos:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

> **Nota:**  
> Los archivos `.env.example` permiten saber qué variables de entorno son necesarias para ejecutar la aplicación.  
> Por motivos de seguridad, las claves reales y contraseñas no se incluyen en el repositorio.  
> Para pruebas o evaluación, se pueden usar valores ficticios, aunque algunas funcionalidades avanzadas (como el envío de emails o el chatbot) pueden requerir claves reales para funcionar completamente.

### 4. Instala las dependencias y arranca el frontend

```bash
cd frontend
npm install
npm start
```

### 5. Instala las dependencias y arranca el backend

```bash
cd ../backend
npm install
node index.js
```

### 6. Inicia el servidor de la base de datos

Asegúrate de que PostgreSQL está en funcionamiento en tu máquina.  
Crea la base de datos y carga la estructura de tablas ejecutando:

```bash
createdb -U postgres bbdd_tfg
psql -U postgres -d bbdd_tfg -f db/db_esquema.sql 
```

---

Con estos pasos, la aplicación debería estar disponible en [http://localhost:3000](http://localhost:3000) y lista para ser probada.

---

## Manual de uso

El usuario llega a una página de aterrizaje donde se exponen las principales funcionalidades de la aplicación web, y desde esta página, existen dos opciones:

Si es la primera vez que utilizas la aplicación, deberás pulsar el botón de Registro. Cuando crees un nuevo usuario válido, tras el primer inicio de sesión se te redirigirá directamente a un proceso de evaluación inicial en el que debes completar dos cuestionarios (uno de cribado básico y uno de evaluación del nivel de ansiedad). En función de tus respuestas, hay distintas opciones, pero lo más común es que se te redirija a la página del chatbot Serena, donde podrás intercambiar tus síntomas o cualquier sentimiento que desees compartir con el chatbot. Cuando finalice la conversación o el chatbot haya detectado* un posible tipo de trastorno de ansiedad asociado, podrás dirigirte a la página de perfil de usuario, donde encontrarás tu perfil y una serie de secciones preparadas para ti.

Si ya tienes una cuenta, puedes pulsar el botón de Inicio de Sesión para introducir tus credenciales e ir directamente a tu página de perfil. Siempre que lo desees, puedes volver a iniciar desde tu perfil un nuevo proceso de cuestionarios y conversación con el chatbot. De hecho, es lo ideal ya que de esta forma podrás llevar un seguimiento de tu evolución en el tiempo con el objetivo de que mejoren tus síntomas y tu estado emocional.

## Autor
##### Alejandro García Menor (Email: alejandro.garciamenor@usp.ceu.es)
##### Trabajo Fin de Grado de Ingeniería en Sistemas de Información – Universidad CEU San Pablo