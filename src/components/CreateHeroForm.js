import React, { useState } from 'react';
import { Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Snackbar } from '@mui/material';
import axios from 'axios';

function CreateHeroForm({ open, onClose }) {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [strength, setStrength] = useState('');
  const [agility, setAgility] = useState('');
  const [dexterity, setDexterity] = useState('');
  const [intelligence, setIntelligence] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHero = {
      name: name,
      race: race,
      power_stats: {
        strength: Number(strength),
        agility: Number(agility),
        dexterity: Number(dexterity),
        intelligence: Number(intelligence),
      },
    };
    axios
      .post('http://localhost:8080/heroes', newHero)
      .then((response) => {
        console.log('New hero created:', response.data);
        setSnackbarSeverity('success');
        setSnackbarMessage('Hero created successfully.');
        setSnackbarOpen(true);
        onClose();
        // Aguarde 1 segundo antes de recarregar a página
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error creating hero:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error creating hero. Please try again.');
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="create-hero-modal-title"
        aria-describedby="create-hero-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="create-hero-modal-title">Create Hero</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth required sx={{ mt: 2 }}>
              <InputLabel>Race</InputLabel>
              <Select
                value={race}
                onChange={(event) => setRace(event.target.value)}
              >
                <MenuItem value="HUMAN">Human</MenuItem>
                <MenuItem value="ALIEN">Alien</MenuItem>
                <MenuItem value="DIVINE">Divine</MenuItem>
                <MenuItem value="CYBORG">Cyborg</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Strength"
              type="number"
              value={strength}
              onChange={(event) => setStrength(event.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <TextField
              label="Agility"
              type="number"
              value={agility}
              onChange={(event) => setAgility(event.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <TextField
              label="Dexterity"
              type="number"
              value={dexterity}
              onChange={(event) => setDexterity(event.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <TextField
              label="Intelligence"
              type="number"
              value={intelligence}
              onChange={(event) => setIntelligence(event.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Create Hero</Button>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{ width: '100%' }}
        severity={snackbarSeverity === 'success' ? 'success' : 'error'} 
      />
    </>
  );
}   

export default CreateHeroForm;
