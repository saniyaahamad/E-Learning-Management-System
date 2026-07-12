import { Link } from "react-router-dom";
import { useState } from "react";

function Cart() {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );


  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };


  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("₹", "")),
    0
  );


return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage: "url('/images/background.png')",
      backgroundSize: "cover",
      padding: "40px",
    }}
  >

    <h1
      style={{
        textAlign: "center",
        color: "white",
        fontSize: "45px",
        marginBottom: "40px",
        textShadow: "2px 2px 10px black",
      }}
    >
      Shopping Cart
    </h1>


    {cart.length === 0 ? (

      <h2
        style={{
          textAlign:"center",
          color:"white"
        }}
      >
        Your Cart is Empty
      </h2>

    ) : (

      <>

      {cart.map((c)=>(

        <div
          key={c.id}
          style={{
            background:"white",
            borderRadius:"20px",
            padding:"25px",
            marginBottom:"25px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            boxShadow:"0px 5px 20px gray",
          }}
        >

          <div>
            <h2>{c.name}</h2>

            <h3
              style={{
                color:"#a435f0"
              }}
            >
              {c.price}
            </h3>
          </div>


          <img
            src={c.image}
            alt=""
            style={{
              width:"180px",
              height:"100px",
              borderRadius:"10px"
            }}
          />


          <button
            onClick={() => removeFromCart(c.id)}
            style={{
              background:"red",
              color:"white",
              padding:"10px 20px",
              border:"none",
              borderRadius:"5px",
              cursor:"pointer"
            }}
          >
            Delete
          </button>


        </div>

      ))}



      <div
        style={{
          background:"white",
          padding:"30px",
          borderRadius:"20px",
          textAlign:"center",
          marginTop:"40px"
        }}
      >

        <h1>
          Total: ₹{total}
        </h1>


        <Link to="/payment">

          <button
            style={{
              background:"#a435f0",
              color:"white",
              border:"none",
              padding:"15px 40px",
              borderRadius:"10px",
              fontSize:"18px"
            }}
          >
            Proceed To Payment
          </button>

        </Link>


      </div>

      </>

    )}

  </div>
);

}

export default Cart;