package IMS_Inventory.Inventory.Service;

import IMS_Inventory.Inventory.Details.LoginDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
     ResponseEntity<LoginDetails> login(LoginDetails loginDetails) throws Exception;
}
