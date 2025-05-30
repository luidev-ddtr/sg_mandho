### Estos son los comandos que se utilizan mas para git y aqui hay una guia rapida de todos ellos 


# 🛠️ Comandos Git Esenciales para tu Proyecto

## 🔄 Flujo Básico de Trabajo
```bash
# Inicializar repositorio
git init

# Conectar con repositorio remoto
git remote add origin https://github.com/tuusuario/proyecto.git

# Clonar un repositorio existente
git clone https://github.com/tuusuario/proyecto.git

# Ver estado de los archivos
git status

# Añadir todos los cambios
git add .

# Añadir archivos específicos
git add archivo1.py archivo2.html

# Hacer commit
git commit -m "Mensaje descriptivo del cambio"

# Subir cambios al remoto
git push origin nombre-rama


```
## Manejo de Ramas
```bash
# Crear nueva rama
git checkout -b nueva-rama

# Cambiar entre ramas
git checkout nombre-rama

# Listar todas las ramas
git branch -a

# Subir rama al remoto
git push -u origin nombre-rama

# Eliminar rama local
git branch -d nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama

# Renombrar rama actual
git branch -m nuevo-nombre
```


## Inspección e Historial
```bash
# Ver historial de commits
git log --oneline --graph

# Ver cambios en archivos
git diff

# Ver cambios preparados para commit
git diff --cached

# Buscar en el historial
git log -p -S"texto-buscado"
```



## 🧹 Limpieza y Corrección
```bash
# Deshacer cambios en archivo no commiteado
git checkout -- archivo.py

# Quitar archivo del stage
git reset HEAD archivo.py

# Modificar último commit
git commit --amend -m "Nuevo mensaje"

# Revertir un commit específico
git revert commit-hash

# Limpiar archivos no rastreados
git clean -fd
```


## 🏷️ Manejo de Tags
```bash
# Crear tag
git tag v1.0.0

# Subir tags al remoto
git push origin --tags

# Listar tags
git tag

# Borrar tag local
git tag -d v1.0.0

# Borrar tag remoto
git push origin :refs/tags/v1.0.0
```

## 🧩 Trabajo con Stash
```bash
# Guardar cambios temporales
git stash push -m "Mensaje descriptivo"

# Listar stashes
git stash list

# Aplicar stash
git stash apply stash@{0}

# Eliminar stash
git stash drop stash@{0}

# Limpiar todos los stashes
git stash clear
```



##  Fusiones Avanzadas
```bash
# Hacer merge de otra rama
git merge nombre-rama

# Hacer rebase de cambios
git rebase nombre-rama

# Resolver conflictos después de merge/rebase
git mergetool

# Continuar después de resolver conflictos
git rebase --continue
```


## Eliminar Archivos
```bash
# Eliminar archivo y rastreo
git rm archivo.txt

# Eliminar solo del repositorio (mantener local)
git rm --cached archivo.txt
```