import React, { useEffect, useState, useCallback } from "react";
import { pollAPI } from "../utils/pollAPI";
import styles from "../styles/PollForm.module.css";

function PollForm({ pollId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    options: ["", "", ""],
  });
  const [loading, setLoading] = useState(!!pollId);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Formata data para input type="datetime-local"
  const formatDateInput = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }, []);

  // Carregar dados da enquete se for edição
  useEffect(() => {
    const controller = new AbortController();

    if (pollId) {
      pollAPI
        .getById(pollId)
        .then((res) => {
          const poll = res.data;
          setFormData({
            title: poll.title,
            startDate: formatDateInput(poll.startDate),
            endDate: formatDateInput(poll.endDate),
            options: poll.Options.map((opt) => opt.text),
          });
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") {
            console.error("Erro ao carregar enquete:", err);
            setError("Erro ao carregar enquete para edição");
            setLoading(false);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [pollId, formatDateInput]);

  // Manipula mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  // Manipula mudanças nas opções
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
    if (error) setError(null);
  };

  // Adiciona nova opção
  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  // Remove opção
  const removeOption = (index) => {
    if (formData.options.length > 3) {
      setFormData((prev) => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    } else {
      setError("Mínimo de 3 opções é obrigatório");
    }
  };

  // Drag and Drop
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newOptions = [...formData.options];
    const draggedItem = newOptions[draggedIndex];

    // Remove o item arrastado
    newOptions.splice(draggedIndex, 1);
    // Insere na nova posição
    newOptions.splice(targetIndex, 0, draggedItem);

    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
    setDraggedIndex(null);
  };

  // Validações
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Título é obrigatório");
      return false;
    }
    if (!formData.startDate) {
      setError("Data de início é obrigatória");
      return false;
    }
    if (!formData.endDate) {
      setError("Data de término é obrigatória");
      return false;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("Data de início deve ser anterior à data de término");
      return false;
    }
    if (formData.options.length < 3) {
      setError("Mínimo de 3 opções é obrigatório");
      return false;
    }
    const emptyOptions = formData.options.filter((opt) => !opt.trim());
    if (emptyOptions.length > 0) {
      setError("Todas as opções devem ser preenchidas");
      return false;
    }
    return true;
  };

  // Envia formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setSubmitted(true);

    const payload = {
      title: formData.title,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      options: formData.options,
    };

    let request;
    if (pollId) {
      // Editar enquete
      request = pollAPI.update(pollId, payload);
    } else {
      // Criar nova enquete
      request = pollAPI.create(payload);
    }

    request
      .then(() => {
        console.log("Enquete salva com sucesso!");
        setSubmitted(false);
        onSuccess?.();
      })
      .catch((err) => {
        console.error("Erro ao salvar enquete:", err);
        setError(err.response?.data?.message || "Erro ao salvar enquete");
        setSubmitted(false);
      });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.btnBack} onClick={onCancel}>
        ← Cancelar
      </button>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>{pollId ? "Editar Enquete" : "Nova Enquete"}</h2>

        {error && <p className={styles.error}>{error}</p>}

        {/* Campo Título */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Título da Enquete *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ex: Qual é sua linguagem favorita?"
            disabled={submitted}
          />
        </div>

        {/* Datas */}
        <div className={styles.datesContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">Data de Início *</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              disabled={submitted}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endDate">Data de Término *</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              disabled={submitted}
            />
          </div>
        </div>

        {/* Opções */}
        <div className={styles.optionsSection}>
          <div className={styles.optionsHeader}>
            <h3>Opções de Resposta *</h3>
            <p className={styles.hint}>
              Mínimo 3 opções • Arraste para reordenar
            </p>
          </div>

          <div className={styles.optionsList}>
            {formData.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.optionInputGroup} ${
                  draggedIndex === index ? styles.dragging : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <div className={styles.dragHandle}>⋮⋮</div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                  disabled={submitted}
                />
                {formData.options.length > 3 && (
                  <button
                    type="button"
                    className={styles.btnRemoveOption}
                    onClick={() => removeOption(index)}
                    disabled={submitted}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.btnAddOption}
            onClick={addOption}
            disabled={submitted}
          >
            + Adicionar Opção
          </button>
        </div>

        {/* Botões de Ação */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={onCancel}
            disabled={submitted}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={submitted}
          >
            {submitted ? "Salvando..." : pollId ? "Atualizar" : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PollForm;
