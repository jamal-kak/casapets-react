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



export default function BoxModal({open,setOpen, boxInfo, editBox}) {
  

  
  const [ boxName ,setBoxName ] = useState({});
  const [ boxType ,setBoxType ] = useState({});


  useEffect(()=>{
    setBoxName(boxInfo.libelle)   
    setBoxType(boxInfo.type)   

  },[])

  const handleOpen = () => setOpen(true);       
  const handleClose = () => setOpen(false);


  const handleLibelleChange = (e) => {    
    setBoxName( e.target.value )    
  }

  const handleTypeChange = (event) => {
    setBoxType(event.target.value);
};


  const handleSubmit = () => {
    editBox(boxName,boxType, boxInfo.id, setOpen)
    
};



  // console.log("box",box);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier le Box : {boxInfo.id} </DialogTitle>
        <DialogContent>
          
          <TextField
            // autoFocus
            margin="dense"
            id="libelle"
            label="Libelle"
            type="text"
            fullWidth
            variant="standard"
            value={boxName  }
            onChange={handleLibelleChange}
          />
          <Select
              sx={{ mt: 3, minWidth: 220 }} size="large"
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={boxType}
              label="Type du box"
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