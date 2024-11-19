package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.Details.UserRegistration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserRegistrationService {
    ResponseEntity<List<UserRegistration>> findAll() throws Exception;
    ResponseEntity<UserRegistration> findById(String id) throws Exception;

    ResponseEntity<UserRegistration> save(UserRegistration userRegistration);
    ResponseEntity<UserRegistration> update(UserRegistration userRegistration) throws Exception;
    void delete(String id);
}
