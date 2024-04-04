    import React, { useState } from 'react';
    import { Modal, Box, TextField, Button, Typography } from '@mui/material';
    import axios from 'axios';

    function HeroVsHeroModal({ open, onClose }) {
        const [heroId, setHeroId] = useState('');
        const [anotherHeroId, setAnotherHeroId] = useState('');
        const [comparisonResult, setComparisonResult] = useState(null);
        const [openResultModal, setOpenResultModal] = useState(false); // Estado para controlar a abertura do modal de resultados

        const handleCloseResultModal = () => {
            setOpenResultModal(false);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            axios.get(`http://localhost:8080/heroes/compare/${heroId}/${anotherHeroId}`)
                .then(response => {
                    console.log('Comparison Result:', response.data);
                    // Define os dados da comparação
                    setComparisonResult(response.data);
                    // Abre o modal de resultados
                    setOpenResultModal(true);
                    // Fecha o modal de comparação de heróis
                    onClose();
                })
                .catch(error => {
                    console.error('Error comparing heroes:', error);
                    // Tratar o erro conforme necessário
                });
        };

        return (
            <>
                <Modal
                    open={open}
                    onClose={onClose}
                    aria-labelledby="hero-vs-hero-modal-title"
                    aria-describedby="hero-vs-hero-modal-description"
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
                        <Typography variant="h5" id="hero-vs-hero-modal-title" sx={{ mb: 2 }}>
                            Hero VS Hero
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Hero ID"
                                value={heroId}
                                onChange={(event) => setHeroId(event.target.value)}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Another Hero ID"
                                value={anotherHeroId}
                                onChange={(event) => setAnotherHeroId(event.target.value)}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Modal>

                {/* Modal para mostrar os resultados da comparação */}
                <Modal
                    open={openResultModal}
                    onClose={handleCloseResultModal}
                    aria-labelledby="comparison-result-modal-title"
                    aria-describedby="comparison-result-modal-description"
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
                        <Typography variant="h5" id="comparison-result-modal-title" sx={{ mb: 2 }}>
                            Comparison Result
                        </Typography>
                        {comparisonResult && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Hero 1
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>ID:</span> {comparisonResult.hero.id}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>Name:</span> {comparisonResult.hero.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>Strength:</span> {comparisonResult.hero.powerStats.strength}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>Agility:</span> {comparisonResult.hero.powerStats.agility}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>Dexterity:</span> {comparisonResult.hero.powerStats.dexterity}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <span style={{ color: 'blue' }}>Intelligence:</span> {comparisonResult.hero.powerStats.intelligence}
                                </Typography>

                                <Box sx={{ mt: 2, borderTop: '1px solid #ccc', paddingTop: '8px' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Hero 2
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>ID:</span> {comparisonResult.anotherHero.id}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>Name:</span> {comparisonResult.anotherHero.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>Strength:</span> {comparisonResult.anotherHero.powerStats.strength}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>Agility:</span> {comparisonResult.anotherHero.powerStats.agility}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>Dexterity:</span> {comparisonResult.anotherHero.powerStats.dexterity}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <span style={{ color: 'green' }}>Intelligence:</span> {comparisonResult.anotherHero.powerStats.intelligence}
                                    </Typography>
                                </Box>

                                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                                    <span style={{ color: 'purple' }}>Details:</span>
                                </Typography>
                                <ul style={{fontSize: '15px'}}>
                                    {comparisonResult.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}

                    </Box>
                </Modal>
            </>
        );
    }

    export default HeroVsHeroModal;
