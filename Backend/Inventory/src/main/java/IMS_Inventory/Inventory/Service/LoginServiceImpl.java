package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.DAO.UserRegistrationRepo;
import IMS_Inventory.Inventory.Details.LoginDetails;
import IMS_Inventory.Inventory.Details.UserRegistration;
import IMS_Inventory.Inventory.RestExceptionHandler.InvalidCredentialsException;
import IMS_Inventory.Inventory.RestExceptionHandler.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class LoginServiceImpl implements LoginService{
    private UserRegistrationRepo userRegistrationRepo;

    public LoginServiceImpl(UserRegistrationRepo userRegistrationRepo) {
        this.userRegistrationRepo = userRegistrationRepo;
    }

    @Override
    public ResponseEntity<LoginDetails> login(LoginDetails loginDetails) throws Exception {
        try {
            // Check if the username exist
            Optional<UserRegistration> user=userRegistrationRepo.findByEmailId(loginDetails.getUsername().toLowerCase());

            // If user exists, check the password
            if (user.isPresent()) {
                if (loginDetails.getPassword().equals(user.get().getPassword())) {
                    // If password matches, return loginDetails
                    return ResponseEntity.ok(loginDetails);
                } else {
                    // If password does not match, throw exception
                    throw new InvalidCredentialsException("Incorrect password provided.");
                }
            } else {
                // If user does not exist, throw exception
                throw new ResourceNotFoundException("User not found. Please login with a registered email ID.");
            }

        } catch (ResourceNotFoundException | InvalidCredentialsException e) {
            // Let specific exceptions be handled by the exception handler
            throw e;
        } catch (Exception e) {
            throw new Exception("An unexpected error occurred while processing the login request.", e);

        }
    }

}
