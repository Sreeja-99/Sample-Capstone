package IMS_Inventory.Inventory.Controller;
import IMS_Inventory.Inventory.Details.UserRegistration;
import IMS_Inventory.Inventory.Service.UserRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRegistrationController {
//    @Autowired
    private UserRegistrationService userRegistrationService;

    @Autowired
    public UserRegistrationController(UserRegistrationService userRegistrationService) {
        this.userRegistrationService = userRegistrationService;
    }

    @PostMapping()
    private UserRegistration addUser(@RequestBody UserRegistration user){
        userRegistrationService.save(user);
        return user;
    }

    @GetMapping("/{id}")
    private UserRegistration findUser(@PathVariable String id) throws Exception{
        ResponseEntity<UserRegistration> user=userRegistrationService.findById(id);
        if (user.getStatusCode().is2xxSuccessful()) {
            return user.getBody();
        } else {
            throw new Exception("Failed to login user: " + user.getStatusCode());
        }
    }

    @GetMapping()
    private List<UserRegistration> findAllUsers() throws Exception{
        ResponseEntity<List<UserRegistration>> users=userRegistrationService.findAll();
        if (users.getStatusCode().is2xxSuccessful()) {
            return users.getBody();
        } else {
            throw new Exception("Failed to login user: " + users.getStatusCode());
        }
    }

    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable String id) throws Exception{
        userRegistrationService.delete(id);
    }

    @PutMapping()
    private UserRegistration updateUser(@RequestBody UserRegistration user) throws Exception{
        ResponseEntity<UserRegistration> userUpdate=userRegistrationService.update(user);
        if (userUpdate.getStatusCode().is2xxSuccessful()) {
            return userUpdate.getBody();
        } else {
            throw new Exception("Failed to login user: " + userUpdate.getStatusCode());
        }
    }
}
