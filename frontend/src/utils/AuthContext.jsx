// AuthContext.jsx
import { createContext, useContext, useReducer } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Estado inicial
const initialState = {
  usuario: null,  // Estado inicial, sin usuario cargado
};

// Reducer para manejar el estado
function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, usuario: action.payload };
    case "CLEAR_USER":
      return { ...state, usuario: null };
    default:
      return state;
  }
}

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acceder al estado del contexto
export function useAuth() {
  return useContext(AuthContext);
}
