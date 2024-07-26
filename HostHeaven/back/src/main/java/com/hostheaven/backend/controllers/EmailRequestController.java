package com.hostheaven.backend.controllers;

import java.util.List;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hostheaven.backend.models.EmailRequest;
import com.hostheaven.backend.services.implementation.EmailRequestService;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = { "http://localhost:3000", "https://main--hostheaven.netlify.app",
		"https://hostheaven.netlify.app" })
public class EmailRequestController {

	@Autowired
	private EmailRequestService emailRequestService;

	@PostMapping("/send")
	public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
		ResponseEntity<String> httpResponse = null;
		String message = emailRequestService.sendEmail(emailRequest);
		JSONObject messageJson = new JSONObject();
		messageJson.put("message", message);

		if (message.toLowerCase().contains("error")) {
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		} else {
			httpResponse = ResponseEntity.ok(messageJson.toString());
		}

		return httpResponse;
	}

	@PostMapping("/getTickets/{user_id}")
	public ResponseEntity<List<EmailRequest>> getTickets(@PathVariable int user_id) {
		ResponseEntity<List<EmailRequest>> httpResponse = null;
		List<EmailRequest> tickets = emailRequestService.getTickets(user_id);

		if (tickets != null) {
			httpResponse = ResponseEntity.ok(tickets);
		} else {
			httpResponse = ResponseEntity.noContent().build();
		}

		return httpResponse;

	}

	@PostMapping("/getPendingTickets")
	public ResponseEntity<?> getPendingTickets() {
		ResponseEntity<?> httpResponse = null;
		List<EmailRequest> tickets = null;

		try {
			tickets = emailRequestService.getPendingTickets();
			if (tickets != null) {
				httpResponse = ResponseEntity.ok(tickets);
			} else {
				httpResponse = ResponseEntity.noContent().build();
			}
		} catch (Exception e) {
			httpResponse = ResponseEntity.internalServerError().body(e.getMessage());
		}

		return httpResponse;
	}

	@PostMapping("/resolveTicket/{id_ticket}")
	public ResponseEntity<String> resolveTicket(@PathVariable int id_ticket, @RequestBody String solution) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = emailRequestService.resolveTicket(id_ticket, solution.replaceAll("\"", ""));
			messageJson.put("message", message);
			httpResponse = ResponseEntity.ok(messageJson.toString());
		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;

	}

}
