package controladores;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import modelo.Usuario;

public class ControladorUsuarios {

	private static List<Usuario> listaUsuarios = new ArrayList<>();

	public static void agregarUsuario(String nombre, String apellido) {
		String uniqueID = UUID.randomUUID().toString();
		listaUsuarios.add(new Usuario(uniqueID, nombre, apellido));
	}

	public static List<Usuario> obtenerUsuarios(){
		return listaUsuarios;
	}
	
	public static void modificarUsuario(String id, String nombre, String apellido) {
		for(int index = 0; index < listaUsuarios.size(); index++) {
			Usuario usuario = listaUsuarios.get(index);
		    if(usuario.id.equals(id)) {
				 usuario.nombre = nombre;
				 usuario.apellido = apellido;
				 break;
			 }
		 }
	}
	
	public static void eliminarUsuario(String id) {
		for(int index = 0; index < listaUsuarios.size(); index++) {
			Usuario usuario = listaUsuarios.get(index);
		    if(usuario.id.equals(id)) {;
				 listaUsuarios.remove(index);
				 break;
			 }
		 }
	}
}
