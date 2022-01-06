<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ page import="java.util.List" %>
<%@ page import="modelo.Usuario" %>
<%@ page import="controladores.ControladorUsuarios" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Mostrar Usuarios</title>
<style>
table, th, td {
  border:1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>
</head>
<body>
  
  <jsp:include page="Navegacion.html"></jsp:include>
  
  <table>
    <tr>
      <th>id</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Eliminar</th>
      <th>Modificar</th>
    </tr>
    <%
      List<Usuario> listaUsuarios =  ControladorUsuarios.obtenerUsuarios();
      for (Usuario usuario : listaUsuarios) {
    	out.println("<tr>");
	    out.println("<td>" + usuario.id + "</td>");
	    out.println("<td>" + usuario.nombre + "</td>");
	    out.println("<td>" + usuario.apellido + "</td>");
	    
	    String modificar = "<a href=\"http://localhost:8080/javaee-normal/RegistroUsuariosFormulario.jsp?" 
	    + "usuario-id=" + usuario.id + "&" 
	    + "usuario-nombre=" + usuario.nombre + "&"
	    + "usuario-apellido=" + usuario.apellido
	    + "\"> Modificar </a>";
	    String eliminar = "<a href=\"http://localhost:8080/javaee-normal/EliminarUsuarioLogica.jsp?usuario-id="+ usuario.id +"\"> Eliminar </a>";
	    
	    out.println("<td>" + modificar + "</td>");
	    out.println("<td>" + eliminar + "</td>");
	    out.println("</tr>");
	  }
    %>
  </table>

</body>
</html>