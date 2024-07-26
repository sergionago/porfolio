package com.hostheaven.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad que representa el glosario de conceptos a mostrar en la página del
 * glosario
 */

@Table(name = "glosary")
@Entity
public class Glosary {

	// VARIABLES
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_concept;

	@Column(nullable = false)
	private String concept_name;

	@Column(nullable = false)
	private String description;

	
	// CONSTRUCTORES
	public Glosary() {

	}

	public Glosary(int id_concept, String concept_name, String description) {
		super();
		this.id_concept = id_concept;
		this.concept_name = concept_name;
		this.description = description;
	}

	
	// GETTERS Y SETTERS
	public int getId_concept() {
		return id_concept;
	}

	public void setId_concept(int id_concept) {
		this.id_concept = id_concept;
	}

	public String getConcept_name() {
		return concept_name;
	}

	public void setConcept_namet(String concept_name) {
		this.concept_name = concept_name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	// TO STRING
	@Override
	public String toString() {
		return "Glosary [id_concept=" + id_concept + ", concept_name=" + concept_name + ", description=" + description + "]";
	}

}
