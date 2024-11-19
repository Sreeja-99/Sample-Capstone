package IMS_Inventory.Inventory.Details;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Registration")
public class UserRegistration {

    @Id
    String id;

    String name;
    String emailId;
    String password;
    String confirmPassword;

}
