package com.hostheaven.backend.services.implementation;

import com.hostheaven.backend.services.interfaces.SecurityServiceInterface;
import io.jsonwebtoken.*;
import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService implements SecurityServiceInterface {
	
	private static final String SECRET_KEY = "h4z32E9bs677^";
	
	@Override
	public String generateHash(String password) { //ok
		String encodedPass = "";

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		encodedPass = encoder.encode(password);

		return encodedPass;
	}

	@Override
	public boolean verifyPassword(String rawPasswordInput, String hashedUserPassword) { //ok
		
		BCryptPasswordEncoder verifier=new BCryptPasswordEncoder();
		
		boolean match=verifier.matches(rawPasswordInput, hashedUserPassword);
		
		return match;
	}
	
	
	@Override
	public String createToken(int id_user, String name, String email) throws Exception { //ok
		String token = "";
		byte[] claveBytes = SECRET_KEY.getBytes();

		try {
			token = Jwts.builder() // Instancia de JJWT para crear el token
					.setSubject(String.valueOf(id_user)) // Subject, que suele ser un identificador único del usuario
					.claim("email", email) // Añade información al token en pares clave-valor
					.claim("name", name).signWith(SignatureAlgorithm.HS512, claveBytes) // Firma el token con un algoritmo de encriptación y la clave secreta pasada como un array de bytes[]
					.compact(); // Une el token en un String
		} catch (Exception e) {
			throw new Exception("Error al crear el token");
		}

		return token;
	}

	

	@Override
	public JSONObject validateToken(String token) { //ok
		byte[] claveBytes = SECRET_KEY.getBytes();
		
		Claims claims = Jwts.parser() // Genera una instancia del parseador de JWT para validarlo
				.setSigningKey(claveBytes) // Se le pasa la clave secreta en bytes[] que se utilizó para firmar el token
				.parseClaimsJws(token) // Se le pasa el token a validar
				.getBody(); // Obtiene los pares clave-valor contenidos en el token validado

		JSONObject jsonData=new JSONObject();
		jsonData.put("id_user", claims.getSubject());
		jsonData.put("email", claims.get("email"));
		
		return jsonData;
		
	}
	

}
