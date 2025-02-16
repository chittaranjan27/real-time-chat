import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-200 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
            <p className="text-base-content/80">Manage your account information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="relative rounded-full overflow-hidden shadow-xl">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-40 h-40 object-cover transition-opacity duration-300 hover:opacity-90"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-2 -right-2 
                  bg-primary hover:bg-primary-focus 
                  p-3 rounded-full cursor-pointer shadow-md
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-100" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <div className="p-3 bg-base-100 rounded-lg border border-base-300">
                  <p className="text-base-content">{authUser?.fullName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-base-content/80">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="p-3 bg-base-100 rounded-lg border border-base-300">
                  <p className="text-base-content">{authUser?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="bg-base-300 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-base-content">Account Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-base-content/10">
                <span className="text-base-content/70">Registration Date</span>
                <span className="text-base-content">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-base-content/70">Status</span>
                <span className="badge badge-success badge-lg text-sm">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;