# Configuración de Entorno Virtual y Despliegue para Proyecto Flask

```bash
## Tabla de Contenidos
1. Configuración del Entorno Virtual
2. Instalación de Dependencias
3. Variables de Entorno
4. Ejecución de la Aplicación
5. Comandos Adicionales Útiles
6. Gestión con Git
7. Despliegue en PythonAnywhere
```

## 1. Configuración del Entorno Virtual


```bash
### Crear entorno virtual
python -m venv env

### Activar entorno (Windows PowerShell)
.\env\Scripts\Activate.ps1

### Verificar activación (debe mostrar (env) al inicio)
(env) PS ruta\a\tu\proyecto>




## 2. Instalación de Dependencias



### Paquetes básicos
pip install flask python-dotenv flask-sqlalchemy

### Desde requirements.txt
pip install -r requirements.txt


## 3. Variables de Entorno



### Configurar variables (PowerShell)


$env:FLASK_APP="app.py"
$env:FLASK_ENV="development"
$env:DATABASE_URL="sqlite:///base_datos/bd_mandho.db"


### Ver variables configuradas
Get-ChildItem Env:

## 4. Ejecución de la Aplicación

### Modo básico
flask run

### Alternativa
python app.py

### Con modo debug


$env:FLASK_DEBUG="1"; flask run


## 5. Comandos Adicionales Útiles

### Ver rutas disponibles
flask routes

### Ejecutar pruebas
python -m pytest -v

### Monitorear logs
Get-Content -Path "logs/app.log" -Wait



## 7. Despliegue en PythonAnywhere

### Crear y activar entorno
python -m venv /home/Luidev/venv
source /home/Luidev/venv/bin/activate

### Instalar dependencias
pip install -r requirements.txt

### Configurar WSGI
echo "import sys
path = '/home/Luidev/proyecto_agua'
if path not in sys.path:
    sys.path.append(path)
from app import app as application" > /var/www/luidev_pythonanywhere_com_wsgi.py

### Solución de problemas comunes
chmod 644 /home/Luidev/proyecto_agua/app.py




## 🚀 6. Despliegue en PythonAnywhere

# Configuración inicial en PythonAnywhere:
1. Crear cuenta en PythonAnywhere
2. Abrir consola Bash
3. Clonar repositorio:
git clone https://github.com/tuusuario/proyecto_agua.git

# Configurar entorno virtual
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurar aplicación web:
1. Ir a pestaña 'Web'
2. Especificar ruta del código fuente
3. Configurar ruta del virtualenv: /home/tuusuario/proyecto_agua/venv
4. Configurar archivo WSGI


## 🛠️ 7. Comandos Avanzados Útiles

# Migraciones de base de datos
flask db init
flask db migrate -m "Mensaje descriptivo"
flask db upgrade

# Ejecutar pruebas con cobertura
pip install pytest-cov
python -m pytest --cov=app tests/ -v

# Monitorear logs en producción
tail -f /var/log/tuusuario.server.log



## 🔄 8. Actualización del Proyecto

# Flujo típico de actualización
git pull origin desarrollo
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade




## 🆘 9. Solución de Problemas Comunes

# Error: ModuleNotFound
pip install --upgrade -r requirements.txt

# Error: Database not initialized
flask db init
flask db upgrade

# Error: 500 en producción
cat /var/log/tuusuario.error.log


# 💡 Consejos Finales

1. **Siempre** trabaja en un entorno virtual
2. **Nunca** subas archivos sensibles (.env, bases de datos)
3. **Documenta** cada cambio en los commits
4. **Prueba** localmente antes de desplegar
5. **Monitorea** los logs en producción

¡Listo para desarrollar! 🎉
```
