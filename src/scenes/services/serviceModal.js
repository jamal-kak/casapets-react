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




export default function ServiceModal({open,setOpen, serviceInfo, editService}) {
  

  
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');


  useEffect(()=>{
    setName(serviceInfo.title)   
    setReference(serviceInfo.reference)   
    setType(serviceInfo.type_key)   
    setStatus(serviceInfo.status_key)   

  },[])

  const handleOpen = () => setOpen(true);       
  const handleClose = () => setOpen(false);


  const handleLibelleChange = (e) => {    
    setName( e.target.value )    
  }
  const handleReferenceChange = (event) => {
    setReference(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };


  const handleSubmit = () => {
    editService(name,reference,type,status, serviceInfo.id, setOpen)
    
};



  // console.log("service",service);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier le Service : {serviceInfo.id} </DialogTitle>
        <DialogContent>
          
          <TextField
            // autoFocus
            margin="dense"
            id="title"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name  }
            onChange={handleLibelleChange}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="libelle"
            label="Reference"
            type="text"
            fullWidth
            variant="standard"
            value={reference}
            onChange={handleReferenceChange}
          />
          <Select
              sx={{ mt: 3, minWidth: 220 }} size="large"
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type du service"
              onChange={handleTypeChange}
          >
              <MenuItem value={1} variant="contained">Type 1</MenuItem>
              <MenuItem value={2} variant="contained">Type 2</MenuItem>
          </Select>
          <Select
              sx={{ mt: 3, minWidth: 220 }} size="large"
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Type du service"
              onChange={handleStatusChange}
          >
              <MenuItem value={1} variant="contained">Active</MenuItem>
              <MenuItem value={2} variant="contained">Desactive</MenuItem>
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