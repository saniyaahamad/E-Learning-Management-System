import "./payment.css";
import { useEffect, useState } from "react";

function Payment() {

  const [course, setCourse] = useState(null);


  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("buyCourse")
    );

    setCourse(data);

  }, []);



  if (!course) {

    return (
      <h2 style={{ textAlign: "center" }}>
        No Course Selected
      </h2>
    );

  }



  // Sample Images

  const qrImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Crect x='20' y='20' width='50' height='50' fill='black'/%3E%3Crect x='130' y='20' width='50' height='50' fill='black'/%3E%3Crect x='20' y='130' width='50' height='50' fill='black'/%3E%3Crect x='90' y='90' width='20' height='20' fill='black'/%3E%3Crect x='120' y='120' width='30' height='30' fill='black'/%3E%3C/svg%3E";


  const visa =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%231a1f71'/%3E%3Ctext x='20' y='38' fill='white' font-size='25'%3EVISA%3C/text%3E%3C/svg%3E";


  const mastercard =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='white'/%3E%3Ccircle cx='55' cy='30' r='20' fill='red'/%3E%3Ccircle cx='75' cy='30' r='20' fill='orange'/%3E%3C/svg%3E";


  const rupay =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%23005baa'/%3E%3Ctext x='20' y='38' fill='white' font-size='22'%3ERuPay%3C/text%3E%3C/svg%3E";




return (

<div className="payment-page">


<div className="payment-container">


<h1>
🔒 Secure Payment
</h1>



<div className="payment-content">



{/* LEFT SIDE */}

<div className="payment-left">


<h2>
Payment Methods
</h2>



<div className="payment-methods">

<button className="active">
UPI
</button>

<button>
Card
</button>

<button>
Net Banking
</button>

</div>





<div className="upi-box">


<h3>
Pay using UPI
</h3>


<img
src={qrImage}
className="qr"
alt="QR"
/>


<p>
Scan QR using any UPI App
</p>


</div>







<div className="card-box">


<h3>
Credit / Debit Card
</h3>



<div className="logos">


<img src={visa} alt="visa"/>

<img src={mastercard} alt="mastercard"/>

<img src={rupay} alt="rupay"/>


</div>





<input
placeholder="Card Number"
/>


<input
placeholder="Card Holder Name"
/>




<div className="card-row">


<input
placeholder="Expiry"
/>


<input
placeholder="CVV"
/>


</div>



</div>








<div className="bank-box">


<h3>
Net Banking
</h3>



<div className="banks">


<button>
HDFC
</button>


<button>
SBI
</button>


<button>
ICICI
</button>


<button>
AXIS
</button>


</div>


</div>



</div>










{/* RIGHT SIDE */}



<div className="payment-right">


<h2>
Order Summary
</h2>




<img

src={course.image}

className="course-img"

alt="course"

/>





<h3>
{course.name}
</h3>



<p>
Instructor :
{course.instructor}
</p>



<p>
⭐ Rating :
{course.rating}
</p>



<h2>
Price : {course.price}
</h2>






<div className="coupon">


<input
placeholder="Coupon Code"
/>


<button>
Apply
</button>


</div>







<div className="price-box">


<p>
Original Price : ₹999
</p>


<p>
Discount : - ₹500
</p>


<hr/>


<h2>
Total : {course.price}
</h2>


</div>







<button className="pay-now">

Proceed To Pay

</button>







<div className="secure">


🔒 Secure Payment

<br/>

100% Safe & Encrypted


</div>




</div>





</div>



</div>



</div>


);


}


export default Payment;