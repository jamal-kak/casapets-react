import { useEffect, useReducer,useState, useContext } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import RaceModal from './raceModal';






import { LinearProgress , Container} from "@mui/material";
import { RacesContext } from '../../context/racesContext';
import { RACES_API_URL } from "../../UTILS/APIS";



const Races = () => {
    
    const [open, setOpen] = useState(false);
    const [raceInfo, setRaceInfo] = useState(null);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);

    const racesContext = useContext(RacesContext);
    const { races, loading, error, fetchRaces, addRace, editRace, nextPage, prevPage, deleteRace } = racesContext;

    console.log("ttttttt",races);
    
      // useEffect(() => {
      //   // console.log("ttttttt",races);
      //   fetchRaces(RACES_API_URL);
      // }, []);

      const options = { year: "numeric", month: "long", day: "numeric"}
      function getDateTimeFromTimestamp(unixTimeStamp) {
        let date = new Date(unixTimeStamp);
        return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
      { field: 'name', headerName: 'Name', width: 250, align: 'center', headerAlign: 'center', editable: true },
      { field: 'type', headerName: 'Race type', width: 150, align: 'center', headerAlign: 'center', editable: true },
      {
        field: 'created_at',
        headerName: 'Ajouté le',
        type: 'number',
        width: 110,
        align: 'center',
        headerAlign: 'center',
        editable: true,
        valueFormatter: (params) => getDateTimeFromTimestamp(params.value),
      },
      {
        field: 'updated_at',
        headerName: 'Modifié le',
        type: 'number',
        width: 110,
        align: 'center',
        headerAlign: 'center',
        editable: true,
        valueFormatter: (params) => getDateTimeFromTimestamp(params.value),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 280,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick = (e) => {
            const currentRow = params.row;
            setRaceInfo(currentRow);
            setOpen(true);
          };
          const onDeleteClick = (e) => {
            const currentRow = params.row;
            setRaceInfo(currentRow);
            setOpenDeleteDialogue(true);
          };
    
          return (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="warning" size="small" onClick={onClick}>
                Edit
              </Button>
              <Button variant="contained" color="error" size="small" onClick={onDeleteClick}>
                Delete
              </Button>
            </Stack>
          );
        },
        align: 'center',
        headerAlign: 'center',
      },
    ];

    const [name, setName] = useState('');
    const [type, setType] = useState('');

  
  const handleNameChange = (event) => {
    setName(event.target.value);
    };
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
    const handleAddRace = () => {
        if(name&&type){
            addRace(name,type)}
            
    };
    const handleNextPage = () => {
        nextPage();
    };
    const handlePrevPage = () => {
        prevPage();
    };

    const handleDeleteClose = () => {
      setOpenDeleteDialogue(false);
    };



    const [message, setMessage] = useState('');
    

    const handleRowClick = (params) => {
        setMessage(` ${params.row.name}  ----  ID: ${params.row.id}  ---- Date de création: ${ getDateTimeFromTimestamp(params.row.updated_at) }`);
    };




  

  return ( 
    
    <div>
      {loading ? <LinearProgress color="secondary" /> : 
    
    
    <Container maxWidth="false">


    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '300px' }, }}
      noValidate
      autoComplete="off"
    >

  <TextField id="outlined-basic" label="Race name :" variant="outlined" fullWidth value={name} onChange={handleNameChange}/>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Type</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Race"
        onChange={handleTypeChange}
    >
        <MenuItem value={1} variant="contained">Type 1</MenuItem>
        <MenuItem value={2} variant="contained">Type 2</MenuItem>
    </Select>



    </FormControl>
    <Button variant="contained" color="success" fullWidth onClick={handleAddRace} size="large"  endIcon={<AddIcon />}>Ajouter la race</Button>


    </Box>


    <Stack spacing={2} sx={{ width: '100%' }}>

    {message && <Alert severity="info" >{message}</Alert>}
        <Box sx={{ height: "100%", width: '100%' }}>
        <DataGrid
        onRowClick={handleRowClick}
            rows={races.data}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            // pageSizeOptions={[5]}
            checkraceSelection
            disableRowSelectionOnClick
        />
        </Box>
    </Stack>
      
    {open && <RaceModal open={open} setOpen={setOpen} raceInfo={raceInfo} editRace={editRace} />}


    {
    openDeleteDialogue && 
    <Dialog
        open={openDeleteDialogue}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Suprimer la race !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this race
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} variant="contained" color="success" >No keep it</Button>
          <Button onClick={()=>{deleteRace(raceInfo.id, setOpenDeleteDialogue)}}  variant="contained" color="error" >Yes Delete</Button>
        </DialogActions>
      </Dialog>}

    </Container>




    
    
    }
    </div>
    
  );
};

export default Races;
