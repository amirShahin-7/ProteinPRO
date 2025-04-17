import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const url = import.meta.env.VITE_DB_PRODUCTS;

  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`${url}/${id}`).then((res) => setProduct(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = {
      ...product,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
    };

    const request = isEdit
      ? axios.put(`${url}/${id}`, data)
      : axios.post(url, data);

    request
      .then(() => {
        Swal.fire({
          icon: "success",
          title: isEdit ? "Product Updated" : "Product Added",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/products");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again",
        });
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-xl">
        <CardHeader color="blue" className="p-4">
          <Typography variant="h4" color="white">
            {isEdit ? "Edit Product" : "Add Product"}
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            label="Rating"
            name="rating"
            type="number"
            value={product.rating}
            onChange={handleChange}
          />
          <Input
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <Button color="blue" onClick={handleSubmit}>
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProduct;
