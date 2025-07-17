import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@material-tailwind/react";
import { db } from "../../context/firebase";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const productRef = doc(db, "products", id);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            setProductData(productSnap.data());
          } else {
            setError("Product not found");
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching product:", err);
          setError("Failed to load product data.");
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      // إذا لم نكن في وضع التعديل، لا نحتاج لجلب بيانات
      setLoading(false);
    }
  }, [id, isEditing]); // إعادة جلب البيانات إذا تغير معرّف المنتج أو حالة التعديل

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // تفعيل حالة التحميل أثناء عملية الحفظ

    try {
      if (isEditing) {
        // تحديث المنتج الموجود في Firestore
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, productData);
        Swal.fire("Success", "Product updated successfully!", "success");
      } else {
        // إضافة منتج جديد إلى Firestore
        const productsCollectionRef = collection(db, "products");
        await addDoc(productsCollectionRef, productData);
        Swal.fire("Success", "Product added successfully!", "success");
        // مسح حقول النموذج بعد الإضافة الناجحة
        setProductData({
          name: "",
          description: "",
          price: "",
          image: "",
        });
      }
      // navigate('/admin/products'); // يمكن إلغاء تعليق هذا السطر لإعادة التوجيه بعد الحفظ
    } catch (err) {
      console.error("Error saving product:", err);
      Swal.fire("Error", "Failed to save product.", "error");
    } finally {
      setLoading(false); // تعطيل حالة التحميل بعد انتهاء العملية
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] flex items-center justify-center p-4 font-sans relative overflow-hidden pt-32 text-gray-100">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <Card className="w-full max-w-2xl p-8 shadow-2xl border border-white/10 bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 rounded-3xl backdrop-blur-xl z-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-20 place-items-center rounded-t-3xl bg-gradient-to-r from-[#00c6fb] to-[#005bea]"
        >
          <Typography
            variant="h3"
            className="font-extrabold text-white drop-shadow-lg"
          >
            {isEditing ? "Edit Product" : "Add New Product"}
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Textarea
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              required
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            <Input
              label="Image URL"
              name="image"
              type="url"
              value={productData.image}
              onChange={handleChange}
              required
              className="text-white"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
            {/* يمكنك إضافة حقل لرفع الصور هنا إذا كنت تستخدم Firebase Storage */}
            <Button
              className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform text-lg py-3"
              fullWidth
              type="submit"
              disabled={loading} // تعطيل الزر أثناء التحميل
            >
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProduct;
