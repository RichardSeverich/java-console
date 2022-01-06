<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Registro de Usuarios</title>
<style>
.form-container {
  text-align: center;
}
</style>
</head>
<body>

<jsp:include page="Navegacion.html"></jsp:include>

  <% 
    String id = request.getParameter("usuario-id");
    String nombre = request.getParameter("usuario-nombre");
    String apellido = request.getParameter("usuario-apellido");
    String jspFile = "RegistroUsuariosLogica.jsp";
    
    String action = id!=null ? jspFile + "?usuario-id=" + id: jspFile;
    id = id==null ? "":id;
    nombre = nombre==null ? "":nombre;
    apellido = apellido==null ? "":apellido;
  %>

<div class="form-container">
<form action=<%= action %> method="post">
 
  <h1>Registro de Usuarios</h1>
  <br/> <br/>
  Nombre: <input type="text" name="usuario-nombre" value=<%= nombre %>>
  <br/> <br/>
  apellido: <input type="text" name="usuario-apellido" value=<%= apellido %>>
  <br/> <br/>
  <input type="submit" value="Registrar">
 
</form>
</div>
</body>
</html>