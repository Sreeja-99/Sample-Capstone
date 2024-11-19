package IMS_Inventory.Inventory.Controller;

import IMS_Inventory.Inventory.Details.InventoryDetails;
import IMS_Inventory.Inventory.Details.OrderedItems;
import IMS_Inventory.Inventory.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:3000") // Update with your frontend's port
public class InventoryController {
    private InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping()
    private InventoryDetails addInventory(@RequestBody InventoryDetails inventory) throws Exception{
        ResponseEntity<InventoryDetails> invDet=inventoryService.save(inventory);
        if (invDet.getStatusCode().is2xxSuccessful()) {
            return invDet.getBody();
        } else {
            throw new Exception("Failed to update inventory: " + invDet.getStatusCode());
        }
    }

    @GetMapping("/{id}")
    private InventoryDetails findInventory(@PathVariable String id) throws Exception{
        ResponseEntity<InventoryDetails> invdet=inventoryService.findById(id);
        if (invdet.getStatusCode().is2xxSuccessful()) {
            return invdet.getBody();
        } else {
            throw new Exception("Failed to update inventory: " + invdet.getStatusCode());
        }

    }

    @GetMapping()
    private List<InventoryDetails> findAllventory() throws Exception{
        ResponseEntity<List<InventoryDetails>> invDet=inventoryService.findAll();
        if (invDet.getStatusCode().is2xxSuccessful()) {
            return invDet.getBody();
        } else {
            throw new Exception("Failed to update inventory: " + invDet.getStatusCode());
        }
    }

    @DeleteMapping("/{id}")
    private void deleteInventory(@PathVariable String id) throws Exception{
        inventoryService.delete(id);
    }

    @PutMapping()
    private InventoryDetails updateInventory(@RequestBody InventoryDetails inventory) throws Exception{
        ResponseEntity<InventoryDetails> invDet=inventoryService.update(inventory);
        if (invDet.getStatusCode().is2xxSuccessful()) {
            return invDet.getBody();
        } else {
            throw new Exception("Failed to update inventory: " + invDet.getStatusCode());
        }

    }

    @PutMapping("/decinv")
    private List<InventoryDetails> decInv(@RequestBody List<OrderedItems> items) throws Exception {
        ResponseEntity<List<InventoryDetails>> response = inventoryService.decInv(items);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new Exception("Failed to update inventory: " + response.getStatusCode());
        }
    }

}
