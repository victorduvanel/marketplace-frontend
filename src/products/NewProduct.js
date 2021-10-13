import { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../actions/products";
import { useSelector } from "react-redux";
import ProductCreateForm from "../components/forms/ProductCreateForm";

const NewProduct = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  //state
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=IMAGE"
  );
  //destructuring variables from state
  const { title, description, image, price, quantity } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    image && productData.append("image", image);
    productData.append("price", price);
    productData.append("quantity", quantity);

    console.log([...productData]);

    try {
      let res = await createProduct(token, productData);
      console.log("PRODUCT CREATE RES", res);
      toast.success("Nouvel article créé !");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Ajouter un article</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ProductCreateForm
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

export default NewProduct;
