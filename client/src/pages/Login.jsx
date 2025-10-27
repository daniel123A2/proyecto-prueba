import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await loginUser({ email, password });
    setLoading(false);
    if (res.error) setError(res.error);
    else {
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    }
  };

  return (
    <div className='container'>
      <h2 className='text-2xl mb-4'>Iniciar sesión</h2>
      {error && <p className='text-red-400'>{error}</p>}
      <form onSubmit={handleLogin} className='flex flex-col gap-2 max-w-md'>
        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='p-2 rounded text-black' required/>
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Contraseña' className='p-2 rounded text-black' required/>
        <button 
          type='submit' 
          className='glow-on-hover bg-indigo-600 text-white p-2 rounded' 
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
      <p className='mt-4'>¿No tienes cuenta? <a href='/register' className='text-indigo-300'>Regístrate</a></p>
    </div>
  );
}
