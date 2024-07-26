package com.hostheaven.backend.models;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * Entidad que representa las transacciones económicas que se realicen en la
 * web.
 */
@Table(name = "trades")
@Entity
public class Trade {

	// ENUM
	public enum paymentMethod {
		TARJETA_CREDITO, TARJETA_DEBITO, TRANSFERENCIA, PAYPAL, WALLET
	};

	public enum tradeState {
		PENDIENTE, COMPLETADO, CANCELADO
	}

	// VARIABLES
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_trade;

	@Column(nullable = false)
	private int id_package; // Referencia al ID del paquete contratado.

	@Column(nullable = false)
	private int id_user; // Referencia al ID del usuario que realizó la transacción.
	
	@Column(nullable = false)
	private double amount; // Cantidad monetaria de la transacción.

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date date_start; // Fecha y hora del inicio del servicio contratado.

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date date_end; // Fecha y hora del fin del servicio contratado.

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private paymentMethod payment_method; // Método de pago seleccionado

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private tradeState state; // Estado de la transacción.



	// CONSTRUCTORES
	public Trade() {
	}

	public Trade(int id_trade, int id_package, int id_user, double amount, Date date_start, Date date_end,
			paymentMethod payment_method, tradeState state) {
		super();
		this.id_trade = id_trade;
		this.id_package = id_package;
		this.id_user = id_user;
		this.amount = amount;
		this.date_start = date_start;
		this.date_end = date_end;
		this.payment_method = payment_method;
		this.state = state;
	}



	// GETTERS Y SETTERS
	public int getId_trade() {
		return id_trade;
	}

	public void setId_trade(int id_trade) {
		this.id_trade = id_trade;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getDate_start() {
		return date_start;
	}

	public void setDate_start(Date date_start) {
		this.date_start = date_start;
	}

	public Date getDate_end() {
		return date_end;
	}

	public void setDate_end(Date date_end) {
		this.date_end = date_end;
	}

	public paymentMethod getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(paymentMethod payment_method) {
		this.payment_method = payment_method;
	}

	public tradeState getState() {
		return state;
	}

	public void setState(tradeState state) {
		this.state = state;
	}

	public int getId_package() {
		return id_package;
	}

	public void setId_package(int id_package) {
		this.id_package = id_package;
	}

	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}

	
	@Override
	public String toString() {
		return "Trade [id_trade=" + id_trade + ", id_package=" + id_package + ", id_user=" + id_user + ", amount="
				+ amount + ", date_start=" + date_start + ", date_end=" + date_end + ", payment_method="
				+ payment_method + ", state=" + state + "]";
	}


}
