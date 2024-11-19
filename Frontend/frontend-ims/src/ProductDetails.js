// // import React from "react";
// // import { Component } from "react";
// // import "./ProductDetails.css";


// // // class ProductDetails extends Component{
// //     function ProductDetails({product,onAdd,onRemove}){

// //     // constructor(){
// //     //     super()
// //     //         this.state={
// //     //             cartItems:[]
// //     //         }
        
// //     // }
// //     const handleInventoryDisplay = (count) => {
// //         if (count < 5) {
// //           return <span className="inventory-count">Inventory Left: {count}</span>;
// //         }
// //         return null;  // No display if inventory is greater than or equal to 5
// //       };
   
// //     {
// //         return(
// //             <div className="image-details">
                      
// //                         <img className="image" src={product.image} />
                        
// //                         <div className="details">
// //                             <strong><p>{product.name}</p></strong>
// //                             <p>${product.price}</p>
// //                             {handleInventoryDisplay(product.count)}
                            
// //                             <div className="add-removal">
// //                                 <button onClick={() => onAdd(product)} disabled={product.count<= 0}>+</button>
// //                                 {/* <span>{product.quantity}</span> */}
// //                                 <button onClick={() => onRemove(product)}>-</button>
// //                             </div>
// //                         </div>

// //                     </div>
// //         );
// //     }
// // }

// // export default ProductDetails;
// // Handle add to cart


// //   import React, { useState } from "react";
// //   import "./ProductDetails.css";
  
// //   function ProductDetails({ product, onAdd, onRemove }) {
// //     // Initialize current count to 0 when product is first added to cart
// //     const [currentCount, setCurrentCount] = useState(0);
  
// //     // Handle inventory display (show when count is less than 5)
// //     const handleInventoryDisplay = (count) => {
// //       if (count < 5) {
// //         return <span className="inventory-count">Inventory Left: {count}</span>;
// //       }
// //       return null;  // No display if inventory is greater than or equal to 5
// //     };
  
// //     // Handle adding to cart
// //     const handleAdd = () => {
// //       if (currentCount < product.count) { // Only add if there's available stock
// //         setCurrentCount(currentCount + 1);  // Increase the current count
// //         onAdd(product); // Pass the updated product to the parent
// //       }
// //     };
  
// //     // Handle removing from cart
// //     const handleRemove = () => {
// //       if (currentCount > 0) { // Only remove if there's at least 1 item in the cart
// //         setCurrentCount(currentCount - 1);  // Decrease the current count
// //         onRemove(product); // Pass the updated product to the parent
// //       }
// //     };
  
// //     return (
// //       <div className="image-details">
// //         <img className="image" src={product.image} />
// //         {/* <img className="image" src={product.image} alt={product.name} /> */}
        
// //         <div className="details">
// //           <strong><p>{product.name}</p></strong>
// //           <p>${product.price}</p>
          
// //           {handleInventoryDisplay(product.count)} {/* Display inventory count if less than 5 */}
  
// //           <div className="add-removal">
// //             <button
// //               onClick={handleAdd}
// //               disabled={currentCount >= product.count} // Disable + button if current count reaches the available stock
// //             >
// //               +
// //             </button>
            
// //             <button
// //               onClick={handleRemove}
// //               disabled={currentCount <= 0} // Disable - button if current count is 0
// //             >
// //               -
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// // export default ProductDetails;








// import React, { useState } from "react";
// import "./ProductDetails.css";

// function ProductDetails({ product, onAdd, onRemove }) {
//   // Initialize current count to 0 when product is first added to cart
//   const [currentCount, setCurrentCount] = useState(0);
//   const [remainingCount, setRemainingCount] = useState(product.count); // Track remaining inventory
//  // sessionStorage.setItem("remaining",remainingCount);

//   // Handle inventory display (show when count is less than 5)
//   const handleInventoryDisplay = () => {
//     if (remainingCount < 5) {
//       return <span className="inventory-count">Inventory Left: {remainingCount}</span>;
//     }
//     return null;  // No display if inventory is greater than or equal to 5
//   };

//   // Handle adding to cart
//   const handleAdd = () => {
//     if (currentCount < product.count && remainingCount > 0) { // Only add if there's available stock
//       setCurrentCount(currentCount + 1);  // Increase the current count
//       setRemainingCount(remainingCount - 1); // Decrease the remaining stock
//       onAdd(product); // Pass the updated product to the parent
//     }
//   };

//   // Handle removing from cart
//   const handleRemove = () => {
//     if (currentCount > 0) { // Only remove if there's at least 1 item in the cart
//       setCurrentCount(currentCount - 1);  // Decrease the current count
//       setRemainingCount(remainingCount + 1); // Increase the remaining stock
//        //onRemove(product); // Pass the updated product to the parent
//     }
//     onRemove(product);
//   };

//   return (
//     <div className="image-details">
//       <img className="image" src={product.image} />
      
//       <div className="details">
//         <strong><p>{product.name}</p></strong>
//         <p>${product.price}</p>
        
//         {handleInventoryDisplay()} {/* Display inventory count if less than 5 */}

//         <div className="add-removal">
//           <button
//             onClick={handleAdd}
//             disabled={currentCount >= product.count || remainingCount <= 0} // Disable + if no stock left
//           >
//             +
//           </button>
          
//           <button
//             onClick={handleRemove}
//              //disabled={currentCount <= 0} // Disable - if cart is empty
//           >
//             -
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import "./ProductDetails.css";

function ProductDetails({ product, onAdd, onRemove }) {
  // Initialize current count and remaining count from sessionStorage or default values
  const [currentCount, setCurrentCount] = useState(() => {
    const savedCount = sessionStorage.getItem(`currentCount-${product.count}`);
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [remainingCount, setRemainingCount] = useState(() => {
    const savedRemaining = sessionStorage.getItem(`remainingCount-${product.id}`);
    return savedRemaining ? parseInt(savedRemaining, 10) : product.count;
  });

  // Save currentCount and remainingCount to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(`currentCount-${product.id}`, currentCount);
    sessionStorage.setItem(`remainingCount-${product.id}`, remainingCount);
  }, [currentCount, remainingCount, product.id]);

  // Handle inventory display (show when count is less than 5)
  const handleInventoryDisplay = () => {
    if (remainingCount < 5) {
      return <span className="inventory-count">Inventory Left: {remainingCount}</span>;
    }
    return null; // No display if inventory is greater than or equal to 5
  };

  // Handle adding to cart
  const handleAdd = () => {
    if (currentCount < product.count && remainingCount > 0) {
      setCurrentCount(currentCount + 1); // Increase the current count
      setRemainingCount(remainingCount - 1); // Decrease the remaining stock
      onAdd(product); // Pass the updated product to the parent
    }
  };

  // Handle removing from cart
  const handleRemove = () => {
    if (currentCount > 0) {
      setCurrentCount(currentCount - 1); // Decrease the current count
      setRemainingCount(remainingCount + 1); // Increase the remaining stock
      // Pass the updated product to the parent
    }
    onRemove(product);
  };

  return (
    <div className="image-details">
      <img className="image" src={product.image} alt={product.name} />
      
      <div className="details">
        <strong><p>{product.name}</p></strong>
        <p>${product.price}</p>
        
        {handleInventoryDisplay()} {/* Display inventory count if less than 5 */}

        <div className="add-removal">
          <button
            onClick={handleAdd}
            disabled={remainingCount <= 0} // Disable + if no stock left
          >
            +
          </button>
          
          <button
            onClick={handleRemove}
             disabled={product.count <= 0} // Disable - if cart is empty
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
