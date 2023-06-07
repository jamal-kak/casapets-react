import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export default function RaceModal({open,setOpen, raceInfo, editRace}) {
  

  
  const [ raceName ,setRaceName ] = useState({});
  const [ raceType ,setRaceType ] = useState({});

  console.log("hada",raceInfo);

  useEffect(()=>{
    setRaceName(raceInfo.name)   
    setRaceType(raceInfo.type)   

  },[])

  const handleOpen = () => setOpen(true);       
  const handleClose = () => setOpen(false);


  const handleNameChange = (e) => {    
    setRaceName( e.target.value )    
  }

  const handleTypeChange = (event) => {
    setRaceType(event.target.value);
};


  const handleSubmit = () => {
    editRace(raceName,raceType, raceInfo.id, setOpen)
    
};



  // console.log("race",race);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier le Race : {raceInfo.id} </DialogTitle>
        <DialogContent>
          
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={raceName  }
            onChange={handleNameChange}
          />
          <Select
              sx={{ mt: 3, minWidth: 220 }} size="large"
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={raceType}
              label="Type du race"
              onChange={handleTypeChange}
          >
              <MenuItem value={1} variant="contained">Type 1</MenuItem>
              <MenuItem value={2} variant="contained">Type 2</MenuItem>
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error" >Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="success" >Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}