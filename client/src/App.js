import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./App.css";

function App() {
  const publishableKey =
    "pk_test_51LxAnrCPZBgBi1l0oC5rYbHUiB7zxpS7GrBhcQkCSImM0nVl6wp3nHV85zthc91xO1BdstBMTgGY9Li54NKq2oxl00Ip6TE3vU";
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 1000,
  });
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        console.log("your payment was successfull");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <h2>Complete React & Stripe Integration</h2>
      <p>
        <span>Product:</span>
        {product.name}
      </p>
      <p>
        <span>Price:</span>
        {product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="play with credit card"
        billingAddress
        shippingAddress
        amount={product.price * 100}
        description={`Your toatal is ${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
