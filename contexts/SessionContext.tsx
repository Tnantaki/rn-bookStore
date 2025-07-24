import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useStorageState } from "../hooks/useStorageState";
import { account } from "@/lib/appwrite";
import { ID, Models } from "react-native-appwrite";

export interface Account {
  email: string;
  password: string;
}

type User = Models.User<Models.Preferences>;

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  user?: User | null;
}>({
  signIn: async () => {},
  signOut: async () => {},
  register: async () => {},
  session: null,
  isLoading: false,
  user: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<User>();

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get<User>();

      setSession(user.$id);
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };

  const signOut = async () => {
    await account.deleteSession("current");
    setSession(null);
  };

  const initialUser = async () => {
    try {
      const user = await account.get<User>();
      setUser(user);
    } catch (error) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    initialUser();
  });

  return (
    <AuthContext
      value={{
        signIn,
        signOut,
        register,
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext>
  );
}
