package com.hostheaven.backend.models;

import java.util.Date;


public class HostingPackageTradeDTO {

	private int id_trade;
	private HostingPackage hostingPackage;
	private Date date_start;
	private Date date_end;
	private double amount;
	
	public HostingPackageTradeDTO() {
		
	}
	
	public HostingPackageTradeDTO(HostingPackage hostingPackage, Date date_start, Date date_end, double amount, int id_trade) {
		super();
		this.hostingPackage = hostingPackage;
		this.date_start = date_start;
		this.date_end = date_end;
		this.amount = amount;
		this.id_trade=id_trade;
	}

	public HostingPackage getHostingPackage() {
		return hostingPackage;
	}

	public void setHostingPackage(HostingPackage hostingPackage) {
		this.hostingPackage = hostingPackage;
	}

	public int getId_trade() {
		return id_trade;
	}

	public void setId_trade(int id_trade) {
		this.id_trade = id_trade;
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

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "HostingPackageTradeDTO [id_trade=" + id_trade + ", hostingPackage=" + hostingPackage + ", date_start="
				+ date_start + ", date_end=" + date_end + ", amount=" + amount + "]";
	}
}
