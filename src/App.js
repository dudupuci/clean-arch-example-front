import React, { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CreateHeroForm from './components/CreateHeroForm';
import HeroesTable from './components/HeroesTable';

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateHero = (newHero) => {
    // Aqui você pode fazer o que quiser com o novo herói, como enviá-lo para o backend
    console.log(newHero);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Heroes Application v1.0.0
          </Typography>
          <Button color="inherit" onClick={handleOpenModal}>Create Hero</Button>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <HeroesTable />
      </Box>
      <CreateHeroForm open={openModal} onClose={handleCloseModal} onSubmit={handleCreateHero} />
    </>
  );
}

export default App;
