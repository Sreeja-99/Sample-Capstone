package IMS_Inventory.Inventory.Details;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Inventory")
public class InventoryDetails {

    @Id
    String id;

    String name;
    int count;
    float price;


    String image;
}
