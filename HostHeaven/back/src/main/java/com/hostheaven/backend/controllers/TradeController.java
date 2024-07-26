package com.hostheaven.backend.controllers;

import java.text.ParseException;
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
import com.hostheaven.backend.services.implementation.TradeService;

@RestController
@RequestMapping("/trades")
@CrossOrigin(origins = { "http://localhost:3000", "https://main--hostheaven.netlify.app", "https://hostheaven.netlify.app" })
public class TradeController {

	@Autowired
	private TradeService tradeService;

	
	@PostMapping("/create")
	public ResponseEntity<String> createTrade(@RequestBody Map<String, String> trade) throws ParseException {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = tradeService.createTrade(trade);
			messageJson.put("message", message);
			if (message.toLowerCase().contains("no puede tener más de un servicio activo")) {
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

	
	@PostMapping("/update")
	public ResponseEntity<String> updateTrade(@RequestBody Map<String, Object> data) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = tradeService.updateTrade(data);
			messageJson.put("message", message);
			httpResponse = ResponseEntity.ok(messageJson.toString());
		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

	
	@PostMapping("/delete/{id_trade}/{id_user}")
	public ResponseEntity<String> deleteTrade(@PathVariable int id_trade, @PathVariable int id_user) {
		ResponseEntity<String> httpResponse = null;
		String message = "";
		JSONObject messageJson = new JSONObject();

		try {
			message = tradeService.deleteTrade(id_trade, id_user);
			messageJson.put("message", message);
			httpResponse = ResponseEntity.ok(messageJson.toString());
		} catch (Exception e) {
			messageJson.put("message", e.getMessage());
			httpResponse = ResponseEntity.internalServerError().body(messageJson.toString());
		}

		return httpResponse;
	}

}
