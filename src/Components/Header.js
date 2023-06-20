import { Grid, Typography } from '@mui/material'
import React from 'react'
import logout from "../assets/logoutbgrm.png"
import logo from "../assets/pokeball.png"
function Header() {
  return (
    <div className="headercovered">
 <div className='containerS'>

   <Grid xs={12} container  pt={0} pb={0} alignItems="center">
    <Grid xs={4} textAlign="left" item >
    <div style={{display:"flex",alignItems:"center"}}>

    <img src={logo} style={{width:"50px",marginRight:"10px"}}/>
    <Typography sx={{
        fontSize:{xs:15,md:26}
    }}>

     Pokedex
    </Typography>
    </div>
     </Grid>
    <Grid xs={8} item textAlign="right" alignItems="center" >
    <img src={logout} style={{width:"30px"}}/>
    {/* Logout */}
    </Grid>
   </Grid>
 </div>
    </div>
  )
}

export default Header