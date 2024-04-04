import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button, IconButton, Typography, Snackbar } from '@mui/material';
import CreateHeroForm from './CreateHeroForm';
import EditHeroForm from './EditHeroForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HeroesTable() {
    const [heroes, setHeroes] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedHero, setSelectedHero] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // Fetch hero data from the backend
        axios
            .get('http://localhost:8080/heroes')
            .then((response) => {
                setHeroes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching heroes:', error);
            });
    }, []);

    const handleEditClick = (hero) => {
        setSelectedHero(hero);
        setOpenEditModal(true);
    };

    const handleDeleteClick = (hero) => {
        setSelectedHero(hero);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Make DELETE request to delete the hero
        axios
            .delete(`http://localhost:8080/heroes/${selectedHero.id}`)
            .then(() => {
                setHeroes(heroes.filter(hero => hero.id !== selectedHero.id));
                setSnackbarMessage('Heroi deletado com sucesso');
                setSnackbarOpen(true);
                setDeleteConfirmationOpen(false);
            })
            .catch((error) => {
                console.error('Error deleting hero:', error);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Race</TableCell>
                            <TableCell align="right">Strength</TableCell>
                            <TableCell align="right">Agility</TableCell>
                            <TableCell align="right">Dexterity</TableCell>
                            <TableCell align="right">Intelligence</TableCell>
                            <TableCell align="right">Is Active</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {heroes.map((hero, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {hero.id}
                                </TableCell>
                                <TableCell align="right">{hero.name}</TableCell>
                                <TableCell align="right">{hero.race}</TableCell>
                                <TableCell align="right">{hero.power_stats.strength}</TableCell>
                                <TableCell align="right">{hero.power_stats.agility}</TableCell>
                                <TableCell align="right">{hero.power_stats.dexterity}</TableCell>
                                <TableCell align="right">{hero.power_stats.intelligence}</TableCell>
                                <TableCell align="right">{hero.enabled ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditClick(hero)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(hero)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openEditModal && (
                <EditHeroForm
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    hero={selectedHero}
                    onSubmit={(updatedHero) => {
                        console.log('Updated Hero:', updatedHero);
                        // Aqui você pode enviar os dados atualizados para o backend
                    }}
                />
            )}

            <Modal
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                aria-labelledby="delete-hero-modal-title"
                aria-describedby="delete-hero-modal-description"
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
                    <Typography variant="h5" id="delete-hero-modal-title">
                        Delete Hero
                    </Typography>
                    <Typography variant="body1" id="delete-hero-modal-description">
                        Are you sure you want to delete the hero{' '}
                        <span style={{ fontWeight: 'bold' }}>{selectedHero && selectedHero.name}</span>?
                    </Typography>

                    <Button variant="contained" color="primary" onClick={handleDeleteConfirm} sx={{ mt: 2 }}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setDeleteConfirmationOpen(false)} sx={{ mt: 2, ml: 2 }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
}
