import { useEffect, useState, useContext } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  Avatar,
  Select, Option
} from "@material-tailwind/react";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Correct import path
import { auth } from '../firebase'; // Correct import path
import { updatePassword, deleteUser } from 'firebase/auth'; // Import auth functions

import Swal from "sweetalert2";
import context from "../context/context";

const urlUser = import.meta.env.VITE_DB_USERS;
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

  // Fetch user data from Firestore when the component mounts or currentUser changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
            setImage(userDocSnap.data().image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png");
          } else {
            // Handle case where user document doesn't exist (shouldn't happen if signup creates it)
            console.error("User document not found in Firestore for UID:", currentUser.uid);
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
        // User is not logged in, redirect to login
        // navigate('/login'); // Assuming you have navigate available
        setLoading(false);
        setUserData(null); // Ensure userData is null if not logged in
      }
    };

    fetchUserData();
  }, [currentUser, setUserData]); // Depend on currentUser and setUserData

  const handleSave = async () => {
    if (!currentUser || !userData) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { ...userData, image });
      Swal.fire("Saved!", "Your profile has been updated.", "success");
      setIsEditing(false);
      setUserData({ ...userData, image }); // Update context state
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

    // Re-authenticate the user before changing password (optional but recommended)
    // This requires implementing re-authentication flow, which is more complex.
    // For simplicity here, we'll just check the new password validity and perform update.

    if (newPassword.length < 6) {
      Swal.fire("Error", "New password must be at least 6 characters.", "error");
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
        // Note: We don't store password in Firestore userData for security reasons.
      } catch (error) {
        console.error("Error changing password:", error);
        Swal.fire("Error", error.message || "Failed to change password.", "error");
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
    }).then(async (result) => { // Make the callback async
      if (result.isConfirmed) {
        try {
          // Delete user document from Firestore first
          const userDocRef = doc(db, 'users', currentUser.uid);
          await deleteDoc(userDocRef);

          // Delete user from Firebase Authentication
          await deleteUser(currentUser);

          localStorage.clear();
          Swal.fire(
            "Deleted",
            "Your account has been removed.",
            "success"
          ).then(() => {
            location.href = "/login";
            // Or use navigate if available and appropriate
            // navigate('/login');
          });
        } catch (error) {
          console.error("Error deleting account:", error);
          Swal.fire("Error", error.message || "Failed to delete account.", "error");
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

  if (!userData) return <Typography color="red" className="text-center mt-8">User data not available. Please log in.</Typography>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={
              image || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            size="lg"
          />
          {isEditing && (
            <Input
              type="file"
              accept="image/*"
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
          />
          <Input label="Email" value={userData.email} disabled />
          <Input
            label="Phone Number"
            value={userData.phone}
            disabled={!isEditing}
            onChange={(e) => // Use event.target.value
              setUserData({ ...userData, phone: e.target.value })
            }
          />
          {isEditing ? (
            <Select
              label="Gender"
              value={userData.gender}
              onChange={(val) => setUserData({ ...userData, gender: val })}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          ) : (
            <Input label="Gender" value={userData.gender} disabled />
          )}

          {isEditing ? (
            <Button color="blue" onClick={handleSave} fullWidth>
              Save Changes
            </Button>
          ) : (
            <Button color="blue" onClick={() => setIsEditing(true)} fullWidth>
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
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button color="green" onClick={handlePasswordChange} fullWidth>
            Change Password
          </Button>
        </div>

        <div className="mt-10 border-t pt-6">
          <Button color="red" onClick={handleDelete} fullWidth>
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
