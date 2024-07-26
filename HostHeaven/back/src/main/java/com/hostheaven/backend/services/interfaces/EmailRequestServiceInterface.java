package com.hostheaven.backend.services.interfaces;

import java.util.List;
import com.hostheaven.backend.models.EmailRequest;

public interface EmailRequestServiceInterface {
	
	// Envía un email y lo guarda en base de datos
	public String sendEmail(EmailRequest emailRequest);
	
	// Devuelve todos los tickets de un usuario
	public List<EmailRequest> getTickets(int user_id);
	
	// Devuelve todos los tickets no resueltos (para el usuario admin)
	public List<EmailRequest> getPendingTickets() throws Exception;
	
	// Guarda el mensaje de respuesta del ticket
	public String resolveTicket(int id_ticket, String solution) throws Exception;
}
