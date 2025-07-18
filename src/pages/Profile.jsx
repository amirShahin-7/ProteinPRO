import { useEffect, useState, useContext } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  Avatar,
  Select,
  Option,
} from "@material-tailwind/react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../context/firebase";
import { updatePassword, deleteUser } from "firebase/auth";
import Swal from "sweetalert2";
import context from "../context/context";
const imgbbKey = "f6963f799718a7d9a4061360621415d0";

const Profile = () => {
  const { userData, setUserData } = useContext(context);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (userData) {
      setImage(
        userData.image ||
          "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
      );
    }
  }, [userData]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
            setImage(
              userDocSnap.data().image ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            );
          } else {
            console.error(
              "User document not found in Firestore for UID:",
              currentUser.uid
            );
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          Swal.fire("Error", "Failed to fetch user data.", "error");
          setUserData(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [currentUser, setUserData]);

  const handleSave = async () => {
    if (!currentUser || !userData) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { ...userData, image });
      Swal.fire("Saved!", "Your profile has been updated.", "success");
      setIsEditing(false);
      setUserData({ ...userData, image });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  const handlePasswordChange = async () => {
    if (!currentUser) {
      Swal.fire("Error", "You must be logged in to change password.", "error");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire("Error", "Please fill in all password fields.", "error");
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire(
        "Error",
        "New password must be at least 6 characters.",
        "error"
      );
    } else if (newPassword.length < 6) {
      Swal.fire("Error", "New password must be at least 6 characters", "error");
    } else if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New passwords do not match.", "error");
    } else {
      try {
        await updatePassword(currentUser, newPassword);
        Swal.fire("Updated", "Password changed successfully.", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error changing password:", error);
        Swal.fire(
          "Error",
          error.message || "Failed to change password.",
          "error"
        );
      }
    }
  };

  const handleDelete = async () => {
    if (!currentUser) {
      Swal.fire("Error", "You must be logged in to delete account.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          await deleteDoc(userDocRef);
          await deleteUser(currentUser);
          localStorage.clear();
          Swal.fire(
            "Deleted",
            "Your account has been removed.",
            "success"
          ).then(() => {
            location.href = "/login";
          });
        } catch (error) {
          console.error("Error deleting account:", error);
          Swal.fire(
            "Error",
            error.message || "Failed to delete account.",
            "error"
          );
        }
      }
    });
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data.url);
      });
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

  if (!userData)
    return (
      <Typography color="red" className="text-center mt-8">
        User data not available. Please log in.
      </Typography>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] flex items-center justify-center p-4 font-sans relative overflow-hidden pt-32 text-gray-100">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <Card className="w-full max-w-2xl p-8 shadow-2xl border border-white/10 bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 rounded-3xl backdrop-blur-xl z-10">
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={
              image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            size="lg"
            className="border-4 border-[#181d4d] shadow-lg"
          />
          {isEditing && (
            <Input
              type="file"
              accept="image/*"
              className="text-[#181d4d] font-semibold"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          )}
        </div>

        <div className="space-y-4">
          <Input
            label="Username"
            value={userData.username}
            disabled={!isEditing}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          <Input
            label="Email"
            value={userData.email}
            disabled
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          <Input
            label="Phone Number"
            value={userData.phone}
            disabled={!isEditing}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          {isEditing ? (
            <Select
              label="Gender"
              value={userData.gender}
              onChange={(val) => setUserData({ ...userData, gender: val })}
              className="text-[#181d4d]"
              labelProps={{ className: "text-[#181d4d] font-semibold" }}
              crossOrigin="anonymous"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          ) : (
            <Input
              label="Gender"
              value={userData.gender}
              disabled
              className="text-[#181d4d] font-semibold"
              labelProps={{ className: "text-[#00c6fb] font-semibold" }}
              crossOrigin="anonymous"
            />
          )}

          {isEditing ? (
            <Button
              className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
              onClick={handleSave}
              fullWidth
            >
              Save Changes
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
              onClick={() => setIsEditing(true)}
              fullWidth
            >
              Edit Info
            </Button>
          )}
        </div>

        <div className="mt-10 border-t pt-6 space-y-4">
          <Typography variant="h6">Change Password</Typography>
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-[#181d4d] font-semibold"
            labelProps={{ className: "text-[#00c6fb] font-semibold" }}
            crossOrigin="anonymous"
          />
          <Button
            className="bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white font-bold shadow-md hover:scale-105 transition-transform"
            onClick={handlePasswordChange}
            fullWidth
          >
            Change Password
          </Button>
        </div>

        <div className="mt-10 border-t pt-6">
          <Button
            className="bg-gradient-to-r from-[#232946] to-[#181c2b] text-white font-bold shadow-md hover:scale-105 transition-transform"
            onClick={handleDelete}
            fullWidth
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
