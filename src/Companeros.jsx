import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { agregar, editar, eliminar } from "./companerosSlice.js";

export default function Companeros() {
  const registros = useSelector((state) => state.companeros.value);
  const companeros = registros.filter((registro) => !registro.eliminado);
  const dispatch = useDispatch();
  const campoNombre = useRef(null);
  const [idEditado, setIdEditado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  function limpiarFormulario() {
    setIdEditado(null);
    setNombre("");
    setGrupo("");
    setError("");
  }

  function guardar(event) {
    event.preventDefault();
    const datos = { nombre: nombre.trim(), grupo: grupo.trim() };
    if (!datos.nombre || !datos.grupo) {
      setError("Escribe el nombre y el grupo.");
      setMensaje("");
      return;
    }

    if (idEditado === null) {
      dispatch(agregar(datos));
      setMensaje("Compañero agregado.");
    } else {
      dispatch(editar({ id: idEditado, ...datos }));
      setMensaje("Cambios guardados.");
    }
    limpiarFormulario();
  }

  function iniciarEdicion(registro) {
    setIdEditado(registro.id);
    setNombre(registro.nombre);
    setGrupo(registro.grupo);
    setError("");
    setMensaje("");
    campoNombre.current?.focus();
  }

  function darDeBaja(registro) {
    if (!window.confirm(`¿Dar de baja a ${registro.nombre}?`)) return;
    dispatch(eliminar(registro.id));
    if (idEditado === registro.id) limpiarFormulario();
    setMensaje("Compañero dado de baja.");
  }

  return (
    <main className="card">
      <h1>Compañeros de clase</h1>
      <form className="rows" onSubmit={guardar}>
        <label>
          Nombre{" "}
          <input ref={campoNombre} value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <label>
          Grupo{" "}
          <input value={grupo} onChange={(e) => setGrupo(e.target.value)} required />
        </label>
        <button type="submit">{idEditado === null ? "Agregar" : "Guardar cambios"}</button>
        {idEditado !== null && (
          <button type="button" onClick={limpiarFormulario}>Cancelar edición</button>
        )}
      </form>
      {error && <p role="alert">{error}</p>}
      <div role="status">{mensaje}</div>
      {companeros.length === 0 ? (
        <p>No hay compañeros de clase activos.</p>
      ) : (
        <table className="companeros">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Grupo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companeros.map((companero) => (
              <tr key={companero.id}>
                <td>{companero.nombre}</td>
                <td>{companero.grupo}</td>
                <td>
                  <button type="button" onClick={() => iniciarEdicion(companero)} aria-label={`Editar a ${companero.nombre}`}>
                    Editar
                  </button>{" "}
                  <button type="button" onClick={() => darDeBaja(companero)} aria-label={`Dar de baja a ${companero.nombre}`}>
                    Dar de baja
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
