package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.Details.InventoryDetails;
import IMS_Inventory.Inventory.Details.OrderedItems;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InventoryService {
    ResponseEntity<List<InventoryDetails>> findAll() throws Exception;
    ResponseEntity<InventoryDetails> findById(String id) throws Exception;

    ResponseEntity<InventoryDetails> save(InventoryDetails inventory);
    ResponseEntity<InventoryDetails> update(InventoryDetails inventory) throws Exception;
    ResponseEntity<List<InventoryDetails>> decInv(List<OrderedItems> items) throws Exception;
    void delete(String id) throws Exception;
}
