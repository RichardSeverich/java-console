<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="controladores.ControladorUsuarios" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Registro de Usuarios</title>
</head>
<body>
  <jsp:include page="Navegacion.html"></jsp:include>
  <h1>Usuario Registrado</h1>
  <br/> <br/>
  Nombre: <%= request.getParameter("usuario-nombre") %>
  <br/> <br/>
  Apellido: <%= request.getParameter("usuario-apellido") %>

  <% 
    String idUsuario = request.getParameter("usuario-id");
    String nombreUsuario = request.getParameter("usuario-nombre");
    String apellidoUsuario = request.getParameter("usuario-apellido");
    
    System.out.println(idUsuario);
    if(idUsuario==null){
    	ControladorUsuarios.agregarUsuario(nombreUsuario, apellidoUsuario);
    } else {
    	ControladorUsuarios.modificarUsuario(idUsuario, nombreUsuario, apellidoUsuario);
    }
  %>

</body>
</html>