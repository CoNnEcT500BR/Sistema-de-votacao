import React from "react";
import styles from "../styles/ConfirmationModal.module.css";

function ConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  isDanger = false,
}) {
  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationModal}>
        <h3 className={isDanger ? styles.titleDanger : ""}>{title}</h3>
        <p>{message}</p>
        <div className={styles.confirmationButtons}>
          <button
            className={`${styles.btnConfirm} ${isDanger ? styles.btnDanger : ""}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : confirmText}
          </button>
          <button
            className={styles.btnCancel}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
