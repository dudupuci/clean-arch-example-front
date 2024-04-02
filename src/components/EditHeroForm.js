import React, { useState } from 'react';
import { Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

function EditHeroForm({ open, onClose, onSubmit, hero }) {
  const [name, setName] = useState(hero?.name ?? '');
  const [race, setRace] = useState(hero?.race ?? '');
  const [powerStats, setPowerStats] = useState(hero?.powerStatsOutput ?? {
    strength: '',
    agility: '',
    dexterity: '',
    intelligence: ''
  });
  const [enabled, setEnabled] = useState(hero?.enabled ?? true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedHero = {
      ...hero,
      name: name,
      race: race,
      powerStatsOutput: {
        ...powerStats
      },
      enabled: enabled
    };
    onSubmit(updatedHero);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-hero-modal-title"
      aria-describedby="edit-hero-modal-description"
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
        <h2 id="edit-hero-modal-title">Edit Hero</h2>
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
            value={powerStats.strength}
            onChange={(event) => setPowerStats({...powerStats, strength: event.target.value})}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Agility"
            type="number"
            value={powerStats.agility}
            onChange={(event) => setPowerStats({...powerStats, agility: event.target.value})}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Dexterity"
            type="number"
            value={powerStats.dexterity}
            onChange={(event) => setPowerStats({...powerStats, dexterity: event.target.value})}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Intelligence"
            type="number"
            value={powerStats.intelligence}
            onChange={(event) => setPowerStats({...powerStats, intelligence: event.target.value})}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth required sx={{ mt: 2 }}>
            <InputLabel>Is Active</InputLabel>
            <Select
              value={enabled}
              onChange={(event) => setEnabled(event.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditHeroForm;
