# workshop-0-repaso-js-node
Repaso de JS


Errores:

-En la linea 21 de la clase de task manager debemos  crear la instanciana de nuevo ya que  ya que al almacenarlo en el localstorage se guarda en formato json


-En la linea 41 de app.js se escribe "task.toggleComplete();" se elimina el new task ya que se instancia desde el constructor.
siendo el cambio a "this.toggleComplete();"