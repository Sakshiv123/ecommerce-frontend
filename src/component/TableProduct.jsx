import React,{useContext, useEffect, useState} from 'react'
import AppContext from '../context/AppContext'


const TableProduct = () => {
   const { cart,decreaseQty,addToCart,removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(()=>{
         let qty=0;
         let price=0;
         if(cart?.items){
          for(let i=0; i<cart.items?.length; i++){
            qty += cart.items[i].qty;
            price += cart.items[i].price;
          }
         
         }
           setPrice(price);
           setQty(qty);
  },[cart])

  
 return (
  <>
    <div className="table-responsive">
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">Product Img</th>
            <th scope="col" className="bg-dark text-light">Title</th>
            <th scope="col" className="bg-dark text-light">Price</th>
            <th scope="col" className="bg-dark text-light">Qty</th>
            <th scope="col" className="bg-dark text-light">Qty++</th>
            <th scope="col" className="bg-dark text-light">Qty--</th>
            <th scope="col" className="bg-dark text-light">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                  alt="product"
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  add_circle
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  do_not_disturb_on
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-dark text-light"></th>
            <td className="bg-dark text-light">
              <button className="btn btn-primary fw-bold">Total</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-warning fw-bold">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info fw-bold">{qty}</button>
            </td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
)
}
export default TableProduct
