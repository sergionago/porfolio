package com.hostheaven.backend.services.implementation;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hostheaven.backend.models.HostingPackage;
import com.hostheaven.backend.models.HostingPackageTradeDTO;
import com.hostheaven.backend.repositories.implementation.HostingPackageRepository;
import com.hostheaven.backend.services.interfaces.HostingPackageServiceInterface;

@Service
public class HostingPackageService implements HostingPackageServiceInterface {
	
	@Autowired
	private HostingPackageRepository hostingPackageRepository;

	@Override
	public int createHostingPackage(HostingPackage hostingPackage) {
		int id_package=this.hostingPackageRepository.createHostingPackage(hostingPackage);
		return id_package;
	}
	

	@Override
	public HostingPackage getHostingPackageById(int id) {
		HostingPackage hostingPackage = this.hostingPackageRepository.getHostingPackageById(id);
		return hostingPackage;
	}
	

	@Override
	public List<HostingPackage> getAllStandardHostingPackages() {
		List<HostingPackage> hostingPackages=hostingPackageRepository.getAllStandardHostingPackages();
		return hostingPackages;
	}
	
	@Override
	public HostingPackageTradeDTO getHostingPackageByUserId(int id_user) {
		HostingPackageTradeDTO hostingPackage= this.hostingPackageRepository.getHostingPackageByUserId(id_user);
		return hostingPackage;
	}
	
	
}
