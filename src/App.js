import React, { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CreateHeroForm from './components/CreateHeroForm';
import HeroesTable from './components/HeroesTable';

import HeroComparisonModal from './components/HeroVsHeroModal'; // Importe o modal de resultados de comparação

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openComparisonModal, setOpenComparisonModal] = useState(false); // Estado para controlar a abertura do modal de comparação
  const [comparisonResult, setComparisonResult] = useState(null); // Estado para armazenar os resultados da comparação

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenComparisonModal = () => {
    setOpenComparisonModal(true);
  };

  const handleCloseComparisonModal = () => {
    setOpenComparisonModal(false);
  };

  const handleCreateHero = (newHero) => {
    console.log(newHero);
  };

  // Função para receber os resultados da comparação e atualizar o estado
  const handleComparisonResult = (result) => {
    setComparisonResult(result); // Define os dados da comparação no estado
    setOpenComparisonModal(false); // Fecha o modal de comparação de heróis
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Heroes Application v1.0.0
          </Typography>
          <Button color="inherit" onClick={handleOpenCreateModal}>Create Hero</Button>
          {/* Botão "Hero vs Hero" ao lado do botão "Create Hero" */}
          <Button color="inherit" onClick={handleOpenComparisonModal}>Hero VS Hero</Button>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <HeroesTable />
      </Box>
      <CreateHeroForm open={openCreateModal} onClose={handleCloseCreateModal} onSubmit={handleCreateHero} />
      {/* Modal para comparar heróis */}
      <HeroComparisonModal open={openComparisonModal} onClose={handleCloseComparisonModal} onSubmit={handleComparisonResult} />
    </>
  );
}

export default App;
