import { useEffect, useState } from "react";
import {
  Check,
  CircleX,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
// import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";

interface ErrorResponse {
  message?: string;
}

interface UsernameStatus {
  isChecking: boolean;
  isAvailable: boolean | null;
  message: string;
}

// Define Zod Schema
const signupSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// debounce hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Infer TypeScript types from Zod schema
type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { setAuthUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>({
    isChecking: false,
    isAvailable: null,
    message: "",
  });

  const debouncedUsername = useDebounce(username, 1000);

  useEffect(() => {
    const checkUsernameAvailability = async (): Promise<void> => {
      // Don't check if username is too short
      if (!debouncedUsername || debouncedUsername.length < 3) {
        setUsernameStatus({
          isChecking: false,
          isAvailable: null,
          message: "",
        });
        return;
      }

      setUsernameStatus((prev) => ({ ...prev, isChecking: true }));

      try {
        await axiosInstance.post<{ message: string; available: boolean }>(
          "/auth/check-username",
          {
            username: debouncedUsername,
          }
        );
        setUsernameStatus({
          isChecking: false,
          isAvailable: true,
          message: "Username is available",
        });
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        setUsernameStatus({
          isChecking: false,
          isAvailable: false,
          message:
            axiosError.response?.data?.message || "Error checking username",
        });
      }
    };

    if (debouncedUsername) {
      checkUsernameAvailability();
    }
  }, [debouncedUsername]);

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      // Only proceed if username is available
      if (username.length >= 3 && !usernameStatus.isAvailable) {
        throw new Error("Please choose a different username");
      }
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      dispatch(setCredentials(data));
      navigate("/chat");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again!");
    },
    retry: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary/5 via-background to-primary/10">
      <div className="container mx-auto min-h-screen grid lg:grid-cols-2 gap-8 items-start px-4">
        {/* Left Side - Sign Up Form */}
        <div className="w-full max-w-md mx-auto order-2 lg:order-1 my-10">
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                          {...register("fullName")}
                        />
                      </div>
                      {errors.fullName && (
                        <div className="bg-red-50 rounded p-2 flex gap-2 items-center">
                          <CircleX className="text-red-500" />
                          <p className="text-red-500 text-sm">
                            {errors.fullName.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* UserName Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                          @
                        </span>
                        <Input
                          type="text"
                          className="pl-10 h-12"
                          placeholder="John_Doe"
                          {...register("username")}
                          onChange={(e) => {
                            register("username").onChange(e);
                            handleUsernameChange(e);
                          }}
                        />
                        {username.length >= 3 && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {usernameStatus.isChecking ? (
                              <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
                            ) : usernameStatus.isAvailable ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <CircleX className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {errors.username && (
                        <div className="bg-red-50 rounded p-2 flex gap-2 items-center">
                          <CircleX className="text-red-500" />
                          <p className="text-red-500 text-sm">
                            {errors.username.message}
                          </p>
                        </div>
                      )}
                      {username.length >= 3 &&
                        usernameStatus.message &&
                        !errors.username && (
                          <div
                            className={`rounded p-2 flex gap-2 items-center ${
                              usernameStatus.isAvailable
                                ? "bg-green-50"
                                : "bg-red-50"
                            }`}
                          >
                            {usernameStatus.isAvailable ? (
                              <Check className="text-green-500" />
                            ) : (
                              <CircleX className="text-red-500" />
                            )}
                            <p
                              className={`text-sm ${
                                usernameStatus.isAvailable
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {usernameStatus.message}
                            </p>
                          </div>
                        )}
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
                          {...register("email")}
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

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-12"
                          placeholder="Min. 6 characters"
                          {...register("password")}
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
                    disabled={mutation.isPending || 
                      (username.length >= 3 && usernameStatus.isAvailable === false)}
                    className={`w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center ${
                      mutation.isPending || 
                      (username.length >= 3 && usernameStatus.isAvailable === false) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {mutation.isPending ? (
                      <Loader className="size-6 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
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
        <div className="hidden lg:flex flex-col items-center justify-center relative order-1 lg:order-2 py-10">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                Join <span className="text-primary">ChatSphere</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Connect with friends, share moments, and stay in touch with your
                loved ones in a secure environment
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-primary/10 
                    ${i % 2 === 0 ? "animate-pulse" : ""}
                    ${i % 3 === 0 ? "scale-90" : "scale-100"}
                  `}
                />
              ))}
            </div>

            {/* Feature Points */}
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">
                  End-to-end encrypted messaging
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">
                  Real-time message delivery
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-muted-foreground">
                  Cross-platform synchronization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
