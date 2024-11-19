package IMS_Inventory.Inventory.Details;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class OrderedItems {
    String id;
    int quantity;
}
