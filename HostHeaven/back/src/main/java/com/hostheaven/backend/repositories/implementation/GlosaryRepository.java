package com.hostheaven.backend.repositories.implementation;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hostheaven.backend.models.Glosary;
import com.hostheaven.backend.repositories.interfaces.GlosaryRepositoryInterface;

@Repository
public class GlosaryRepository implements GlosaryRepositoryInterface {
	
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List<Glosary> getAllConcepts() {

		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();

		String hql = "FROM Glosary";
		Query<Glosary> query = session.createQuery(hql, Glosary.class);
		List<Glosary> conceptos = query.getResultList();

		transaction.commit();
		session.close();

		return conceptos;
	}

}
