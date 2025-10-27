import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    }

    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(Array.isArray(data) ? data : []);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!title) return;
    if (editId) {
      await updateNote(editId, { title, content });
      setEditId(null);
    } else {
      await createNote({ title, content });
    }
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar nota?')) return;
    await deleteNote(id);
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Block personal</h2>
        <div className="flex items-center gap-2">
          {user && <span>Hola, {user.nombre}</span>}

          {/* Botón para editar perfil */}
          <button
            onClick={() => navigate('/profile')}
            className="glow-on-hover bg-blue-600 px-3 py-1 rounded"
          >
            Editar Perfil
          </button>

          {/* Botón cerrar sesión */}
          <button
            onClick={handleLogout}
            className="glow-on-hover bg-red-500 px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Formulario notas */}
      <form onSubmit={handleCreateOrUpdate} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="p-2 rounded text-black"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido"
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="glow-on-hover bg-green-600 px-3 py-1 rounded"
        >
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setTitle('');
              setContent('');
            }}
            className="glow-on-hover bg-gray-500 px-3 py-1 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de notas */}
      <div>
        {notes.length === 0 ? (
          <p>No tienes notas.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {notes.map((n) => (
              <li
                key={n._id}
                className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <strong>{n.title}</strong>
                <p>{n.content}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(n)}
                    className="glow-on-hover bg-yellow-500 px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="glow-on-hover bg-red-500 px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
