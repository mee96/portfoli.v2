---
doc: tecnico
lang: es
actualizado: 2026-10
---

## ¿Qué tecnologías usa Carme en el frontend?

Angular es su herramienta principal: signals, componentes standalone, la nueva sintaxis de control de flujo y rutas protegidas con guards. También trabaja con TypeScript, SCSS y Figma para diseño. Conoce Ionic para móvil, que aprendió y usó en el FPO Dual de Fundación Esplai, aunque no forma parte de su trabajo actual. También sabe trabajar con React y Next.js, del bootcamp de Adalab y de su primer portfolio: últimamente se ha centrado más en Angular, pero conoce los dos.

## ¿Qué tecnologías usa Carme en el backend?

Python con FastAPI es su stack principal de backend, con SQLAlchemy como ORM. Diseña y consume APIs REST, y ha montado servidores con WebSockets para tiempo real.

## ¿Con qué bases de datos trabaja Carme?

Principalmente MySQL, casi siempre alojado en Aiven, y también PostgreSQL. Ha usado Qdrant Cloud como base de datos vectorial para sistemas de recuperación aumentada, como el que responde estas preguntas.

## ¿Qué experiencia tiene Carme con inteligencia artificial?

Es la capa que más ha desarrollado en el último año. Ha integrado modelos de Groq en varios proyectos: un asistente conversacional, un oponente de juego, un generador de rutinas y un chat con visión. Ha montado sistemas RAG completos de principio a fin, con fragmentación de documentos, embeddings y búsqueda vectorial en Qdrant. Tiene la certificación Azure AI Fundamentals (AI-900) de Microsoft.
Y bueno, aquí estás hablando conmigo, soy el fruto de todo esto jeje (me he sonrojado)

## ¿Qué usa Carme para desplegar y para infraestructura?

Render para backends y frontends, Vercel para algunos frontends, Firebase para autenticación y Aiven para bases de datos gestionadas. Trabaja con Git y GitHub en ciclos de despliegue semanales, siguiendo un flujo de ramas tipo Gitflow.

## ¿Dónde está el código de Carme?

En su github.com/mee96. Ahí están los repositorios públicos de sus proyectos.
Ella se toma muy en cuenta su github y el orden, se pone de los nervios cuando los commits no se guardan bien y no se ven reflejado en el calendario, vive casi obsesionada con las bolitas verdes del calendario de commits

## ¿Qué está aprendiendo Carme ahora?

Ahora mismo se está centrando en el entorno de Microsoft 365 (Microsoft Graph, Power Apps y un tenant personalizado), en profundizar en RAG y en las capacidades más recientes de Angular.

## ¿Qué experiencia tiene Carme con Microsoft 365?

En su puesto actual en Fundación Esplai trabaja con el ecosistema de Microsoft 365: una app en Angular que usa Microsoft Graph para enviar datos al entorno de Microsoft 365 y automatizar tareas de Microsoft, la puesta en marcha de un tenant personalizado y Power Apps. Además tiene la certificación Azure AI Fundamentals (AI-900), que se puede verificar en Credly: https://www.credly.com/users/carmeen-mc/badges/credly

## ¿Cómo se asegura Carme de la calidad de su código?

En este portfolio hay tests unitarios con Vitest en el frontend y con pytest en el backend, e integración continua con GitHub Actions que ejecuta los tests y el build en cada push y en cada pull request. Trabaja con ramas tipo Gitflow y reserva los pull requests para los cambios importantes, y cada proyecto tiene su README en catalán, castellano e inglés. Es la herencia del laboratorio: si no se puede comprobar, no está terminado.

## ¿Cómo está hecho este portfolio?

Es un proyecto full stack de Carme, de principio a fin. El frontend es Angular (componentes standalone, signals y SCSS con tokens compartidos) y está traducido al catalán, castellano e inglés con un servicio propio de unas treinta líneas, sin librerías de i18n. El backend es FastAPI: un chat por WebSocket que responde con Groq apoyándose en una búsqueda RAG sobre Qdrant Cloud — el asistente con el que estás hablando — y un formulario de contacto que envía el correo con Resend. Todo está desplegado en Render, con límites básicos contra abuso.
