package com.hostheaven.backend.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostheaven.backend.models.Glosary;
import com.hostheaven.backend.repositories.implementation.GlosaryRepository;
import com.hostheaven.backend.services.interfaces.GlosaryServiceInterface;

@Service
public class GlosaryService implements GlosaryServiceInterface {

	@Autowired
	private GlosaryRepository glosaryRepository;

	@Override
	public List<Glosary> getAllConcepts() {
		List<Glosary> conceptos = glosaryRepository.getAllConcepts();
		return conceptos;
	}

}
