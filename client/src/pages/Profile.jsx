import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({ nombre: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser({ ...data, password: '' });
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = await updateUserProfile(user);
    if (!updated.error) {
      alert('Perfil actualizado correctamente');
      setEditing(false);
      setUser({ ...updated, password: '' });
    } else {
      alert('Error al actualizar perfil');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h2 className="text-2xl mb-4">Mi Perfil</h2>

      {!editing ? (
        <div>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={() => setEditing(true)}
            className="glow-on-hover bg-yellow-500 px-3 py-1 rounded mt-4"
          >
            Editar
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-2 max-w-md mt-2">
          <input
            value={user.nombre}
            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
            className="p-2 rounded text-black"
            placeholder="Nombre"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-2 rounded text-black"
            placeholder="Correo"
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-2 rounded text-black"
            placeholder="Nueva contraseña (opcional)"
          />
          <div className="flex gap-2">
            <button type="submit" className="glow-on-hover bg-green-600 px-3 py-1 rounded">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="glow-on-hover bg-gray-500 px-3 py-1 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
