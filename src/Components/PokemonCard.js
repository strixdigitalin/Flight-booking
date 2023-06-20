import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pokeball from "../assets/pokeball.png"
export default function MediaCard({item,setSelectedPokemon}) {
  return (
    <Card sx={{ maxWidth: 345 ,padding:"10px" }}>
    <img src={pokeball} width="120px" style={{objectFit:"cover"}}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
     <div >

        
        <Button onClick={()=>setSelectedPokemon(item?.name)} textAlign="center" size="small" variant="contained">View Detail</Button>
     </div>
    </Card>
  );
}