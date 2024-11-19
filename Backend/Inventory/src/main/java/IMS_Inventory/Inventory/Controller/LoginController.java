package IMS_Inventory.Inventory.Controller;

import IMS_Inventory.Inventory.Details.LoginDetails;
import IMS_Inventory.Inventory.Service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping()
    public LoginDetails loginUser(@RequestBody LoginDetails loginDetails) throws Exception{
        ResponseEntity<LoginDetails> loginDet=loginService.login(loginDetails);
        if (loginDet.getStatusCode().is2xxSuccessful()) {
            return loginDet.getBody();
        } else {
            throw new Exception("Failed to login user: " + loginDet.getStatusCode());
        }
    }
}
