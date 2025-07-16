import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // تأكد من صحة المسار النسبي إلى firebase.js
import Swal from 'sweetalert2';
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@material-tailwind/react";

const AddProduct = () => {
  const { id } = useParams(); // الحصول على معرّف المنتج إذا كان موجوداً في الرابط (للتعديل)
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEditing = !!id; // تحديد ما إذا كنا في وضع التعديل

  useEffect(() => {
    // إذا كنا في وضع التعديل، جلب بيانات المنتج الموجودة
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const productRef = doc(db, 'products', id);
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
    setProductData(prevData => ({
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
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, productData);
        Swal.fire('Success', 'Product updated successfully!', 'success');
      } else {
        // إضافة منتج جديد إلى Firestore
        const productsCollectionRef = collection(db, 'products');
        await addDoc(productsCollectionRef, productData);
        Swal.fire('Success', 'Product added successfully!', 'success');
        // مسح حقول النموذج بعد الإضافة الناجحة
        setProductData({
          name: '',
          description: '',
          price: '',
          image: '',
        });
      }
      // navigate('/admin/products'); // يمكن إلغاء تعليق هذا السطر لإعادة التوجيه بعد الحفظ
    } catch (err) {
      console.error("Error saving product:", err);
      Swal.fire('Error', 'Failed to save product.', 'error');
    } finally {
      setLoading(false); // تعطيل حالة التحميل بعد انتهاء العملية
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Typography variant="h5" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Typography variant="h5" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader variant="gradient" color="blue" className="mb-4 grid h-20 place-items-center">
        <Typography variant="h3" color="white">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            required
          />
          <Input
            label="Image URL"
            name="image"
            type="url"
            value={productData.image}
            onChange={handleChange}
            required
          />
          {/* يمكنك إضافة حقل لرفع الصور هنا إذا كنت تستخدم Firebase Storage */}
          <Button
            variant="gradient"
            color="blue"
            fullWidth
            type="submit"
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddProduct;
