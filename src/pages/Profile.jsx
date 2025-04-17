import { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Card,
  Typography,
  Avatar,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

const urlUser = import.meta.env.VITE_DB_USERS;
const imgbbKey = "f6963f799718a7d9a4061360621415d0";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userId = localStorage.getItem("userId");

  const fetchUser = () => {
    axios.get(`${urlUser}/${userId}`).then((res) => {
      setUser(res.data);
      setImage(res.data.image);
    });
  };

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  const handleSave = () => {
    axios.put(`${urlUser}/${userId}`, { ...user, image }).then(() => {
      Swal.fire("Saved!", "Your profile has been updated.", "success");
      setIsEditing(false);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userImage", image);
    });
  };

  const handlePasswordChange = () => {
    if (currentPassword !== user.password) {
      Swal.fire("Error", "Current password is incorrect", "error");
    } else if (newPassword.length < 6) {
      Swal.fire("Error", "New password must be at least 6 characters", "error");
    } else if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
    } else {
      axios
        .put(`${urlUser}/${userId}`, { ...user, password: newPassword })
        .then(() => {
          Swal.fire("Updated", "Password changed successfully", "success");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${urlUser}/${userId}`).then(() => {
          localStorage.clear();
          Swal.fire(
            "Deleted",
            "Your account has been removed.",
            "success"
          ).then(() => {
            location.href = "/login";
          });
        });
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

  if (!user) return null;

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
            value={user.username}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Input label="Email" value={user.email} disabled />
          <Input
            label="Phone Number"
            value={user.phone}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          {isEditing ? (
            <Select
              label="Gender"
              value={user.gender}
              onChange={(val) => setUser({ ...user, gender: val })}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          ) : (
            <Input label="Gender" value={user.gender} disabled />
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
