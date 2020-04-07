import React, { useEffect, useState } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api
      .get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
    const repositoryCount = repositories.length + 1

    api
      .post('repositories', {
        "title": `Repository ${repositoryCount}`,
        "url": "https://github.com",
        "techs": []
      })
      .then(response => {
        setRepositories([...repositories, response.data])
      })
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(response => {
        const repos = repositories.filter(repo => repo.id !== id)
        setRepositories(repos)
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
