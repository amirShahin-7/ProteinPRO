import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../context/firebase";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productsList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
    setLoading(false);
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
        const productDoc = doc(db, "products", id);
        deleteDoc(productDoc).then(() => {
          setProducts(products.filter((product) => product.id !== id));
          fetchProducts();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        });
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="blue-gray">
          Loading Products...
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] p-8 font-sans text-gray-100 relative overflow-hidden pt-32">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <div className="flex justify-center mb-8 z-10 relative">
        <Button
          onClick={() => navigate("/admin/add-product")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          <FiPlus />
          Add Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 z-10 relative">
        {products.map(({ id, name, image, price, rating }) => (
          <Card
            key={id}
            className="shadow-2xl border border-white/10 bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 text-white rounded-2xl backdrop-blur-xl hover:scale-105 transition-transform"
          >
            <CardHeader
              floated={false}
              className="h-56 bg-white/10 flex items-center justify-center"
            >
              <img
                src={image}
                alt={name}
                className="h-full w-full object-contain p-4 rounded-xl"
                loading="lazy"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography
                variant="h6"
                className="mb-1 text-[#00c6fb] font-bold"
              >
                {name}
              </Typography>
              <Typography className="mb-2 font-bold text-[#ffb86b]">
                ${price}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-between px-6 pb-4">
              <Button
                className="flex items-center gap-1 bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white font-bold shadow-md hover:scale-105 transition-transform"
                size="sm"
                onClick={() => deleteProduct(id)}
              >
                <FiTrash2 />
                Delete
              </Button>
              <Button
                className="flex items-center gap-1 bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
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
