import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeCancel = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // console.log(
    //   "send productId to backend to create order",
    //   match.params.productId
    // );
    stripeSuccessRequest(token, match.params.productId).then((res) => {
      if (res.data.success) {
        // console.log("stripe success response", res.data);
        history.push("/dashboard");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.productId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeCancel;
