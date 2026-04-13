import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const doLogin = () => {
    if (user === 'vantage' && pass === 'pr0t0typ3!') {
      onLogin();
    } else {
      setError('Invalid credentials');
      setShake(true);
      setTimeout(() => { setError(''); setShake(false); }, 1800);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') doLogin(); };

  return (
    <Box sx={{
      position: 'fixed', inset: 0, background: '#1E3A5F',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999,
    }}>
      <Paper elevation={24} sx={{
        borderRadius: '14px', p: '40px 44px', width: 380, maxWidth: '92vw',
        ...(shake && { animation: 'shake 0.3s ease' }),
      }}>
        <Typography variant="body1" sx={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', mb: '4px' }}>
          Vantage <Box component="span" sx={{ color: '#F97316' }}>Creative Studio</Box>
        </Typography>
        <Typography sx={{ fontSize: 12, color: '#6B7B8D', mb: '10px' }}>
          Vantage · Creative Studio · Demo
        </Typography>
        <Box sx={{
          display: 'inline-block', background: '#EDF1F5', color: '#6B7B8D',
          fontSize: 10, fontWeight: 600, px: '9px', py: '3px', borderRadius: '4px', mb: '22px',
        }}>
          Prototype v1.0
        </Box>

        <Box component="label" sx={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '0.5px', mb: '5px' }}>
          Username
        </Box>
        <Box
          component="input"
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={user}
          onChange={e => setUser(e.target.value)}
          onKeyDown={handleKey}
          sx={{
            width: '100%', p: '9px 12px', fontSize: 13, fontFamily: "Calibri, 'Segoe UI', sans-serif",
            border: error ? '1px solid #E53935' : '1px solid #DDE3EA',
            background: error ? '#FFEBEE' : '#fff',
            borderRadius: '7px', color: '#1E3A5F', mb: '14px', outline: 'none',
            transition: 'border-color 0.15s',
            '&:focus': { borderColor: '#1E3A5F' },
            display: 'block',
          }}
        />

        <Box component="label" sx={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '0.5px', mb: '5px' }}>
          Password
        </Box>
        <Box
          component="input"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={handleKey}
          sx={{
            width: '100%', p: '9px 12px', fontSize: 13, fontFamily: "Calibri, 'Segoe UI', sans-serif",
            border: error ? '1px solid #E53935' : '1px solid #DDE3EA',
            background: error ? '#FFEBEE' : '#fff',
            borderRadius: '7px', color: '#1E3A5F', mb: '14px', outline: 'none',
            transition: 'border-color 0.15s',
            '&:focus': { borderColor: '#1E3A5F' },
            display: 'block',
          }}
        />

        <Box
          component="button"
          onClick={doLogin}
          sx={{
            width: '100%', p: '10px', fontSize: 13, fontWeight: 700,
            fontFamily: "Calibri, 'Segoe UI', sans-serif",
            background: '#1E3A5F', color: '#fff', border: 'none', borderRadius: '7px',
            cursor: 'pointer', transition: 'background 0.15s', mt: '4px',
            '&:hover': { background: '#162e4a' },
          }}
        >
          Sign In →
        </Box>

        <Typography sx={{ fontSize: 12, color: '#E53935', mt: '10px', minHeight: '18px', textAlign: 'center' }}>
          {error}
        </Typography>
      </Paper>
    </Box>
  );
}
