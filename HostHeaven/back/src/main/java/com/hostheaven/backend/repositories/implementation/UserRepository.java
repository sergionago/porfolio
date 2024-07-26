package com.hostheaven.backend.repositories.implementation;

import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hostheaven.backend.models.User;
import com.hostheaven.backend.repositories.interfaces.UserRepositoryInterface;

@Repository
public class UserRepository implements UserRepositoryInterface {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public String createUser(User user) throws Exception {
		String response = "";
		Session session = null;
		Transaction transaction = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();
			session.persist(user);
			transaction.commit();
			response = "Usuario registrado con éxito";
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error en el proceso de registro: " + e.getMessage());
		} finally {
			session.close();
		}

		return response;
	}

	public boolean verifyEmail(String email) {
		boolean emailExists = false;
		int response = 0;
		Session session = null;
		Transaction transaction = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			String hql = "SELECT id_user FROM User WHERE email=:email";
			Query<Integer> query = session.createQuery(hql, Integer.class);
			query.setParameter("email", email);
			response = query.uniqueResult() != null ? query.uniqueResult() : -1;

			if (response != -1) {
				emailExists = true;
			}
			transaction.commit();

		} catch (Exception e) {
			emailExists = false;
			response = 0;

		} finally {
			if (session != null) {
				session.close();
			}
		}

		return emailExists;
	}

	@Override
	public User getUserById(int id) { // ok
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();

		String hql = "FROM User WHERE id_user=:id_user";
		Query<User> query = session.createQuery(hql, User.class);
		query.setParameter("id_user", id);
		User usuario = query.uniqueResult();

		transaction.commit();
		session.close();

		return usuario;
	}
	
	// public UserDTO getUserDTOById(int id) { // ok
		/// Session session = sessionFactory.openSession();
		// Transaction transaction = session.beginTransaction();

		// String hql = "FROM User WHERE id_user=:id_user";
		// Query<User> query = session.createQuery(hql, User.class);
		// query.setParameter("id_user", id);
		// User usuario = query.uniqueResult();

		// UserDTO usuarioDTO=new UserDTO();
		// usuarioDTO.setId_user(usuario.getId_user());
		//// usuarioDTO.setName(usuario.getName());
		// usuarioDTO.setSurname(usuario.getSurname());
		// usuarioDTO.setEmail(usuario.getEmail());
		// transaction.commit();
		// session.close();

		// return usuarioDTO;
		// }
	
	@Override
	public User getUserDataByEmail(String email) {

		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();

		String hql = "FROM User WHERE email=:email";
		Query<User> query = session.createQuery(hql, User.class);
		query.setParameter("email", email);
		User data = query.uniqueResult();

		transaction.commit();
		session.close();

		return data;
	}

	@Override
	public String updateUser(User userData) throws Exception {

		Session session = null;
		Transaction transaction = null;
		String response = "";

		try {
			User usuario = this.getUserById(userData.getId_user());
			if (usuario != null) {
				usuario.setName(userData.getName());
				usuario.setEmail(userData.getEmail());
				usuario.setSurname(userData.getSurname());
				session = sessionFactory.openSession();
				transaction = session.beginTransaction();

				session.merge(usuario);

				transaction.commit();

				response = "Actualización realizada con éxito";
			} else {
				response = "Error: usuario no encontrado";
			}

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al actualizar: " + e.getMessage());

		} finally {
			if (session != null) {
				session.close();
			}
		}

		return response;
	}

	@Override
	public String changePassword(User user, String newPassword) throws Exception {
		Session session = null;
		Transaction transaction = null;
		String response = "";

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			user.setPassword(newPassword);
			session.merge(user);

			transaction.commit();

			response = "Contraseña actualizada con éxito";

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al cambiar la contraseña: " + e.getMessage());

		} finally {
			if (session != null) {
				session.close();
			}

		}

		return response;
	}

	@Override
	public String deleteUser(User user) throws Exception {
		Session session = null;
		Transaction transaction = null;
		String message = "";

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			User managedUser = session.get(User.class, user.getId_user());
			session.remove(managedUser);
			transaction.commit();
			message = "Cuenta eliminada con éxito";

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}

			throw new Exception("Ha ocurrido un error inesperado");
		} finally {
			if (session != null) {
				session.close();
			}
		}

		return message;
	}

	@Override
	public User signInAndLogIn(User user) throws Exception {

		Session session = null;
		Transaction transaction = null;
		User savedUser = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			session.persist(user);

			transaction.commit();
			savedUser = user;

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error en el proceso de registro: " + e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}

		return savedUser;
	}

	@Override
	public List<User> getAllUsers() throws Exception {

		Session session = null;
		Transaction transaction = null;
		List<User> users = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			String hql = "FROM User ORDER BY id_user DESC";
			Query<User> query = session.createQuery(hql, User.class);
			users = query.getResultList();

			transaction.commit();

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al obtener a los usuarios: " + e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}

		return users;

	}

}
