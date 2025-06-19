# titulo

Serena (Sistema de Evaluación y REcomeNdaciones para la Ansiedad) es una aplicación web interactiva diseñada para acompañar a las personas adultas en la gestión de su ansiedad, ofreciéndoles orientación, ejercicios y recursos psicoeducativos.

La plataforma no realiza diagnósticos médicos ni sustituye la atención profesional, sino que sirve como una herramienta de apoyo para ayudar al usuario a identificar su estado emocional, reflexionar sobre sus síntomas y mejorar su bienestar emocional a lo largo del tiempo. Si en algún momento necesitas ayuda especializada, te animamos a consultar con un profesional de la salud mental.

[Accede a la aplicación](https://tfg-app.xyz)

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

## Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/AlejandroGarciaMenor/TFG_GISI.git
cd TFG_GISI
```

### 2. Configura las variables de entorno
Crea un archivo .env tanto en el directorio /frontend como en /backend, siguiendo el formato del archivo .env.example incluido.

### 3. Instala las dependencias

#### 3.1. Frontend
```bash
cd frontend
npm install
npm start
```

#### 3.2. Backend
```bash
cd backend
npm install
npm start
```

### 4. Asegura que PostgreSQL esté en funcionamiento
Debes tener una instancia de PostgreSQL local o en la nube, con la estructura de tablas cargada desde el archivo disponible en /db.

---

## Credenciales de prueba

Puedes utilizar el siguiente usuario de prueba para acceder a la aplicación:

- Email: 
- Contraseña: 

---

## Manual de uso

El usuario llega a una página de aterrizaje donde se exponen las principales funcionalidades de la aplicación web, y desde esta página, existen dos opciones:

Si es la primera vez que utilizas la aplicación, deberás pulsar el botón de Registro. Cuando crees un nuevo usuario válido, se te redirigirá directamente a un proceso de evaluación inicial en el que debes completar dos cuestionarios (uno de cribado básico y uno de evaluación del nivel de ansiedad). En función de tus respuestas, hay distintas opciones, pero lo más común es que se te redirija a la página del chatbot Serena, donde podrás intercambiar tus síntomas o cualquier sentimiento que desees compartir con el chatbot. Cuando finalice la conversación o el chatbot haya detectado* un posible tipo de trastorno de ansiedad asociado, podrás dirigirte a la página de perfil de usuario, donde encontrarás tu perfil y una serie de secciones preparadas para ti.

Si ya tienes una cuenta, puedes pulsar el botón de Inicio de Sesión para introducir tus credenciales e ir directamente a tu página de perfil. Siempre que lo desees, puedes volver a iniciar desde tu perfil un nuevo proceso de cuestionarios y conversación con el chatbot. De hecho, es lo ideal ya que de esta forma podrás llevar un seguimiento de tu evolución en el tiempo con el objetivo de que mejoren tus síntomas y tu estado emocional.

## Autor
##### Alejandro García Menor (Email: alejandro.garciamenor@usp.ceu.es)
##### Trabajo Fin de Grado de Ingeniería en Sistemas de Información – Universidad CEU San Pablo