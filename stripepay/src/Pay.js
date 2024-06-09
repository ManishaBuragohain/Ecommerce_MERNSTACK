// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import StripeCheckout from "react-stripe-checkout";
// const KEY = "pk_test_51PIEGgSFvXlzwW4URxqgLgrbFNBGPlTP0B0avT9CE6jXSTSk2XdljOraqxdGXsQ22TRynyPdLvkpn4BEIzfiSvyC00G6VvFVEe"
// const Pay = () => {

//   const [stripeToken, setStripeToken] = useState(null);
//   const navigate = useNavigate()
//   const onToken = (token) =>{
//    setStripeToken(token)
//   }

//   useEffect(()=>{
//    const makeRequest = async () =>{
//     try {
//      const res =  await axios.post("http://localhost:5000/api/checkout/payment", {
//       tokenid : stripeToken.id,
//       amount: 2000,
//      })
//      console.log(res.data)
//      navigate("/success")
//     } catch (error) {
      
//     }
//    }
//    stripeToken &&  makeRequest();
//   }, [stripeToken, navigate])


//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >

//       {
//         stripeToken ? (<span>
//           processing...please wait
//         </span>) :
//         (<></>)
//       }



//       <StripeCheckout
//         name="manisha shop"
//         image="https://avatars.githubusercontent.com/u/89069791?v=4"
//         billingAddress
//         shippingAddress
//         description="your total is $20"
//         amount={2000}
//         token={onToken}
//         stripeKey={KEY}
//       >
//         <button
//           style={{
//             border: "none",
//             width: "120",
//             borderRadius: 5,
//             padding: "20px",
//             backgroundColor: "black",
//             color: "white",
//             fontWeight: "600",
//             cursor: "pointer",
//           }}
//         >
//           Pay Now
//         </button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default Pay;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const KEY = "pk_test_51PIEGgSFvXlzwW4URxqgLgrbFNBGPlTP0B0avT9CE6jXSTSk2XdljOraqxdGXsQ22TRynyPdLvkpn4BEIzfiSvyC00G6VvFVEe";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing status
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        setIsProcessing(true); // Set processing to true
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenid: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
        navigate("/success");
      } catch (error) {
        console.error("Payment error:", error); // Log the error for debugging
      } finally {
        setIsProcessing(false); // Set processing to false regardless of success or failure
      }
    };

    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isProcessing ? (
        <span>Processing...please wait</span>
      ) : (
        <StripeCheckout
          name="Manisha Shop"
          image="https://avatars.githubusercontent.com/u/89069791?v=4"
          billingAddress
          shippingAddress
          description="Your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;

