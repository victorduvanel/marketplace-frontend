import { currencyFormatter } from "../../actions/stripe";
import { useHistory, Link } from "react-router-dom";
import { SettingFilled, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  p,
  handleProductDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-2">
            {p.image && p.image.contentType ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={`${process.env.REACT_APP_API}/product/image/${p._id}`}
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
                {p.title}{" "}
                <span className="float-right text-dark lead">
                  {currencyFormatter({
                    amount: p.price * 100,
                    currency: "chf",
                  })}
                </span>
              </h3>
              <p className="alert bg-dark text-light border-dark alert-info rounded">{`${p.description.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                Nombre d'article disponible : {p.quantity}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/product/${p._id}`)}
                    className="btn btn-dark text-light"
                  >
                    Acheter
                  </button>
                )}
              </div>
              {owner && (
                <>
                  <div class="d-flex justify-content-between h4">
                    <Link to={`/product/edit/${p._id}`}>
                      <SettingFilled className="text-dark mb-3" text-warning />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleProductDelete(p._id)}
                      className="text-danger"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmallCard;
