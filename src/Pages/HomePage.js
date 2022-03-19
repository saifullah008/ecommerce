import React from "react";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { products } from "../ecomm-products";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [data, setData] = useState([]);
  const { cartItems } = useSelector((state) => state.cartItems);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);
  // function addProductsData() {
  //   products.map(async (product) => {
  //     try {
  //       await addDoc(collection(fireDB, "products"), product);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setData(productsArray);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <Layout loading={loading}>
        <div className="container">
          <div className="d-flex w-50">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              className="form-control"
              placeholder="Search Items"
            />
            <select
              className="form-control"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="auto-parts">Auto-Parts</option>
              <option value="fashion">Fashion</option>
              <option value="accessories">Accessories</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <div className="row">
            {data

              .filter((obj) => obj.name.toLowerCase().includes(searchKey))
              // .filter((obj) => obj.category.toLowerCase().includes(filterType))

              .map((x) => {
                return (
                  <div className="col-md-4">
                    <div className="m-2 p-1 product position-relative">
                      <div className="product-content">
                        <h3>{x.name}</h3>
                        <div className="text-center">
                          <img
                            src={x.imageUrl}
                            alt=""
                            className="product-img"
                          />
                        </div>
                        <h4>
                          <span style={{ fontSize: 25 }}>&#36;</span>
                          {x.price}
                        </h4>
                      </div>
                      <div className="product-actions">
                        <div className="d-flex">
                          <button
                            className="mx-2"
                            onClick={() => {
                              dispatch({ type: "ADD_TO_CART", payload: x });
                            }}
                          >
                            Add To Cart
                          </button>
                          <button
                            onClick={() => navigate(`/productInfo/${x.id}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;
// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import fireDB from "../fireConfig";
// //import { fireproducts } from "../firecommerce-products";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// function Homepage() {
//   const [products, setProducts] = useState([]);
//   const { cartItems } = useSelector((state) => state.cartReducer);
//   const [loading, setLoading] = useState(false);
//   const [searchKey, setSearchKey] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     getData();
//   }, []);

//   async function getData() {
//     try {
//       setLoading(true);
//       const users = await getDocs(collection(fireDB, "products"));
//       const productsArray = [];
//       users.forEach((doc) => {
//         const obj = {
//           id: doc.id,
//           ...doc.data(),
//         };

//         productsArray.push(obj);
//         setLoading(false);
//       });

//       setProducts(productsArray);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     dispatch({ type: "ADD_TO_CART", payload: product });
//   };

//   return (
//     <Layout loading={loading}>
//       <div className="container">
//         <div className="d-flex w-50 align-items-center my-3 justify-content-center">
//           <input
//             type="text"
//             value={searchKey}
//             onChange={(e) => {
//               setSearchKey(e.target.value);
//             }}
//             className="form-control mx-2"
//             placeholder="search items"
//           />
//           <select
//             className="form-control mt-3"
//             value={filterType}
//             onChange={(e) => {
//               setFilterType(e.target.value);
//             }}
//           >
//             <option value="">All</option>
//             <option value="electronics">Electronics</option>
//             <option value="mobiles">Mobiles</option>
//             <option value="fashion">Fashion</option>
//           </select>
//         </div>
//         <div className="row">
//           {products
//             .filter((obj) => obj.name.toLowerCase().includes(searchKey))
//             .filter((obj) => obj.category.toLowerCase().includes(filterType))
//             .map((product) => {
//               return (
//                 <div className="col-md-4">
//                   <div className="m-2 p-1 product position-relative">
//                     <div className="product-content">
//                       <p>{product.name}</p>
//                       <div className="text-center">
//                         <img
//                           src={product.imageUrl}
//                           alt=""
//                           className="product-img"
//                         />
//                       </div>
//                     </div>
//                     <div className="product-actions">
//                       <h2>{product.price} RS/-</h2>
//                       <div className="d-flex">
//                         <button
//                           className="mx-2"
//                           onClick={() => addToCart(product)}
//                         >
//                           ADD TO CART
//                         </button>
//                         <button
//                           onClick={() => {
//                             navigate(`/productinfo/${product.id}`);
//                           }}
//                         >
//                           VIEW
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Homepage;
