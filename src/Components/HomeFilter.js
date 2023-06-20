import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AbilityFilter({abilities,setability,ability}) {

  const handleChange = (event) => {

    setability(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ability</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ability}
          label="Ability"
          onChange={handleChange}
        >
        <MenuItem value="null">All</MenuItem>
        {abilities?.map((item,key)=>{
            return   <MenuItem value={item?.name}>{item?.name}</MenuItem>
        })}
         
        </Select>
      </FormControl>
    </Box>
  );
}
export  function SpeciesFilter({abilities,setability,ability}) {

  const handleChange = (event) => {

    setability(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 ,mt:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ability</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ability}
          label="Ability"
          onChange={handleChange}
        >
        <MenuItem value={null}>All</MenuItem>
        {abilities?.map((item,key)=>{
            return   <MenuItem value={item?.name}>{item?.name}</MenuItem>
        })}
         
        </Select>
      </FormControl>
    </Box>
  );
}