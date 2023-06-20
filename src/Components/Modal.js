import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Pokemon } from '../API/Pokemon';
import { Chip, Grid } from '@mui/material';
import MoveTable from './MoveTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:window?.innerWidth >500? "50%":"70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({selectedPokemon,setSelectedPokemon}) {
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState({})
  const handleOpen = () => setOpen(true);
React.useEffect(() => {
Pokemon.GetByName({name:selectedPokemon},res=>{
    console.log(res,"<<<pokeon detail")
    setDetail(res)
})
}, [selectedPokemon])

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={selectedPokemon !=null?true:false}
        onClose={()=>setSelectedPokemon(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Grid container>
        <Grid xs={12} item textAlign="center">
            <Typography color="black" textAlign="center" fontWeight="bold" fontSize={25}>{detail?.name?.toUpperCase() +" ("+detail?.id+") "}</Typography>
        </Grid>
        <Grid xs={12} md={4} item textAlign="center">
            <Typography color="blue" textAlign="center" fontSize={18}>Height: {detail?.height}</Typography>
        </Grid>
        <Grid xs={12} md={4} item textAlign="center">
            <Typography color="blue" textAlign="center" fontSize={18}>Weight: {detail?.weight}</Typography>
        </Grid>
        <Grid xs={12} md={4} item textAlign="center">
            <Typography color="blue" textAlign="center" fontSize={18}>Base Experience: {detail?.base_experience}</Typography>
        </Grid>

        {/*  Abilities */}
            <Grid item xs={12}>
            <Typography fontSize={22} fontWeight="bold">
            Abilities
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {detail?.abilities?.map((item,key)=>{
                        return   <Grid item>
                          <Chip label={item?.ability?.name} />
                    </Grid>
                    })}
                </Grid>
            </Grid>

{/* Forms */}

<Grid item xs={12} mt={2}>
            <Typography fontSize={22} fontWeight="bold">
            Forms
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {detail?.forms?.map((item,key)=>{
                        return   <Grid item>
                          <Chip label={item?.name} />
                    </Grid>
                    })}
                </Grid>
            </Grid>

{/* Types */}

<Grid item xs={12} mt={2}>
            <Typography fontSize={22} fontWeight="bold">
            Types
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {detail?.types?.map((item,key)=>{
                        return   <Grid item>
                          <Chip label={item?.type?.name} />
                    </Grid>
                    })}
                </Grid>
            </Grid>
{/* Moves */}

<Grid item xs={12} mt={2}>
            <Typography fontSize={22} fontWeight="bold">
            Moves
            </Typography>
            </Grid>
            <Grid item xs={12}>
               
                <MoveTable moves={detail?.moves} />
            </Grid>


        </Grid>
        </Box>
      </Modal>
    </div>
  );
}


