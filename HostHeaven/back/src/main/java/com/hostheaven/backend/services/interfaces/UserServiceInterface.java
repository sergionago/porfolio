package com.hostheaven.backend.services.interfaces;

import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import com.hostheaven.backend.models.User;


public interface UserServiceInterface {

	// Crea un nuevo usuario
	public String createUser(User user) throws Exception;

	// Verifica que no haya un correo electrónico igual en la base de datos
	public boolean emailExists(String email);
	
	// Obtiene los datos de un usuario según su identificador
	public User getUserById(int id);

	// Verifica las credenciales para iniciar sesión y devuelve el token de sesión
	public JSONObject verifyCredentials(String credentials) throws Exception;
	
	// Actualiza los datos de un usuario (excepto su contraseña) y devuelve un String en función de si la
	// operación ha tenido éxito o no
	public String updateUser(User user) throws Exception;
	
	// Cambia la contraseña de un usuario
	public String changePassword(Map<String, String> password) throws Exception;
	
	// Elimina un usuario según su identificador y devuelve un String en función de
	// si la operación ha tenido éxito o no
	public String deleteUser(int user_id, String rawPassword) throws Exception;
	
	// Crea un nuevo usuario y devuelve el token de sesión
	public String signInAndLogIn(User user) throws Exception;
	
	// Devuelve todos los usuarios (para el usuario admin)
	public List<User> getAllUsers() throws Exception;
	
}
