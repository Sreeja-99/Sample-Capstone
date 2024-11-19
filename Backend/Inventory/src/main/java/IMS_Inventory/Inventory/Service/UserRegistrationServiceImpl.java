package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.DAO.UserRegistrationRepo;
import IMS_Inventory.Inventory.Details.UserRegistration;
import IMS_Inventory.Inventory.RestExceptionHandler.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRegistrationServiceImpl implements UserRegistrationService{
    UserRegistrationRepo userRegistrationRepo;

    @Autowired
    public UserRegistrationServiceImpl(UserRegistrationRepo userRegistrationRepo) {
        this.userRegistrationRepo = userRegistrationRepo;
    }

    @Override
    public ResponseEntity<List<UserRegistration>> findAll() throws Exception{
        List<UserRegistration> users=new ArrayList<>();
        try {
            // Fetch all user details from the repository
            users = userRegistrationRepo.findAll();

            // Check if the list is empty and throw exception if no user found
            if (users.isEmpty()) {
                throw new ResourceNotFoundException("No user is found.");
            }

            // Return the list if user exists
            return ResponseEntity.ok(users);

        } catch (ResourceNotFoundException e) {
            // Handle ResourceNotFoundException and rethrow it or return an empty list
            throw e; // Let the exception handler take care of it

        } catch (Exception e) {
            // Handle any other unexpected exceptions
            throw new Exception("An error occurred while fetching the user details.", e);
        }
    }

@Override
public ResponseEntity<UserRegistration> findById(String id) throws Exception {
    try {
        // Check for invalid or empty ID
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        // Try to find the user item
        Optional<UserRegistration> user = userRegistrationRepo.findById(id);

        // If the user item is not found, throw a custom exception
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User with ID " + id + " does not exist.");
        }

        // Return the user details if found
        return ResponseEntity.ok(user.get());

    } catch (ResourceNotFoundException e) {
        // Re-throw the exception for it to be handled by the RestExceptionHandler
        throw e;

    } catch (IllegalArgumentException e) {
        // Handle invalid ID argument (can happen if the ID is null)
        throw new IllegalArgumentException("Invalid ID provided: " + id, e);
    } catch (Exception e) {
        throw new Exception("An error occurred while fetching the user with ID: " + id, e);
    }
}

    @Override
    public ResponseEntity<UserRegistration> save(UserRegistration userRegistration) {
        try {
            // Validate input object to ensure mandatory fields are provide
            if (userRegistration == null) {
                throw new IllegalArgumentException("User object cannot be null.");
            }

            if (userRegistration.getName() == null || userRegistration.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("User name cannot be null or empty.");
            }

             String id=userRegistration.getEmailId().toLowerCase();
             if(userRegistrationRepo.findByEmailId(id).isPresent()){
                 throw new ResourceNotFoundException("User already exists. Please register with new email id..");
             }
            userRegistration.setEmailId(userRegistration.getEmailId().toLowerCase());

            return ResponseEntity.ok( userRegistrationRepo.save(userRegistration));
        } catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid argument provided: ", e);
        }
    }

    @Override
    public ResponseEntity<UserRegistration> update(UserRegistration userRegistration) throws Exception {
        try {
            // Validate input object to ensure mandatory fields are provide
            if (userRegistration == null) {
                throw new IllegalArgumentException("User object cannot be null.");
            }

            if (userRegistration.getName() == null || userRegistration.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("User name cannot be null or empty.");
            }

            String id = userRegistration.getId().toLowerCase();
            Optional<UserRegistration> user = userRegistrationRepo.findById(id);

            if (user.isPresent()) {
                userRegistration.setEmailId(userRegistration.getEmailId().toLowerCase());
                return ResponseEntity.ok(userRegistrationRepo.save(userRegistration));

            } else {
                throw new ResourceNotFoundException("User not exists");
            }
        }catch (IllegalArgumentException e) {
            // Handle invalid ID argument (can happen if the ID is null)
            throw new IllegalArgumentException("Invalid argument provided: ", e);
        }

    }

        @Override
        public void delete(String id) {
            try {
                // Check if User exists
                Optional<UserRegistration> user=userRegistrationRepo.findById(id);
                if (user.isEmpty()) {
                    // Throw ResourceNotFoundException if user is not found
                    throw new ResourceNotFoundException("User not found with the given id: " + id);
                }

                // Delete the user if found
                userRegistrationRepo.deleteById(id);

            } catch (ResourceNotFoundException e) {
                // Re-throw the exception for it to be handled by the RestExceptionHandler
                throw e;

            }



    }


}
