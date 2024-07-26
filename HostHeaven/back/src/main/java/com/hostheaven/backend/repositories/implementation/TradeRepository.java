package com.hostheaven.backend.repositories.implementation;

import com.hostheaven.backend.models.HostingPackage;
import com.hostheaven.backend.models.Trade;
import com.hostheaven.backend.repositories.interfaces.TradeRepositoryInterface;
import java.util.Map;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TradeRepository implements TradeRepositoryInterface {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public String createTrade(Trade trade) throws Exception {
		String response = "";
		Session session = null;
		Transaction transaction = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();
			session.persist(trade);
			transaction.commit();
			response = "Servicio contratado con éxito";
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al insertar la transaccion: " + e.getMessage());
		} finally {
			session.close();
		}

		return response;

	}

	@Override
	public Trade getTradeByUserId(int user_id) {
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();

		String hql = "FROM Trade WHERE id_user=:id_user";
		Query<Trade> query = session.createQuery(hql, Trade.class);
		query.setParameter("id_user", user_id);
		query.setMaxResults(1);
		Trade trade = query.uniqueResult();

		transaction.commit();
		session.close();

		return trade;
	}

	@Override
	public String updateTrade(Map<String, Object> data) throws Exception {

		int id_user = Integer.parseInt(data.get("id_user").toString());
		double amount = Double.parseDouble(data.get("amount").toString());
		Map<String, Object> hostingPackageData = (Map<String, Object>) data.get("hostingPackage");
		int id_package = Integer.parseInt(hostingPackageData.get("id_package").toString());
		String response = "";

		Session session = null;
		Transaction transaction = null;
		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();
			// 1º actualizar el trade obteniendo el objeto trade con su id y el id user
			// haciendo merge y setAmout con el nuevo amount
			Trade trade = this.getTradeByUserId(id_user);
			trade.setAmount(amount);

			// 2º Actualizar el hostingpackage con los nuevos valores y el id_package
			String hql = "FROM HostingPackage WHERE id_package=:id_package";
			Query<HostingPackage> query = session.createQuery(hql, HostingPackage.class);
			query.setParameter("id_package", id_package);
			HostingPackage hostingPackage = query.uniqueResult();
			hostingPackage.setStorage(Integer.parseInt(hostingPackageData.get("storage").toString()));
			hostingPackage.setDomains(Integer.parseInt(hostingPackageData.get("domains").toString()));
			hostingPackage.setDatabases(Integer.parseInt(hostingPackageData.get("databases").toString()));
			hostingPackage.setEmail_account(Integer.parseInt(hostingPackageData.get("email_account").toString()));
			hostingPackage
					.setMonthly_bandwidth(Integer.parseInt(hostingPackageData.get("monthly_bandwidth").toString()));

			session.merge(trade);
			session.merge(hostingPackage);

			transaction.commit();
			response = "Servicio actualizado con éxito";
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al actualizar el servicio: " + e.getMessage());

		} finally {
			if (session != null) {
				session.close();
			}

		}

		return response;
	}

	@Override
	public String deleteTrade(int id_trade, int id_user) throws Exception {

		Session session = null;
		Transaction transaction = null;
		String response = "";
		Trade trade = null;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			String hql = "FROM Trade WHERE id_trade=:id_trade AND id_user=:id_user";
			Query<Trade> query = session.createQuery(hql, Trade.class);
			query.setParameter("id_trade", id_trade);
			query.setParameter("id_user", id_user);
			trade = query.uniqueResult();

			session.remove(trade);

			transaction.commit();
			response = "Servicio eliminado con éxito";

		} catch (Exception e) {

			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al eliminar el servicio: " + e.getMessage());

		} finally {
			if (session != null) {
				session.close();
			}

		}

		return response;

	}
	
	public boolean userHasTrade(int id_user) throws Exception {
		boolean hasTrade = false;
		Session session = null;
		Transaction transaction = null;
		int result = -1;

		try {
			session = sessionFactory.openSession();
			transaction = session.beginTransaction();

			String hql = "SELECT id_trade FROM Trade WHERE id_user=:id_user";
			Query<Integer> query = session.createQuery(hql, Integer.class);
			query.setParameter("id_user", id_user);
			result = query.uniqueResult() != null ? query.uniqueResult() : -1;

			if (result != -1) {
				hasTrade = true;
			}

		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw new Exception("Error al buscar el trade del usuario: " + e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}

		return hasTrade;
	}

}
