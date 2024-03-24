import { Link, useNavigate } from "react-router-dom";

import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { Container, Form } from "./styles";
import { useState } from "react";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleNewLink() {
    setLinks(() => [...links, newLink]);
    setNewLink("");
  }

  function handleDeleteLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleNewTag() {
    setTags(() => [...tags, newTag]);
    setNewTag("");
  }

  function handleDeleteTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Adicione um titulo a nota");
    }

    if (newLink) {
      return alert(
        "voce colocou um LINK mas esqueceu de adicionar, adicione-o ou exclua-o"
      );
    }

    if (newTag) {
      return alert(
        "voce colocou um TAG mas esqueceu de adicionar, adicione-o ou exclua-o"
      );
    }

    await api.post("notes", {
      title,
      description,
      tags,
      links,
    });
    alert("Nota criada com sucesso");
    navigate("/");
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={index}
                value={link}
                onClick={() => handleDeleteLink(link)}
              />
            ))}

            <NoteItem
              $isnew
              placeholder="Novo link"
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleNewLink}
              value={newLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              <NoteItem
                $isnew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                onClick={handleNewTag}
                value={newTag}
              />

              {tags.map((tag, index) => (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => handleDeleteTag(tag)}
                />
              ))}
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
