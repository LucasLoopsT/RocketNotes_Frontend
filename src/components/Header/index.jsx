import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/useAuth";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/semfoto.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, singOut } = useAuth();

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
    singOut();
  }

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={`foto de ${user.name}`} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleLogOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
