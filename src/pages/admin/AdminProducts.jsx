import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_DB_PRODUCTS;

  const fetchProducts = () => {
    axios.get(url).then((res) => setProducts(res.data));
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/${id}`).then(() => {
          fetchProducts();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        });
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/admin/add-product")}
          className="flex items-center gap-2 bg-green-600"
        >
          <FiPlus />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(({ id, name, image, price, rating }) => (
          <Card key={id} className="shadow-md">
            <CardHeader floated={false} className="h-56">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h6" className="mb-1">
                {name}
              </Typography>
              <Typography color="blue" className="mb-2 font-bold">
                ${price}
              </Typography>
              <Typography color="gray" className="text-sm">
                Rating: {rating}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-between px-6 pb-4">
              <Button
                color="red"
                size="sm"
                onClick={() => deleteProduct(id)}
                className="flex items-center gap-1"
              >
                <FiTrash2 />
                Delete
              </Button>
              <Button
                className="flex items-center gap-1"
                color="blue"
                onClick={() => navigate(`/admin/add-product/${id}`)}
              >
                <FiEdit />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
