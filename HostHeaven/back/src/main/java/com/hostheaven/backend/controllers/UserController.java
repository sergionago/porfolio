package com.hostheaven.backend.controllers;

import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hostheaven.backend.models.User;
import com.hostheaven.backend.services.implementation.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = { "http://localhost:3000", "https://main--hostheaven.netlify.app",
		"https://hostheaven.netlify.app" })
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/signIn")
	public ResponseEntity<String> createUser(@RequestBody User user) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = userService.createUser(user);
			messageJson.put("message", message);
			if (message.toLowerCase().contains("el correo electrónico ya existe")) {
				httpResponse = ResponseEntity.status(HttpStatus.CONFLICT).body(messageJson.toString());
			} else {
				httpResponse = ResponseEntity.ok(messageJson.toString());
			}

		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/getUser/{id}")
	public User getUserById(@PathVariable int id) {
		User usuario = userService.getUserById(id);
		return usuario;
	}

	// modificar, que devuelva tambien una responseentity con el token o un internal
	// error
	@PostMapping("/logIn")
	public String verifyCredentials(@RequestBody String credentials) {
		JSONObject token = null;

		try {
			token = userService.verifyCredentials(credentials);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return token.toString();
	}

	@PostMapping("/signInLogIn")
	public ResponseEntity<String> signInAndLogIn(@RequestBody User user) {
		ResponseEntity<String> httpResponse = null;
		String token = "";
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = userService.signInAndLogIn(user);

			if (message.toLowerCase().contains("ya existe una cuenta vinculada a este correo")) {
				messageJson.put("message", message);
				httpResponse = ResponseEntity.status(HttpStatus.CONFLICT).body(messageJson.toString());
			} else {
				token = message;
				messageJson.put("token", token);
				messageJson.put("message", "Usuario registrado con éxito");
				httpResponse = ResponseEntity.ok(messageJson.toString());
			}

		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/updateUser")
	public ResponseEntity<String> updateUser(@RequestBody User user) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = userService.updateUser(user);
			messageJson.put("message", message);
			if (message.toLowerCase().contains("usuario no encontrado")) {
				httpResponse = ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageJson.toString());
			} else {
				httpResponse = ResponseEntity.ok(messageJson.toString());
			}

		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/changePassword")
	public ResponseEntity<String> changePassword(@RequestBody Map<String, String> passwordData) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = userService.changePassword(passwordData);
			messageJson.put("message", message);

			if (message.toLowerCase().contains("la contraseña introducida no es correcta")) {
				httpResponse = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageJson.toString());
			} else {
				httpResponse = ResponseEntity.ok(messageJson.toString());
			}
		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/delete/{user_id}")
	public ResponseEntity<String> deleteUser(@PathVariable int user_id, @RequestBody String password) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = userService.deleteUser(user_id, password);
			messageJson.put("message", message);

			if (message.toLowerCase().contains("no encontrado")) {
				httpResponse = ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageJson.toString());
			} else if (message.toLowerCase().contains("la contraseña introducida no es correcta")) {
				httpResponse = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageJson.toString());
			} else {
				httpResponse = ResponseEntity.ok(messageJson.toString());
			}
		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/getAllUsers")
	public ResponseEntity<?> getAllUsers() {
		List<User> users = null;
		ResponseEntity<?> httpResponse = null;

		try {
			users = userService.getAllUsers();
			if (users != null) {
				httpResponse = ResponseEntity.ok(users);
			} else {
				httpResponse = ResponseEntity.noContent().build();
			}
		} catch (Exception e) {
			httpResponse = ResponseEntity.internalServerError().body(e.getMessage());
		}

		return httpResponse;
	}

}