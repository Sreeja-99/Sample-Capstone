package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.DAO.InventoryRepository;
import IMS_Inventory.Inventory.Details.InventoryDetails;
import IMS_Inventory.Inventory.Details.OrderedItems;
import IMS_Inventory.Inventory.RestExceptionHandler.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class InventoryServiceImpl implements InventoryService{


    InventoryRepository inventoryRepository;
    @Autowired
    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public ResponseEntity<List<InventoryDetails>> findAll() throws Exception {
        List<InventoryDetails> inventories = new ArrayList<>();

        try {
            // Fetch all inventory details from the repository
            inventories = inventoryRepository.findAll();

            // Check if the list is empty and throw exception if no inventory found
            if (inventories.isEmpty()) {
                throw new ResourceNotFoundException("No inventory is found.");
            }

            // Return the list if inventory exists
            return ResponseEntity.ok(inventories);

        } catch (ResourceNotFoundException e) {
            // Handle ResourceNotFoundException and rethrow it or return an empty list
            throw e; // Let the exception handler take care of it

        } catch (Exception e) {
            // Handle any other unexpected exceptions
            throw new Exception("An error occurred while fetching the inventory details.", e);
        }
    }

    @Override
    public ResponseEntity<InventoryDetails> findById(String id) throws Exception {

        try {
            // Check for invalid or empty ID
            if (id == null || id.trim().isEmpty()) {
                throw new IllegalArgumentException("Inventory ID cannot be null or empty.");
            }

            // Try to find the inventory item
            Optional<InventoryDetails> item = inventoryRepository.findById(id);

            // If the inventory item is not found, throw a custom exception
            if (item.isEmpty()) {
                throw new ResourceNotFoundException("Inventory with ID " + id + " does not exist.");
            }

            // Return the inventory details if found
            return ResponseEntity.ok(item.get());

        } catch (ResourceNotFoundException e) {
            // Re-throw the exception for it to be handled by the RestExceptionHandler
            throw e;

        } catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid ID provided: " + id, e);
        } catch (Exception e) {
            throw new Exception("An error occurred while fetching the inventory with ID: " + id, e);
        }
    }


    @Override
    public ResponseEntity<InventoryDetails> save(InventoryDetails inventory) {
        try {
            // Validate input object to ensure mandatory fields are provide
            if (inventory == null) {
                throw new IllegalArgumentException("Inventory object cannot be null.");
            }

            if (inventory.getName() == null || inventory.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("Product name cannot be null or empty.");
            }

            if (inventory.getCount() < 0) {
                throw new IllegalArgumentException("Count cannot be null or negative.");
            }

            if (inventory.getPrice() < 0) {
                throw new IllegalArgumentException("Price cannot be null or negative.");
            }

            // Save inventory to the repository
            float roundedPrice = Math.round(inventory.getPrice() * 100) / 100.0f;
            inventory.setPrice(roundedPrice);
            InventoryDetails savedInventory = inventoryRepository.save(inventory);

            // Return the saved inventory
            return ResponseEntity.ok(savedInventory);
        } catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid argument provided: ", e);
        }
    }

    @Override
    public ResponseEntity<InventoryDetails> update(InventoryDetails inventory) throws Exception {
        // Retrieve the ID from the input object
        String id = inventory.getId();
        try {
            // Validate if the ID is null or empty
            if (id == null || id.trim().isEmpty()) {
                throw new IllegalArgumentException("Inventory ID cannot be null or empty.");
            }

            // Check if the inventory item exists in the database
            Optional<InventoryDetails> existingInventory = inventoryRepository.findById(id);

            // If the inventory item is not found, throw a custom exception
            if (existingInventory.isEmpty()) {
                throw new ResourceNotFoundException("Inventory with ID " + id + " does not exist.");
            }

            // Save and return the updated inventory details
            float roundedPrice = Math.round(inventory.getPrice() * 100) / 100.0f;
            inventory.setPrice(roundedPrice);

            return ResponseEntity.ok(inventoryRepository.save(inventory));
        }catch (ResourceNotFoundException e) {
            // Re-throw the exception for it to be handled by the RestExceptionHandler
            throw e;

        } catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid ID provided: " + id, e);
        } catch (Exception e) {
            throw new Exception("An error occurred while updating the inventory with ID: " + id, e);
        }
    }

    @Override
    public ResponseEntity<List<InventoryDetails>> decInv(List<OrderedItems> items) throws Exception {
        List<InventoryDetails> updatedInvDetails=new ArrayList<>();
        try{
            for(OrderedItems item:items){
                Optional<InventoryDetails> inventory=inventoryRepository.findById(item.getId());
                if(inventory.isPresent()){
                    inventory.get().setCount(inventory.get().getCount()-item.getQuantity());
                    InventoryDetails inv=inventoryRepository.save(inventory.get());
                    updatedInvDetails.add(inv);
                } else {
                    throw new ResourceNotFoundException("Inventory not found for ID: " + item.getId());
                }
            }
            return ResponseEntity.ok(updatedInvDetails);
        } catch (ResourceNotFoundException e) {
            // Return an empty list with appropriate status and message
           throw e;
        } catch (Exception e) {
            // Return an empty list with a generic error message
            throw new Exception("An error occurred while updating the database ", e);
        }
    }

    @Override
    public void delete(String id) throws Exception {
        try {
            // Check if inventory exists
            Optional<InventoryDetails> inv = inventoryRepository.findById(id);
            if (inv.isEmpty()) {
                // Throw ResourceNotFoundException if inventory is not found
                throw new ResourceNotFoundException("Inventory not found with the given id: " + id);
            }

            // Delete the inventory if found
            inventoryRepository.deleteById(id);

        } catch (ResourceNotFoundException e) {
            // Re-throw the exception for it to be handled by the RestExceptionHandler
            throw e;

        } catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid ID provided: " + id, e);

        } catch (Exception e) {
            // Catch any other exceptions and wrap them into a generic exception
            throw new Exception("An error occurred while deleting the inventory with ID: " + id, e);
        }
    }

}
