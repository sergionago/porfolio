package com.hostheaven.backend.models;

public class UserDTO {

	private int id_user;
	private String name;
	private String surname;
	private String email;

	public UserDTO() {

	}

	public UserDTO(int id_user, String name, String surname, String email) {
		super();
		this.id_user = id_user;
		this.name = name;
		this.surname = surname;
		this.email = email;
	}

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

	@Override
	public String toString() {
		return "UserDTO [id_user=" + id_user + ", name=" + name + ", surname=" + surname + ", email=" + email + "]";
	}

}
