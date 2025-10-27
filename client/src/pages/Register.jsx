import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await registerUser({ nombre, email, password });
    setLoading(false);
    if (res.error) setError(res.error);
    else {
      alert('Registro exitoso, ahora inicia sesión');
      navigate('/login');
    }
  };

  return (
    <div className='container'>
      <h2 className='text-2xl mb-4'>Crear cuenta</h2>
      {error && <p className='text-red-400'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 max-w-md'>
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder='Nombre' className='p-2 rounded text-black' required/>
        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='p-2 rounded text-black' required/>
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Contraseña' className='p-2 rounded text-black' required/>
        <button type='submit' className='glow-on-hover bg-indigo-600 text-white p-2 rounded' disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className='mt-4'>¿Ya tienes cuenta? <a href='/login' className='text-indigo-300'>Inicia sesión</a></p>
    </div>
  );
}
