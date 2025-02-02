import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary/5 via-background to-primary/10">
      <div className="container mx-auto min-h-screen grid lg:grid-cols-2 gap-8 items-center px-4">
        {/* Left Side - Sign Up Form */}
        <div className="w-full max-w-md mx-auto order-2 lg:order-1">
          <Card className="backdrop-blur-sm bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Logo & Welcome */}
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4 group transition-all hover:scale-110">
                    <MessageSquare className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h2 className="text-2xl font-semibold">Create Account</h2>
                  <p className="text-muted-foreground">Join ChatSphere today</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Full Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          className="pl-10 h-12"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          className="pl-10 h-12"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-12"
                          placeholder="Min. 6 characters"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be at least 6 characters long
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium
                      hover:bg-primary/90 active:scale-[0.98] transition-all"
                  >
                    Create Account
                  </button>
                </form>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <a
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Welcome Content */}
        <div className="hidden lg:flex flex-col items-center justify-center relative order-1 lg:order-2">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                Join <span className="text-primary">ChatSphere</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Connect with friends, share moments, and stay in touch with your loved ones in a secure environment
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-primary/10 
                    ${i % 2 === 0 ? 'animate-pulse' : ''}
                    ${i % 3 === 0 ? 'scale-90' : 'scale-100'}
                  `}
                />
              ))}
            </div>

            {/* Feature Points */}
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">End-to-end encrypted messaging</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">Real-time message delivery</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">Cross-platform synchronization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;