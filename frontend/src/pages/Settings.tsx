import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Camera } from 'lucide-react'
import React, { useState } from 'react'

const Settings = () => {
    const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
    const [username, setUsername] = useState("johndoe")
    const [email, setEmail] = useState("john.doe@example.com")
  
    // Handle file input change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setProfileImage(imageUrl)
      }
    }
  return (
    <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your account settings and profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback className="text-4xl">JD</AvatarFallback>
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
          <p className="text-sm text-muted-foreground">Click on camera icon to add/change your profile pic</p>
        </div>

        <Separator />

        {/* Profile Information Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <Separator />

        {/* Account Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
              <p>March 15, 2023</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Status</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="success" className="bg-green-500 hover:bg-green-600">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default Settings