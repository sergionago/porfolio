package com.hostheaven.backend.services.interfaces;

import java.util.List;

import com.hostheaven.backend.models.HostingPackage;
import com.hostheaven.backend.models.HostingPackageTradeDTO;

public interface HostingPackageServiceInterface {

	// Crea un nuevo paquete de hosting
	public int createHostingPackage(HostingPackage hostingPackage);

	// Obtiene los datos de un paquete de hosting por su identificador
	public HostingPackage getHostingPackageById(int id);
	
	//Obtiene todos los paquetes de hosting preconfigurados
	public List<HostingPackage> getAllStandardHostingPackages();
	
	//Obtiene el paquete de hosting contratado por el usuario
	public HostingPackageTradeDTO getHostingPackageByUserId(int id_user);
}
