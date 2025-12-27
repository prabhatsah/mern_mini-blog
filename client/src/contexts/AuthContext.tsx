import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios(`${apiUrl}/api/v1/user/me`, { withCredentials: true });
        setUser(user.data.data);
      } catch (error) {
        setUser(null);
        // console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await axios({ method: "post", url: `${apiUrl}/api/v1/user/register`, data: { email, password, name } });

      toast.success("User created");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await axios({
        method: "post",
        url: `${apiUrl}/api/v1/user/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
      });

      toast.success("Login success");

      const userRes = await axios.get(`${apiUrl}/api/v1/user/me`, { withCredentials: true });
      setUser(userRes.data.data);
    } catch (error) {
      console.log("Error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const signOut = async () => {
    try {
      await axios({
        method: "get",

        url: `${apiUrl}/api/v1/user/logout`,
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logout success");
    } catch (error) {
      // console.log("Error:", error);
    }
  };

  return <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
