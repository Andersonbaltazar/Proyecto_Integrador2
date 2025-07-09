# 🌱 AgroTech - Plataforma de Agricultura Inteligente

## 📋 Descripción

AgroTech es una plataforma integral de agricultura inteligente que combina tecnología de IA, análisis predictivo y gestión de cultivos para empoderar a los agricultores con herramientas digitales avanzadas. El sistema permite registrar terrenos agrícolas, recibir estimaciones automáticas de tiempo de cosecha y acceder a recomendaciones personalizadas proporcionadas por inteligencia artificial.

## 🎯 Propósito

### Misión
Empoderar a los agricultores mediante tecnología accesible, brindando soluciones inteligentes que optimicen la gestión agrícola, mejoren la productividad y promuevan la sostenibilidad en el sector.

### Visión
Digitalizar y automatizar tareas esenciales en el manejo agrícola, mejorando la toma de decisiones de los agricultores al proporcionarles herramientas de predicción y recomendaciones personalizadas, además de facilitar la administración de sus sembríos desde cualquier lugar.

## 🚀 Características Principales

- **Análisis Predictivo**: Predicciones precisas sobre cultivos y toma de decisiones mejorada
- **Asistente IA**: Recomendaciones personalizadas para optimizar la producción
- **Gestión de Cultivos**: Registro y seguimiento completo de cultivos
- **Dashboard Interactivo**: Métricas clave y visualizaciones en tiempo real
- **Autenticación OAuth2**: Login seguro con Google
- **Aplicación Móvil**: Acceso desde dispositivos Android
- **Chat IA**: Asistente conversacional para consultas agrícolas

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17** - Lenguaje principal
- **Spring Boot 3.4.5** - Framework de desarrollo
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - Persistencia de datos
- **OAuth2 Client** - Autenticación con Google
- **PostgreSQL/MySQL** - Base de datos
- **H2 Database** - Base de datos en memoria para desarrollo
- **Google Gemini API** - Inteligencia artificial

### Frontend (Web)
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **Vite 6.3.5** - Herramienta de construcción
- **Tailwind CSS 4.1.7** - Framework de estilos
- **React Router DOM 7.6.0** - Enrutamiento
- **Zustand 5.0.5** - Gestión de estado
- **Axios 1.10.0** - Cliente HTTP
- **Chart.js 4.5.0** - Gráficos y visualizaciones
- **Recharts 3.0.2** - Componentes de gráficos
- **Lucide React 0.511.0** - Iconos
- **SweetAlert2 11.22.2** - Alertas y modales

### Aplicación Móvil (Android)
- **Kotlin** - Lenguaje de programación
- **Android SDK 35** - Plataforma Android
- **Retrofit 2.9.0** - Cliente HTTP
- **Firebase** - Servicios de Google
- **Google Sign-In** - Autenticación
- **Coroutines** - Programación asíncrona
- **ViewModel & LiveData** - Arquitectura MVVM

## 📁 Estructura del Proyecto

```
Proyecto_Integrador2/
├── 📱 mobile/                          # Aplicación Android
│   └── AgroMobile/
│       ├── app/
│       │   ├── src/main/
│       │   │   ├── java/com/gonzales/liam/agromobile/
│       │   │   │   ├── models/         # Modelos de datos
│       │   │   │   ├── network/        # Servicios de red
│       │   │   │   └── utils/          # Utilidades
│       │   │   └── res/                # Recursos Android
│       │   └── build.gradle
│       └── build.gradle
├── 🌐 frontend/                        # Aplicación Web React
│   ├── src/
│   │   ├── components/                 # Componentes React
│   │   │   ├── components/            # Componentes básicos
│   │   │   ├── layouts/               # Layouts y estructura
│   │   │   ├── modules/               # Módulos específicos
│   │   │   └── widgets/               # Widgets reutilizables
│   │   ├── pages/                     # Páginas de la aplicación
│   │   ├── services/                  # Servicios de API
│   │   ├── store/                     # Gestión de estado (Zustand)
│   │   ├── css/                       # Estilos CSS
│   │   └── assets/                    # Recursos estáticos
│   ├── package.json
│   └── vite.config.js
├── ⚙️ src/                            # Backend Spring Boot
│   └── main/java/tecsup/edu/pe/integrador_2/
│       ├── controller/                # Controladores REST
│       ├── model/                     # Entidades JPA
│       ├── repository/                # Repositorios de datos
│       ├── service/                   # Lógica de negocio
│       └── security/                  # Configuración de seguridad
├── 📄 pom.xml                         # Configuración Maven
└── 📄 README.md                       # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Java 17** o superior
- **Node.js 18** o superior
- **npm** o **yarn**
- **Android Studio** (para desarrollo móvil)
- **PostgreSQL** o **MySQL** (opcional, H2 para desarrollo)
- **Maven 3.6** o superior

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Proyecto_Integrador2
```

### 2. Configurar el Backend

```bash
# Navegar al directorio raíz (donde está pom.xml)
cd Proyecto_Integrador2

# Instalar dependencias Maven
mvn clean install

# Configurar variables de entorno
# Crear archivo: src/main/resources/application-local.properties
# Incluir las siguientes variables:
# - spring.security.oauth2.client.registration.google.client-id
# - spring.security.oauth2.client.registration.google.client-secret
# - security.oauth2.mobile.client-id
# - gemini.api.key

# Ejecutar la aplicación
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3. Configurar el Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

### 4. Configurar la Aplicación Móvil

```bash
# Navegar al directorio mobile
cd mobile/AgroMobile

# Abrir con Android Studio
# O ejecutar desde línea de comandos:
./gradlew assembleDebug
```

## 🔧 Configuración de Variables de Entorno

### Backend (application-local.properties)

```properties
# Google OAuth2 Configuration
spring.security.oauth2.client.registration.google.client-id=TU_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=TU_GOOGLE_CLIENT_SECRET

# Mobile OAuth2 Configuration
security.oauth2.mobile.client-id=TU_MOBILE_CLIENT_ID

# Gemini AI API
gemini.api.key=TU_GEMINI_API_KEY

# Database Configuration (opcional)
spring.datasource.url=jdbc:postgresql://localhost:5432/agrotech
spring.datasource.username=usuario
spring.datasource.password=contraseña
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=TU_GOOGLE_CLIENT_ID
```

## 📱 Uso de la Aplicación

### Web Application

1. **Registro/Login**: Accede usando tu cuenta de Google
2. **Dashboard**: Visualiza métricas y estadísticas de tus cultivos
3. **Gestión de Cultivos**: Registra y administra tus cultivos
4. **Chat IA**: Consulta con el asistente inteligente
5. **Configuración**: Personaliza tu perfil y preferencias

### Aplicación Móvil

1. **Instalación**: Descarga e instala la APK
2. **Autenticación**: Inicia sesión con Google
3. **Dashboard**: Accede a información clave de tus cultivos
4. **Gestión**: Administra cultivos desde tu dispositivo móvil

## 🔐 Seguridad

- **OAuth2**: Autenticación segura con Google
- **Spring Security**: Protección de endpoints
- **HTTPS**: Comunicación encriptada
- **Validación**: Validación de datos en frontend y backend
- **Variables de Entorno**: Configuración sensible protegida

## 🧪 Testing

### Backend
```bash
mvn test
```

### Frontend
```bash
cd frontend
npm run lint
npm test
```

### Mobile
```bash
cd mobile/AgroMobile
./gradlew test
```

## 📦 Despliegue

### Backend (Producción)
```bash
mvn clean package
java -jar target/Integrador_2-0.0.1-SNAPSHOT.jar
```

### Frontend (Producción)
```bash
cd frontend
npm run build
# Servir archivos estáticos desde /dist
```

### Mobile (Producción)
```bash
cd mobile/AgroMobile
./gradlew assembleRelease
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Desarrolladores**: Equipo de desarrollo AgroTech
- **Institución**: Tecsup
- **Año**: 2025

## 📞 Soporte

Para soporte técnico o consultas:
- Email: juan.rodriguez.o@tecsup.edu.pe

## 🔄 Versiones

- **v1.0.0** - Versión estable

---

**AgroTech** - Revolucionando la agricultura con tecnología inteligente 🌱 