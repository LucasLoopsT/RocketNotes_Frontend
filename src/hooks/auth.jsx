import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import PropTypes from "prop-types";

export const AuthContext = createContext({});

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function singIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("nao foi possivel conectar");
      }
    }
  }

  function singOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data[0].avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("perfil atualizado");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("nao foi possivel atualizar o perfil");
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setData({
      token,
      user: JSON.parse(user),
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singIn,
        singOut,
        user: data.user,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
