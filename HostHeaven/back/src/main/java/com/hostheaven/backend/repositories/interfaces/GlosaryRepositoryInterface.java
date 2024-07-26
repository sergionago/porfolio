package com.hostheaven.backend.repositories.interfaces;

import java.util.List;

import com.hostheaven.backend.models.Glosary;

public interface GlosaryRepositoryInterface {

	// Obtiene todos los conceptos del glosario
	public List<Glosary> getAllConcepts();
	
	
}
