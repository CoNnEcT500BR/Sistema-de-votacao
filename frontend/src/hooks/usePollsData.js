import { useEffect, useState, useCallback } from "react";
import { pollAPI } from "../utils/pollAPI";
import { socketListeners } from "../utils/socketClient";

export const usePollsData = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar enquetes
  const loadPolls = useCallback(() => {
    setLoading(true);
    pollAPI
      .getAll()
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

  // Carregar enquetes na primeira renderização
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPolls();
  }, [loadPolls]);

  // Listener para atualizações de enquetes
  useEffect(() => {
    socketListeners.setupPollsUpdatedListener(() => {
      loadPolls();
    });

    return () => socketListeners.cleanupPollsUpdatedListener();
  }, [loadPolls]);

  // Listener para votos em realtime
  useEffect(() => {
    socketListeners.setupVotesUpdatedListener((data) => {
      console.log("Votos atualizados:", data);
      loadPolls();
    });

    return () => socketListeners.cleanupVotesUpdatedListener();
  }, [loadPolls]);

  // Deletar enquete
  const handleDeletePoll = useCallback(
    (pollId) => {
      pollAPI
        .delete(pollId)
        .then(() => {
          loadPolls();
          setError(null);
        })
        .catch((err) => {
          console.error("Erro ao deletar enquete:", err);
          setError("Erro ao deletar enquete");
        });
    },
    [loadPolls]
  );

  return {
    polls,
    loading,
    error,
    setError,
    loadPolls,
    handleDeletePoll,
  };
};
