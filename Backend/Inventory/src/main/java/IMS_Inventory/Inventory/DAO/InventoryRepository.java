package IMS_Inventory.Inventory.DAO;

import IMS_Inventory.Inventory.Details.InventoryDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepository extends MongoRepository<InventoryDetails,String> {
}
