package com.hostheaven.backend.repositories.interfaces;

import java.util.List;
import com.hostheaven.backend.models.EmailRequest;


public interface EmailRequestRepositoryInterface {

	// Guarda un mensaje en base de datos
	public String saveMessage(EmailRequest emailRequest);

	// Devuelve todos los tickets de un usuario
	public List<EmailRequest> getTickets(int user_id);
	
	// Devuelve todos los tickets no resueltos (para el usuario admin)
	public List<EmailRequest> getPendingTickets() throws Exception;
	
	// Devuelve un email request por su id
	public EmailRequest getEmailRequestById(int id);
	
	// Guarda el mensaje de respuesta del ticket
	public String resolveTicket(int id_ticket, String solution) throws Exception;
}