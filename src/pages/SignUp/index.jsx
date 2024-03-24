import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";
import { useState } from "react";

import { api } from "../../services/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function handleSubmit() {
  if (!name || !email || !password){
    return alert ('Preencha todos os campos')
  }

  try {
    await api.post("/users", { name, email, password })
    alert("usuario cadastrado com sucesso");
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("nao foi possivel cadastrar");
    }
  }

      // api.post("/users", { name, email, password })
      // .then(()=>{
      //   alert("usuario cadastrado com sucesso");
      // })
      // .catch(error => {

      //   if (error.response) {
      //     alert(error.response.data.message);
      //   } else {
      //     alert("nao foi possivel cadastrar");
      //   }
      // })
  
    }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSubmit} />

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
