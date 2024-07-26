package com.hostheaven.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad que representa los correos que se envian desde la vista
 */

@Table(name = "emails")
@Entity
public class EmailRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_email_request;

	@Column(nullable = false)
	private String sender; //(email del usuario que manda el correo). Siempre será mi correo de cesur

	@Column(nullable = false)
	private String receiver; //(email del usuario que recibe el correo). Siempre será mi correo de cesur

	@Column(nullable = false)
	private String subject; //(motivo, value del select seleccionado)

	@Column(nullable = false)
	private String message; //(mensaje escrito en el textarea)
	
	@Column(nullable = true)
	private String state; //(estado de la respuesta al mensaje)
	
	@Column(nullable = true)
	private String response;
	
	@Column(nullable = true)
	private int id_user;
	
	
	
	
	public EmailRequest() {
		
	}
	
	
	
	public EmailRequest(int id_email_request, String sender, String receiver, String subject, String message,
			String state, int id_user, String response) {
		super();
		this.id_email_request = id_email_request;
		this.sender = sender;
		this.receiver = receiver;
		this.subject = subject;
		this.message = message;
		this.state = state;
		this.id_user = id_user;
		this.response = response;
	}


	public int getId_user() {
		return id_user;
	}


	public void setId_user(int id_user) {
		this.id_user = id_user;
	}


	public String getResponse() {
		return response;
	}


	public void setResponse(String response) {
		this.response = response;
	}

	
	public int getId_email_request() {
		return id_email_request;
	}

	public void setId_email_request(int id_email_request) {
		this.id_email_request = id_email_request;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "EmailRequest [id_email_request=" + id_email_request + ", sender=" + sender + ", receiver=" + receiver
				+ ", subject=" + subject + ", message=" + message + ", state=" + state + ", id_user=" + id_user
				+ ", response=" + response + "]";
	}


	
}
