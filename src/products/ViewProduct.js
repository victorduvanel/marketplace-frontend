import React, { useState, useEffect } from "react";
import { read, isAllreadyPurchased } from "../actions/products";
import { getSessionId } from "../actions/stripe";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const ViewProduct = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allreadyPurchased, setAllreadyPurchased] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerProduct();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAllreadyPurchased(auth.token, match.params.productId).then((res) => {
        console.log(res)
        if (res.data.ok) setAllreadyPurchased(true);
      });
    }
  }, []);

  const loadSellerProduct = async () => {
    let res = await read(match.params.productId);
    // console.log(res);
    setProduct(res.data);
    setImage(`${process.env.REACT_APP_API}/product/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    // console.log(auth.token, match.params.productId);
    let res = await getSessionId(auth.token, match.params.productId);
    // console.log("get session Id response", res.data.sessionId)
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };
  return (
    <>
      <div className="container-fluid bg-dark p-5 text-center">
        <h2 className="text-light">{product.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <br />
            <img
              src={image}
              alt={product.title}
              className="img img-fluid m-2"
            />
          </div>
          <div className="col-md-6">
            <br />
            <b>{product.description}</b>
            <p className="alert alert-dark mt-3">{product.price}</p>
            <p className="alert alert-dark mt-3">{product.quantity}</p>
            <i> Posté par {product.postedBy && product.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-clock btn-lg btn-dark mt-3"
              disabled={loading || allreadyPurchased}

            >
              {loading
                ? "Chargement..."
                : allreadyPurchased
                ? "Laissez-en aux autres :)"
                : auth && auth.token
                ? "Acheter maintenant"
                : "Connectez-vous pour acheter"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProduct;
