import React from 'react'
import loader from "../assets/loader.gif"
import { Typography } from '@mui/material'

function Loader() {
  return (
    <div className="loader">
    <div>

<img src={loader} style={{width:"250px",objectFit:"cover"}}/>
    </div>
<div>

 <Typography fontSize={25}>Loading...</Typography>
</div>
    </div>
  )
}

export default Loader