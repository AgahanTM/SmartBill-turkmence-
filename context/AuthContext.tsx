import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  signIn: () => void;
  signOut: () => void;
};

const defaultUser: User = {
  id: '1',
  name: 'Ezizhan Akmyradov',
  email: 'ezizhanakmyradov@gmail.com',
  avatar: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=400',
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: defaultUser,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>(defaultUser);
  
  useEffect(() => {
    // Simulate loading authentication state
    const loadAuthState = async () => {
      try {
        // In a real app, you would check for stored tokens, etc.
        setIsAuthenticated(false);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    
    loadAuthState();
  }, []);
  
  const signIn = () => {
    // In a real app, you would authenticate with a server
    setIsAuthenticated(true);
    setUser(defaultUser);
  };
  
  const signOut = () => {
    // In a real app, you would clear tokens, etc.
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}