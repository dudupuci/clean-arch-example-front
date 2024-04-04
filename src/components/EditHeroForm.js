import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Snackbar } from '@mui/material';
import axios from 'axios';

function EditHeroForm({ open, onClose, onSubmit, hero }) {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [powerStats, setPowerStats] = useState({
        strength: '',
        agility: '',
        dexterity: '',
        intelligence: ''
    });
    const [enabled, setEnabled] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (hero) {
            console.log("Hero being edited:", hero);
            setName(hero.name);
            setRace(hero.race);
            setPowerStats({
                strength: hero.power_stats?.strength || '',
                agility: hero.power_stats?.agility || '',
                dexterity: hero.power_stats?.dexterity || '',
                intelligence: hero.power_stats?.intelligence || ''
            });
            setEnabled(hero.enabled);
        }
    }, [hero]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedHero = {
            id: hero.id,
            name: name,
            race: race,
            strength: Number(powerStats.strength),
            agility: Number(powerStats.agility),
            dexterity: Number(powerStats.dexterity),
            intelligence: Number(powerStats.intelligence),
            enabled: enabled
        };
        axios
            .put(`http://localhost:8080/heroes/${updatedHero.id}`, updatedHero)
            .then((response) => {
                console.log('Hero updated:', response.data);
                setSnackbarSeverity('success');
                setSnackbarMessage('Hero updated successfully.');
                setSnackbarOpen(true);
                onClose();
                onSubmit(updatedHero);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                console.error('Error updating hero:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('Error updating hero. Please try again.');
                setSnackbarOpen(true);
            });
    };


    if (!hero) {
        return null;
    }

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
                    <FormControl fullWidth sx={{ mt: 2 }}>
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
                        onChange={(event) => setPowerStats({ ...powerStats, strength: event.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Agility"
                        type="number"
                        value={powerStats.agility}
                        onChange={(event) => setPowerStats({ ...powerStats, agility: event.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Dexterity"
                        type="number"
                        value={powerStats.dexterity}
                        onChange={(event) => setPowerStats({ ...powerStats, dexterity: event.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Intelligence"
                        type="number"
                        value={powerStats.intelligence}
                        onChange={(event) => setPowerStats({ ...powerStats, intelligence: event.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
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
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    sx={{ width: '100%' }}
                    severity={snackbarSeverity}
                />
            </Box>
        </Modal>
    );
}

export default EditHeroForm;
