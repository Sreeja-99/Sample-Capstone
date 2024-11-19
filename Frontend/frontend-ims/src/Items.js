// import "./Items.css";
// import React, { useState, useEffect } from 'react';
// import ProductDetails from "./ProductDetails";
// function Items({add,remove}){
//   // const [cartItems, setCartItems] = useState([]);

//   // const handleAddToCart=(item)=>{
    
//   //   const exist=cartItems.find((cartItem)=>
//   //   (cartItem.id===item.id)  
//   // )
//   // if(exist){
//   //   setCartItems(
//   //     cartItems.map((cartItem)=>
//   //       (cartItem.id===item.id)?{...cartItem,quantity:cartItem.quantity+1}:cartItem
//   //     )
//   //   );
//   // }else{
//   //   setCartItems(
//   //     [...cartItems,{...item,quantity:1}]
//   //   );
//   // }
//   // console.log(cartItems.map((cartItem)=>item));

//   // }





//     const [products, setProducts] = useState([]);

//     // useEffect(() => {
//     //   // Fetch data from the JSON file in the public folder
//     //   fetch('/items.json')
//     //     .then((response) => {
//     //       if (!response.ok) {
//     //         console.error('Network response was not okay');
//     //         throw new Error('Network response was not ok');
//     //       }
//     //       return response.json();
//     //     })
//     //     .then((data) => setProducts(data))
//     //     .catch((error) => console.error('Error fetching the JSON file:', error));
//     // }, []);

//     // useEffect(() => {
//     //   // Fetch data from the backend API
//     //   fetch('http://localhost:8080/inventory')
//     //     .then((response) => {
//     //       if (!response.ok) {
//     //         console.error('Network response was not okay');
//     //         throw new Error('Network response was not ok');
//     //       }
//     //       return response.json();
//     //     })
//     //     .then((data) => setProducts(data))
//     //     .catch((error) => console.error('Error fetching inventory:', error));
//     // }, []);
//     // const [products, setProducts] = useState([]);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       fetch('http://localhost:8080/inventory')
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => setProducts(data))
//         .catch((err) => {
//           console.error('Error fetching inventory:', err);
//           setError('Failed to load inventory data');
//         });
//     }, []);
  
//     if (error) {
//       return <div>{error}</div>;
//     }
  
//   return(
//         <nav className="mainProducts">
//            <div className="products">
//                 {products.map((product)=>
                
//                     // <div className="image-details">
                      
//                     //     <img className="image" src={product.image} />
                    
//                     //     <div className="details">
//                     //         <strong><p>{product.name}</p></strong>
//                     //         <p>{product.price}$</p>

//                     //         <div className="add-removal">
//                     //             <button>+</button>
//                     //             <button>-</button>
//                     //         </div>
//                     //     </div>

//                     // </div>
//                     <ProductDetails key={product.id} product={product} 
//                                    onAdd={(add)} onRemove={remove}/>
//                     )
//                 } 
                
//             </div>
            
            
//         </nav>

//     );

// }

// export default Items;


import "./Items.css";
import React, { useState, useEffect } from 'react';
import ProductDetails from "./ProductDetails";
function Items({add,remove,sendProductsToApp}){
  // const [cartItems, setCartItems] = useState([]);

  // const handleAddToCart=(item)=>{
    
  //   const exist=cartItems.find((cartItem)=>
  //   (cartItem.id===item.id)  
  // )
  // if(exist){
  //   setCartItems(
  //     cartItems.map((cartItem)=>
  //       (cartItem.id===item.id)?{...cartItem,quantity:cartItem.quantity+1}:cartItem
  //     )
  //   );
  // }else{
  //   setCartItems(
  //     [...cartItems,{...item,quantity:1}]
  //   );
  // }
  // console.log(cartItems.map((cartItem)=>item));

  // }





    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //   // Fetch data from the JSON file in the public folder
    //   fetch('/items.json')
    //     .then((response) => {
    //       if (!response.ok) {
    //         console.error('Network response was not okay');
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.json();
    //     })
    //     .then((data) => setProducts(data))
    //     .catch((error) => console.error('Error fetching the JSON file:', error));
    // }, []);

    // useEffect(() => {
    //   // Fetch data from the backend API
    //   fetch('http://localhost:8080/inventory')
    //     .then((response) => {
    //       if (!response.ok) {
    //         console.error('Network response was not okay');
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.json();
    //     })
    //     .then((data) => setProducts(data))
    //     .catch((error) => console.error('Error fetching inventory:', error));
    // }, []);
    // const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8080/inventory')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          sendProductsToApp(data);  // Send the products to App.js
      })
      .catch((err) => {
          console.error('Error fetching inventory:', err);
          setError('Failed to load inventory data');
      });
}, [sendProductsToApp]);
  
    if (error) {
      return <div>{error}</div>;
    }
  
  return(
        <nav className="mainProducts">
           <div className="products">
                {products.map((product)=>
                
                    // <div className="image-details">
                      
                    //     <img className="image" src={product.image} />
                    
                    //     <div className="details">
                    //         <strong><p>{product.name}</p></strong>
                    //         <p>{product.price}$</p>

                    //         <div className="add-removal">
                    //             <button>+</button>
                    //             <button>-</button>
                    //         </div>
                    //     </div>

                    // </div>
                    <ProductDetails key={product.id} product={product} 
                                   onAdd={(add)} onRemove={(remove)}/>
                    )
                } 
                
            </div>
            
            
        </nav>

    );

}

export default Items;