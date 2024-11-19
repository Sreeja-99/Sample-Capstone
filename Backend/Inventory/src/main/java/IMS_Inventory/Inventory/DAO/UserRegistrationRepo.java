package IMS_Inventory.Inventory.DAO;

import IMS_Inventory.Inventory.Details.UserRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRegistrationRepo extends MongoRepository<UserRegistration,String> {
    Optional<UserRegistration> findByEmailId(String emailId);
}
