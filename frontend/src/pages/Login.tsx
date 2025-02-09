import { useState } from "react";
import { CircleX, Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript types from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Login successfully!");
      setAuthUser(data);
      navigate("/chat");
    },
    onError: (error: any) => {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again!");
    },
    retry: 1,
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto min-h-screen grid lg:grid-cols-2 gap-8 items-center px-4">
        {/* Left Side - Branding & Decorative Elements */}
        <div className="hidden lg:flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                Welcome to <span className="text-primary">ChatSphere</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Your secure messaging platform
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-primary/10 
                    ${i % 3 === 0 ? "animate-pulse" : ""}
                    ${i % 2 === 0 ? "scale-90" : "scale-100"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Logo & Welcome */}
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4 group transition-all hover:scale-110">
                    <MessageSquare className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h2 className="text-2xl font-semibold">Welcome Back!</h2>
                  <p className="text-muted-foreground">
                    Sign in to your account
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          className="pl-10 h-12"
                          placeholder="you@example.com"
                          {...login("email")}
                        />
                      </div>
                      {errors.email && (
                        <div className="bg-red-50 rounded p-2 flex gap-2 items-center">
                          <CircleX className="text-red-500" />
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-12"
                          placeholder="••••••••"
                          {...login("password")}
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
                      {errors.password && (
                        <div className="bg-red-50 rounded p-2 flex gap-2 items-center">
                          <CircleX className="text-red-500" />
                          <p className="text-red-500 text-sm">
                            {errors.password.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                   <button
                    type="submit"
                    disabled={mutation.isPending}
                    className={`w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center ${
                      mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {mutation.isPending ? (
                      <Loader className="size-6 animate-spin" />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <a
                    href="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
