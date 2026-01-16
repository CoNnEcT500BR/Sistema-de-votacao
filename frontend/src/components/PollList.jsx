import React, { useState } from "react";
import styles from "../styles/PollList.module.css";
import ConfirmationModal from "./ConfirmationModal";

function PollList({
  polls,
  onPollClick,
  onDeletePoll,
  onEditPoll,
  onCreatePoll,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Determina o status de uma enquete
  const getPollStatus = (poll) => {
    const now = new Date();
    const startDate = new Date(poll.startDate);
    const endDate = new Date(poll.endDate);

    if (now < startDate) return "não-iniciada";
    if (now > endDate) return "finalizada";
    return "em-andamento";
  };

  // Filtra enquetes por status
  const filteredPolls = polls.filter((poll) => {
    if (filterStatus === "all") return true;
    return getPollStatus(poll) === filterStatus;
  });

  // Formata data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Retorna badge com cor baseado no status
  const getStatusBadge = (status) => {
    const statusMap = {
      "não-iniciada": { label: "Não Iniciada", color: "gray" },
      "em-andamento": { label: "Em Andamento", color: "green" },
      finalizada: { label: "Finalizada", color: "red" },
    };
    const statusInfo = statusMap[status] || statusMap["não-iniciada"];
    return (
      <span
        className={`${styles.badge} ${styles[`badge-${statusInfo.color}`]}`}
      >
        {statusInfo.label}
      </span>
    );
  };

  // Abre o modal de confirmação de exclusão
  const handleDeleteClick = (e, pollId) => {
    e.stopPropagation();
    setPollToDelete(pollId);
    setShowDeleteConfirmation(true);
  };

  // Confirma a exclusão
  const handleConfirmDelete = () => {
    if (pollToDelete) {
      setIsDeleting(true);
      onDeletePoll?.(pollToDelete);
      setShowDeleteConfirmation(false);
      setPollToDelete(null);
      setIsDeleting(false);
    }
  };

  // Cancela a exclusão
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPollToDelete(null);
  };

  return (
    <div className={styles.pollListContainer}>
      <div className={styles.header}>
        <h2>Enquetes</h2>
        <button className={styles.btnNew} onClick={() => onCreatePoll?.()}>
          + Nova Enquete
        </button>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${
            filterStatus === "all" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("all")}
        >
          Todas
        </button>
        <button
          className={`${styles.filterBtn} ${
            filterStatus === "não-iniciada" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("não-iniciada")}
        >
          Não Iniciadas
        </button>
        <button
          className={`${styles.filterBtn} ${
            filterStatus === "em-andamento" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("em-andamento")}
        >
          Em Andamento
        </button>
        <button
          className={`${styles.filterBtn} ${
            filterStatus === "finalizada" ? styles.active : ""
          }`}
          onClick={() => setFilterStatus("finalizada")}
        >
          Finalizadas
        </button>
      </div>

      {/* Lista de Enquetes */}
      <div className={styles.pollsList}>
        {filteredPolls.length === 0 ? (
          <p className={styles.noPollsMessage}>
            Nenhuma enquete encontrada neste filtro.
          </p>
        ) : (
          filteredPolls.map((poll) => (
            <div
              key={poll.id}
              className={styles.pollCard}
              onClick={() => onPollClick?.(poll.id)}
            >
              <div className={styles.pollCardContent}>
                <div className={styles.pollInfo}>
                  <h3>{poll.title}</h3>
                  <div className={styles.dateInfo}>
                    <p>
                      <strong>Início:</strong> {formatDate(poll.startDate)}
                    </p>
                    <p>
                      <strong>Término:</strong> {formatDate(poll.endDate)}
                    </p>
                  </div>
                  <div className={styles.optionsCount}>
                    <p>
                      <strong>{poll.Options?.length || 0} opções</strong>
                    </p>
                  </div>
                </div>

                <div className={styles.statusContainer}>
                  {getStatusBadge(getPollStatus(poll))}
                </div>
              </div>

              <div className={styles.pollActions}>
                <button
                  className={`${styles.actionBtn} ${styles.btnVote}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPollClick?.(poll.id);
                  }}
                  disabled={getPollStatus(poll) !== "em-andamento"}
                >
                  Votar
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.btnEdit}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPoll?.(poll.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.btnDelete}`}
                  onClick={(e) => handleDeleteClick(e, poll.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Deletar Enquete"
          message="Tem certeza que deseja deletar esta enquete? Esta ação não pode ser desfeita."
          confirmText="Deletar"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={isDeleting}
          isDanger={true}
        />
      )}
    </div>
  );
}

export default PollList;
