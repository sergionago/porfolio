package com.hostheaven.backend.repositories.interfaces;

import java.util.List;
import com.hostheaven.backend.models.User;

public interface UserRepositoryInterface {

	// Crea un nuevo usuario
	public String createUser(User user) throws Exception;

	// Obtiene los datos de un usuario según su identificador
	public User getUserById(int id);

	// // Devuelve lso datos del usuario para el servicio de inicio de sesión
	public User getUserDataByEmail(String email);
	
	// Actualiza los datos de un usuario y devuelve un String en función de si la operación ha tenido éxito o no
	public String updateUser(User user) throws Exception;

	// Cambia la contraseña de un usuario
	public String changePassword(User user, String newPassword) throws Exception;
	
	// Elimina un usuario según su identificador y devuelve un String en función de si la operación ha tenido éxito o no
	public String deleteUser(User user) throws Exception;
	
	// Crea un nuevo usuario y lo devuelve (para crear el token de sesion con sus datos)
	public User signInAndLogIn(User user) throws Exception;
	
	// Devuelve todos los usuarios (para el usuario admin)
	public List<User> getAllUsers() throws Exception; 
	
}
