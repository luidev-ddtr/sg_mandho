import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  usuario: null,
};

// Cargar usuario desde localStorage si no ha expirado (máximo 3 horas)
function loadUserFromStorage() {
  try {
    const stored = localStorage.getItem('usuario');
    if (!stored) return null;

    const { usuario, timestamp } = JSON.parse(stored);
    const now = Date.now();
    const threeHours = 3 * 60 * 60 * 1000;

    if (now - timestamp > threeHours) {
      localStorage.removeItem('usuario');
      return null;
    }

    return usuario;
  } catch {
    return null;
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      const usuario = action.payload;
      localStorage.setItem('usuario', JSON.stringify({
        usuario,
        timestamp: Date.now()
      }));
      return { ...state, usuario };
    case "CLEAR_USER":
      localStorage.removeItem('usuario');
      return { ...state, usuario: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    usuario: loadUserFromStorage()
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
