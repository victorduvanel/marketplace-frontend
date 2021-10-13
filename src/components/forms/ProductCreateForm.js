const ProductCreateForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, description, price, quantity } = values;
  return (
    <form onSubmit={handleSubmit}>
      <label className="btn btn-outline-secondary btn-block m-2 text-left">
        Télécharger une image
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          hidden
        />
      </label>
      <div className="form-group">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Titre de votre annonce"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={description}
        />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Prix"
          className="form-control m-2"
          value={price}
        />

        <input
          type="number"
          name="quantity"
          onChange={handleChange}
          placeholder="Nombre d'article"
          className="form-control m-2"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-dark m-2">Enregistrer</button>
    </form>
  );
};

export default ProductCreateForm;
