import React, { useState } from "react";
import { socket } from "./utils/socketClient";
import { usePollsData } from "./hooks/usePollsData";
import PollList from "./components/PollList";
import PollDetail from "./components/PollDetail";
import PollForm from "./components/PollForm";
import styles from "./styles/App.module.css";

function App() {
  const { polls, loading, error, loadPolls, handleDeletePoll } =
    usePollsData();
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [editingPollId, setEditingPollId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Editar enquete
  const handleEditPoll = (pollId) => {
    setEditingPollId(pollId);
    setShowForm(true);
  };

  // Criar nova enquete
  const handleCreatePoll = () => {
    setEditingPollId(null);
    setShowForm(true);
  };

  // Clicar em enquete para votar
  const handlePollClick = (pollId) => {
    setSelectedPollId(pollId);
  };

  // Voltar da tela de detalhes
  const handleBackToPollList = () => {
    setSelectedPollId(null);
    loadPolls(); // Recarrega enquetes para atualizar votos
  };

  // Sucesso ao salvar formulário
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPollId(null);
    loadPolls();
  };

  // Cancelar formulário
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPollId(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1>Sistema de Votação</h1>
        <p>Carregando enquetes...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Sistema de Votação</h1>
      {error && <p className={styles.error}>{error}</p>}

      {showForm ? (
        <PollForm
          pollId={editingPollId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : selectedPollId ? (
        <PollDetail
          pollId={selectedPollId}
          onBack={handleBackToPollList}
          socket={socket}
        />
      ) : (
        <PollList
          polls={polls}
          onPollClick={handlePollClick}
          onDeletePoll={handleDeletePoll}
          onEditPoll={handleEditPoll}
          onCreatePoll={handleCreatePoll}
        />
      )}
    </div>
  );
}

export default App;
