# Configuración de Properties

## Archivos de Configuración

### `application.properties`
- **Propósito**: Configuración principal de la aplicación
- **Contenido**: Configuración no sensible que puede compartirse
- **Git**: ✅ Se sube a GitHub

### `application-local.properties`
- **Propósito**: Configuración local con información sensible
- **Contenido**: Llaves de API, client secrets, etc.
- **Git**: ❌ NO se sube a GitHub (excluido en .gitignore)

## Cómo usar

1. **Desarrollo local**: 
   - El archivo `application-local.properties` se carga automáticamente
   - Contiene todas las llaves necesarias para desarrollo

2. **Producción**:
   - Usar variables de entorno o configurar las llaves directamente en el servidor
   - NO usar el archivo local en producción

3. **Nuevos desarrolladores**:
   - Copiar `application-local.properties` y renombrarlo
   - Reemplazar las llaves con las propias
   - NUNCA subir llaves reales a GitHub

## Variables Sensibles

Las siguientes variables están en `application-local.properties`:

- `spring.security.oauth2.client.registration.google.client-id`
- `spring.security.oauth2.client.registration.google.client-secret`
- `security.oauth2.mobile.client-id`
- `gemini.api.key`

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca subas llaves reales a GitHub
- Usa variables de entorno en producción
- Mantén el archivo local solo en tu máquina
- Considera rotar las llaves regularmente 