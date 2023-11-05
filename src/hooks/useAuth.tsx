import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

interface IAuth {
  phone: string;
  token: string;
}

interface IAuthContextType {
  auth: IAuth;
  setAuth: (auth: IAuth) => Promise<void>;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const initialState: IAuth = {
    phone: '',
    token: '',
  };

  const [auth, setAuthState] = useState<IAuth>(initialState);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData: IAuth = JSON.parse(
        authDataString || JSON.stringify(initialState),
      );
      // Configure axios headers or another HTTP requests client
      configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState(initialState);
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (newAuth: IAuth) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
      // Configure axios headers or another HTTP requests client
      configureAxiosHeaders(newAuth.token, newAuth.phone);
      setAuthState(newAuth);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};

function configureAxiosHeaders(token: string, phone: string) {
  // code to set headers in Axios based on the token and phone
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
