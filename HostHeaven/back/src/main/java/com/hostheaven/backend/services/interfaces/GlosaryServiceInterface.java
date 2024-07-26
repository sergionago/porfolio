package com.hostheaven.backend.services.interfaces;

import java.util.List;

import com.hostheaven.backend.models.Glosary;

public interface GlosaryServiceInterface {

	// Obtiene todos los conceptos del glosario
	public List<Glosary> getAllConcepts();
	
}
