import { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { useHistory } from "react-router-dom";
import OrderModal from "../modals/OrderModal";

const PurchaseCard = ({ product, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-3">
            {product.image && product.image.contentType ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={`${process.env.REACT_APP_API}/product/image/${product._id}`}
                alt="default product image"
                className="card-image img img-fluid border-dark"
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src="https://via.placeholder.com/900x500.png?text=image+du+produit"
                alt="default product image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title d-flex justify-content-between">
                {product.title}{" "}
                <span className="float-right text-dark lead">
                  {currencyFormatter({
                    amount: product.price * 100,
                    currency: "chf",
                  })}
                </span>
              </h3>
              <p className="alert bg-dark text-light border-dark alert-info rounded">{`${product.description.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                Nombre d'article disponible : {product.quantity}
              </p>

              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-dark"
                >
                  Détails de l'achat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PurchaseCard;
