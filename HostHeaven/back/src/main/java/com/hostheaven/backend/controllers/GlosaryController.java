package com.hostheaven.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostheaven.backend.models.Glosary;
import com.hostheaven.backend.services.implementation.GlosaryService;

@RestController
@RequestMapping("/glosary")
@CrossOrigin(origins = {"http://localhost:3000", "https://main--hostheaven.netlify.app", "https://hostheaven.netlify.app"}) 
public class GlosaryController {

	@Autowired
	private GlosaryService glosaryService;

	
	@GetMapping("/list")
	public List<Glosary> getAllConcepts(){
		List<Glosary> concepts=glosaryService.getAllConcepts();
		return concepts;
	}
	
}