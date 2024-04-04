import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button } from '@mui/material';
import CreateHeroForm from './CreateHeroForm';
import EditHeroForm from './EditHeroForm';
import EditIcon from '@mui/icons-material/Edit';

export default function HeroesTable() {
  const [heroes, setHeroes] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
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
                {hero.name}
              </TableCell>
              <TableCell align="right">{hero.race}</TableCell>
              <TableCell align="right">{hero.power_stats.strength}</TableCell>
              <TableCell align="right">{hero.power_stats.agility}</TableCell>
              <TableCell align="right">{hero.power_stats.dexterity}</TableCell>
              <TableCell align="right">{hero.power_stats.intelligence}</TableCell>
              <TableCell align="right">{hero.enabled ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleEditClick(hero)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </TableContainer>
  );
}
