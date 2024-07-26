package com.hostheaven.backend.repositories.interfaces;

import java.util.Map;
import com.hostheaven.backend.models.Trade;

public interface TradeRepositoryInterface {

	// Crea una nueva transacción
	public String createTrade(Trade trade) throws Exception;

	// Obtiene todos los datos de una transacción por su identificador
	public Trade getTradeByUserId(int id);
	
	// Actualiza el precio del trade y el paquete de hosting asociado
	public String updateTrade(Map<String, Object> trade) throws Exception;
	
	// Elimina el servicio contratado de un usuario
	public String deleteTrade(int id_trade, int id_user) throws Exception;

}
