package com.hostheaven.backend.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.hostheaven.backend.models.EmailRequest;
import com.hostheaven.backend.repositories.implementation.EmailRequestRepository;
import com.hostheaven.backend.services.interfaces.EmailRequestServiceInterface;

@Service
public class EmailRequestService implements EmailRequestServiceInterface {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private EmailRequestRepository emailRequestRepository;

	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public String sendEmail(EmailRequest emailRequest) {
		String response = "";

		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(sender);
			message.setTo(sender);
			message.setSubject(emailRequest.getSubject());
			message.setText(emailRequest.getMessage());

			mailSender.send(message);

			response = emailRequestRepository.saveMessage(emailRequest);

		} catch (Exception e) {
			response = "Ha ocurrido algún error al enviar el mensaje" + e.getMessage();
		}

		return response;
	}

	@Override
	public List<EmailRequest> getTickets(int user_id) {
		List<EmailRequest> tickets = emailRequestRepository.getTickets(user_id);
		return tickets;
	}

	@Override
	public List<EmailRequest> getPendingTickets() {
		List<EmailRequest> tickets = emailRequestRepository.getPendingTickets();
		return tickets;
	}

	@Override
	public String resolveTicket(int id_ticket, String solution) throws Exception {
		String message = emailRequestRepository.resolveTicket(id_ticket, solution);
		return message;
	}

}
