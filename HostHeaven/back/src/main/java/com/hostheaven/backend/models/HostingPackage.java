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
 * Entidad que representa los paquetes de hosting de la aplicación, tanto los
 * preconfigurados como los personalizados.
 */
@Table(name = "hosting_packages")
@Entity
public class HostingPackage {

	// ENUMS
	public enum hostingType {
		COMPARTIDO, VPS, DEDICADO, CLOUD, WORDPRESS
	};

	// VARIABLES
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_package;

	@Column(nullable = true)
	private String package_name; // Los preconfigurados pueden ser 'PRUEBA, BÁSICO, PREMIUM, DELUXE', los
									// personalizados se llaman a elección del usuario o con un nombre por defecto
	@Column(nullable = false)
	private double package_price;

	@Column(nullable = false)
	private boolean ssl;

	@Column(nullable = false)
	private boolean cdn;

	@Column(nullable = false)
	private boolean technical_support_24h;

	@Column(nullable = false)
	private boolean migration;

	@Column(nullable = false)
	private int email_account;

	@Column(nullable = false)
	private boolean app_installation;

	@Column(nullable = false)
	private boolean ftp_server;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private hostingType hosting_type; // COMPARTIDO, VPS, DEDICADO, CLOUD, WORDPRESS

	@Column(nullable = false)
	private int storage; // Expresado en Gb

	@Column(nullable = false)
	private int monthly_bandwidth; // Expresado en Gb

	@Column(nullable = false)
	private int domains;

	@Column(nullable = false)
	private int databases;

	@Column(nullable = false)
	private int purchase_quantity; // Cantidad de usuarios que han contratado ese mismo paquete

	@Column(nullable = false)
	private boolean custom; // Indica si el paquete de hosting es personalizado o no

	
	// CONSTRUCTORES
	public HostingPackage() {
	}

	public HostingPackage(int id_package, String package_name, double package_price, boolean ssl, boolean cdn,
			boolean technical_support_24h, boolean migration, int email_account, boolean app_installation,
			boolean ftp_server, hostingType hosting_type, int storage, int monthly_bandwidth,
			int domains, int databases, int purchase_quantity, boolean custom) {
		super();
		this.id_package = id_package;
		this.package_name = package_name;
		this.package_price = package_price;
		this.ssl = ssl;
		this.cdn = cdn;
		this.technical_support_24h = technical_support_24h;
		this.migration = migration;
		this.email_account = email_account;
		this.app_installation = app_installation;
		this.ftp_server = ftp_server;
		this.hosting_type = hosting_type;
		this.storage = storage;
		this.monthly_bandwidth = monthly_bandwidth;
		this.domains = domains;
		this.databases = databases;
		this.purchase_quantity = purchase_quantity;
		this.custom = custom;
	}

	
	// GETTERS Y SETTERS
	public int getId_package() {
		return id_package;
	}

	public void setId_package(int id_package) {
		this.id_package = id_package;
	}

	public String getPackage_name() {
		return package_name;
	}

	public void setPackage_name(String package_name) {
		this.package_name = package_name;
	}

	public double getPackage_price() {
		return package_price;
	}

	public void setPackage_price(double package_price) {
		this.package_price = package_price;
	}

	public boolean isSsl() {
		return ssl;
	}

	public void setSsl(boolean ssl) {
		this.ssl = ssl;
	}

	public boolean isCdn() {
		return cdn;
	}

	public void setCdn(boolean cdn) {
		this.cdn = cdn;
	}

	public boolean isTechnical_support_24h() {
		return technical_support_24h;
	}

	public void setTechnical_support_24h(boolean technical_support_24h) {
		this.technical_support_24h = technical_support_24h;
	}

	public boolean isMigration() {
		return migration;
	}

	public void setMigration(boolean migration) {
		this.migration = migration;
	}

	public int getEmail_account() {
		return email_account;
	}

	public void setEmail_account(int email_account) {
		this.email_account = email_account;
	}

	public boolean isApp_installation() {
		return app_installation;
	}

	public void setApp_installation(boolean app_installation) {
		this.app_installation = app_installation;
	}

	public boolean isFtp_server() {
		return ftp_server;
	}

	public void setFtp_server(boolean ftp_server) {
		this.ftp_server = ftp_server;
	}

	public hostingType getHosting_type() {
		return hosting_type;
	}

	public void setHosting_type(hostingType hosting_type) {
		this.hosting_type = hosting_type;
	}

	public int getStorage() {
		return storage;
	}

	public void setStorage(int storage) {
		this.storage = storage;
	}

	public int getMonthly_bandwidth() {
		return monthly_bandwidth;
	}

	public void setMonthly_bandwidth(int monthly_bandwidth) {
		this.monthly_bandwidth = monthly_bandwidth;
	}

	public int getDomains() {
		return domains;
	}

	public void setDomains(int domains) {
		this.domains = domains;
	}

	public int getDatabases() {
		return databases;
	}

	public void setDatabases(int databases) {
		this.databases = databases;
	}

	public int getPurchase_quantity() {
		return purchase_quantity;
	}

	public void setPurchase_quantity(int purchase_quantity) {
		this.purchase_quantity = purchase_quantity;
	}

	public boolean getCustom() {
		return custom;
	}

	public void setCustom(boolean custom) {
		this.custom = custom;
	}

	
	// TO STRING
	@Override
	public String toString() {
		return "HostingPackage [id_package=" + id_package + ", package_name=" + package_name + ", package_price="
				+ package_price + ", ssl=" + ssl + ", cdn=" + cdn + ", technical_support_24h=" + technical_support_24h
				+ ", migration=" + migration + ", email_account=" + email_account + ", app_installation="
				+ app_installation + ", ftp_server=" + ftp_server + ", hosting_type=" + hosting_type
				+ ", storage=" + storage + ", monthly_bandwidth="
				+ monthly_bandwidth + ", domains=" + domains + ", databases=" + databases + ",purchase_quantity="
				+ purchase_quantity + ",isCustom=" + custom + "]";
	}

}
