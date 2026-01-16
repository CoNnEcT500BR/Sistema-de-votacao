import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import axios from "axios";
import PollList from "./components/PollList";
import PollDetail from "./components/PollDetail";
import PollForm from "./components/PollForm";
import styles from "./styles/App.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SOCKET_URL =
  import.meta.env.VITE_API_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL);

function App() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [editingPollId, setEditingPollId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Carregar enquetes
  const loadPolls = useCallback(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/polls`)
      .then((res) => {
        setPolls(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao carregar polls:", err);
        setError("Erro ao carregar enquetes");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Carrega enquetes na primeira renderização
    let isMounted = true;

    const fetchPolls = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/polls`);
        if (isMounted) {
          setPolls(res.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Erro ao carregar polls:", err);
          setError("Erro ao carregar enquetes");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPolls();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Listener para atualizações de enquetes
    socket.on("pollsUpdated", () => {
      loadPolls();
    });

    return () => socket.off("pollsUpdated");
  }, [loadPolls]);

  useEffect(() => {
    // Listener para votos em realtime
    socket.on("updateVotes", (data) => {
      console.log("Votos atualizados:", data);
      loadPolls();
    });

    return () => socket.off("updateVotes");
  }, [loadPolls]);

  // Deletar enquete
  const handleDeletePoll = (pollId) => {
    axios
      .delete(`${API_URL}/api/polls/${pollId}`)
      .then(() => {
        loadPolls();
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao deletar enquete:", err);
        setError("Erro ao deletar enquete");
      });
  };

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
