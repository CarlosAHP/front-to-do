import React, { useState } from "react";
import axios from "axios";
import "./TaskManagement.css";

export default function TaskManagementForm() {
  const [taskFormData, setTaskFormData] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media",
    categoria: "",
  });

  const [editing, setEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData({
      ...taskFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing && selectedTaskId) {
        await axios.put(`http://localhost:3000/api/tareas/${selectedTaskId}`, taskFormData);
        setSuccessMessage("Tarea editada correctamente.");
      } else {
        await axios.post("http://localhost:3000/api/tareas", taskFormData);
        setSuccessMessage("Tarea registrada correctamente.");
      }
      setTaskFormData({ titulo: "", descripcion: "", prioridad: "media", categoria: "" });
      setEditing(false);
    } catch (error) {
      setErrorMessage("Error al procesar la solicitud. Intenta nuevamente.");
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <div className="task-management-form__container">
      <div className="task-management-form__form-wrapper">
        <h2 className="task-management-form__title">{editing ? "Editar Tarea" : "Registrar Nueva Tarea"}</h2>
        <form onSubmit={handleSubmit} className="task-management-form__form">
          <div className="task-management-form__form-group">
            <label htmlFor="titulo" className="task-management-form__label">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="task-management-form__input"
              value={taskFormData.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="task-management-form__form-group">
            <label htmlFor="descripcion" className="task-management-form__label">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="task-management-form__input"
              value={taskFormData.descripcion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="task-management-form__form-group">
            <label htmlFor="prioridad" className="task-management-form__label">Prioridad *</label>
            <select
              id="prioridad"
              name="prioridad"
              className="task-management-form__input"
              value={taskFormData.prioridad}
              onChange={handleInputChange}
              required
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="task-management-form__form-group">
            <label htmlFor="categoria" className="task-management-form__label">Categoría *</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              className="task-management-form__input"
              value={taskFormData.categoria}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="task-management-form__btn btn btn-primary mt-3">
            {editing ? "Editar Tarea" : "Registrar Tarea"}
          </button>
          {successMessage && <p className="task-management-form__success-message text-success">{successMessage}</p>}
          {errorMessage && <p className="task-management-form__error-message text-danger">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
