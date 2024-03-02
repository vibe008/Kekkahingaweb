import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./payment.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { MdOutlinePayment } from "react-icons/md";
function Payment() {
  
  const navigation = useNavigate()
  const location = useLocation();
  const id = location.state?.userId;
  const [subscribtion, setShowSucrbition] = useState(false);
  useEffect(() => {
    const check = async () => {
      try {
        const resq = `https://api.rascalstudioz.in/api/transaction/validate-subs/+${id}`;
        const resp = await fetch(resq);
        const data = await resp.json();
        // console.log("resp",resp)
        // console.log("checkdata", data);
        if (data.user.isPremium === 1) {
          // console.log("data.message",data.user.isPremium)
          setShowSucrbition(true);
        }else{
          setShowSucrbition(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, [id]);

  const handlepayment = async (price, duration) => {
    try {
      const resq = "https://api.rascalstudioz.in/api/phonepe";
      const responce = await fetch(resq, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: id, price: price, duration: duration }),
      });
      // console.log("payment resp",resq)
      const data = await responce.json();
      // console.log("payment data",data)
      // console.log("data", data.data.instrumentResponse.redirectInfo.url);
      const redirectUrl = data.data.instrumentResponse.redirectInfo.url;
      // console.log("Redirect URL:", redirectUrl);
      window.open(redirectUrl, "_blank");
    } catch (err) {
      console.log("not",err);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaArrowLeftLong size={30} style={{ padding: "10px" }} onClick={()=>{
        //  navigation.pop()
         navigation(-1);
        }}/>
        <p>Subscriptions</p>
      </div>
      {subscribtion ? (
        <div className="alreadySubscriptions">
         Plan is Active 
         Please go back to the application
        </div>
      ) : (
        <div className="paymentcontainer">
          <div className="paymentCard">
            {/* <MdOutlinePayment size={40} /> */}
            <div>
              <del>59 Rs./Month</del>
              <p>39 Rs./Month</p>
            </div>
            <button
              className="paymentbtn"
              onClick={() => {
                handlepayment(39, "month");
              }}
            >
              suscribe now !!
            </button>
          </div>
          <div className="paymentCard">
            {/* <MdOutlinePayment size={40} /> */}
            <div>
              <del>599 Rs./Year</del>
              <p>399 Rs./Year</p>
            </div>
            <button
              className="paymentbtn"
              onClick={() => {
                handlepayment(399, "year");
              }}
            >
              suscribe now !!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
