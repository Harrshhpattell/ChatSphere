import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Camera } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import { Navigate } from "react-router";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { checkAuth } from "@/features/auth/authSlice";

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    user?.profilePic
  );
  const [username, setUsername] = useState<string | undefined>(user?.fullName);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const updateProfileMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await axiosInstance.put("/auth/update-profile", {
        profilePic: imageData,
      });
      return response.data;
    },
    onSuccess: () => {
      // Update Redux state
      dispatch(checkAuth());

      // Reset the image changed flag
      setIsImageChanged(false);
    },
  });

  // Handle file input change
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsImageChanged(true);
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          const maxSize = 1200; // Max width or height
          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Could not get canvas context");
          }
          ctx.drawImage(img, 0, 0, width, height);

          // Adjust quality (0.7 = 70% quality)
          const quality = 0.7;
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

          resolve(compressedDataUrl);
        };
      };
    });
  };

  // Then modify your handleSaveImage function:
  const handleSaveImage = async (): Promise<void> => {
    if (!imageFile) return;

    try {
      // Compress the image
      const compressedImage = await compressImage(imageFile);

      // Send the compressed image to the server
      updateProfileMutation.mutate(compressedImage);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="text-4xl">
                  {user?.fullName
                    ? user.fullName.substring(0, 2).toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                    <Camera className="h-5 w-5" />
                    <span className="sr-only">Upload profile picture</span>
                  </div>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on camera icon to add/change your profile pic
            </p>
            {isImageChanged && (
              <Button
                onClick={handleSaveImage}
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending
                  ? "Saving..."
                  : "Save Profile Picture"}
              </Button>
            )}
          </div>

          <Separator />

          {/* Profile Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                value={username || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                disabled
              />
            </div>
          </div>

          <Separator />

          {/* Account Information Section */}
          {user && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </p>
                  <p>{moment(user.createdAt).format("ll")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
