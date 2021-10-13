import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { read, updateProduct } from "../actions/products";
import { useSelector } from "react-redux";
import ProductEditForm from "../components/forms/ProductEditForm";

const EditProduct = ({ match }) => {
  //redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  //state
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState ('')
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=IMAGE"
  );
  //destructuring variables from state
  const { title, description, price, quantity } = values;

  useEffect(() => {
    loadSellerProduct();
  }, []);

  const loadSellerProduct = async () => {
    let res = await read(match.params.productId);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/product/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    let productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    image && productData.append("image", image);
    productData.append("price", price);
    productData.append("quantity", quantity);

    try { 
        let res = await updateProduct(token, productData, match.params.productId)
        console.log('Product update res', res)
        toast.success(`${res.data.title} a été mis à jour`)
    } catch (err) {
        console.log(err)
        toast.error(err.response.data.err)
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-dark p-5 text-center">
        <h2 className="text-light">Editer un article</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ProductEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)} </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
