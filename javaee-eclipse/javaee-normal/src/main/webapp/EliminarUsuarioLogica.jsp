<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import="controladores.ControladorUsuarios" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
  <jsp:include page="Navegacion.html"></jsp:include>
  <h1>Usuario Eliminado</h1>
  <br/> <br/>

  <% 
    String idUsuario = request.getParameter("usuario-id");
    ControladorUsuarios.eliminarUsuario(idUsuario);
  %>
</body>
</html>