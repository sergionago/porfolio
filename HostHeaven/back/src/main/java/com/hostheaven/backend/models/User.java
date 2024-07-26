package com.hostheaven.backend.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad que representa a los usuarios que se registren en la aplicación.
 */
@Table(name = "users")
@Entity
public class User {

	// ENUMS
	private enum paymentMethod {
		TARJETA_CREDITO, TARJETA_DEBITO, TRANSFERENCIA, PAYPAL, WALLET, NULL
	};

	
	// VARIABLES
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_user;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String surname;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String password; // Hash de la contraseña 

	@Enumerated(EnumType.STRING)
	@Column(nullable = true)
	private paymentMethod payment_method; // Método de pago seleccionado

	@Column(nullable = true)
	private String payment_reference; // Cuenta bancaria, tarjeta, wallet, etc... guardada para el cobro
	
	
	// CONSTRUCTORES
	public User() {
	}


	public User(int id_user, String name, String surname, String email, String password, paymentMethod payment_method,
			String payment_reference) {
		super();
		this.id_user = id_user;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.payment_method = payment_method;
		this.payment_reference = payment_reference;
	}



	// GETTERS Y SETTERS
	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public paymentMethod getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(paymentMethod payment_method) {
		this.payment_method = payment_method;
	}

	public String getPayment_reference() {
		return payment_reference;
	}

	public void setPayment_reference(String payment_reference) {
		this.payment_reference = payment_reference;
	}
	

	
	// TO STRING
	@Override
	public String toString() {
		return "User [id_user=" + id_user + ", name=" + name + ", surname=" + surname + ", email=" + email
				+ ", password=" + password + ", payment_method=" + payment_method
				+ ", payment_reference=" + payment_reference + "]";
	}

}
