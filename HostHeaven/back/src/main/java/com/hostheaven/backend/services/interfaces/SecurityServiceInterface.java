package com.hostheaven.backend.services.interfaces;

import org.json.JSONObject;

public interface SecurityServiceInterface {

	
	// Genera el hash de la contraseña
	public String generateHash(String pass);
	
	// Verifica que la contraseña ingresada sea correcta
	public boolean verifyPassword(String passwordInput, String passwordBD);
	
	// Devuelve el token de sesión con JWT
	public String createToken(int id_user, String name, String email) throws Exception;
	
	// Valida el token pasado como parámetro y devuelve el id y email del usuario codificados en él en una cadena JSON
	public JSONObject validateToken(String token);
}
