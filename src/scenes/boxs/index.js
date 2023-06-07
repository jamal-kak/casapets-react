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



import BoxModal from './boxModal';






import { LinearProgress , Container} from "@mui/material";
import { BoxsContext } from '../../context/boxsContext';
import { BOX_API_URL } from "../../UTILS/APIS";



const Boxs = () => {
    
    const [open, setOpen] = useState(false);
    const [boxInfo, setBoxInfo] = useState(null);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);

    const boxsContext = useContext(BoxsContext);
    const { boxs, loading, error, fetchBoxs, addBox, editBox, nextPage, prevPage, deleteBox } = boxsContext;

    // console.log("ttttttt",boxs);
    
      useEffect(() => {
        // console.log("ttttttt",boxs);
        fetchBoxs(BOX_API_URL);
      }, []);

      const options = { year: "numeric", month: "long", day: "numeric"}
      function getDateTimeFromTimestamp(unixTimeStamp) {
        let date = new Date(unixTimeStamp);
        return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }
  
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'libelle',
          headerName: 'L  ibelle',
          width: 150,
          editable: true,
        },
        {
          field: 'type',
          headerName: 'Box type',
          width: 150,
          editable: true,
        },
        {
          field: 'updated_at',
          headerName: 'Ajouté le',
          type: 'number',
          width: 110,
          editable: true,
          valueFormatter: params => getDateTimeFromTimestamp(params.value)
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
                setBoxInfo(currentRow);
                setOpen(true);
              };
              const onDeleteClick = (e) => {                
                const currentRow = params.row;
                setBoxInfo(currentRow);
                setOpenDeleteDialogue(true);
              };
              
              return (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="warning" size="small" onClick={onClick}>Edit</Button>
                  <Button variant="contained" color="error" size="small" onClick={onDeleteClick}>Delete</Button>
                </Stack>
              );
          },
        }
        
      ];

    const [name, setName] = useState('');
    const [type, setType] = useState('');

  
  const handleNameChange = (event) => {
    setName(event.target.value);
    };
    const handleTypeChange = (event) => {
      setOpenDeleteDialogue(event.target.value);
    };
    const handleAddBox = () => {
        if(name&&type){
            addBox(name,type)}
            
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

  <TextField id="outlined-basic" label="Box name :" variant="outlined" fullWidth value={name} onChange={handleNameChange}/>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Type</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Box"
        onChange={handleTypeChange}
    >
        <MenuItem value={1} variant="contained">Type 1</MenuItem>
        <MenuItem value={2} variant="contained">Type 2</MenuItem>
    </Select>



    </FormControl>
    <Button variant="contained" color="success" fullWidth onClick={handleAddBox} size="large"  endIcon={<AddIcon />}>Ajouter la box</Button>


    </Box>


    <Stack spacing={2} sx={{ width: '100%' }}>

    {message && <Alert severity="info" >{message}</Alert>}
        <Box sx={{ height: "100%", width: '100%' }}>
        <DataGrid
        onRowClick={handleRowClick}
            rows={boxs.data}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            // pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
        </Box>
    </Stack>
      
    {open && <BoxModal open={open} setOpen={setOpen} boxInfo={boxInfo} editBox={editBox} />}


    {
    openDeleteDialogue && 
    <Dialog
        open={openDeleteDialogue}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this box
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} variant="contained" color="success" >No keep it</Button>
          <Button onClick={()=>{deleteBox(boxInfo.id, setOpenDeleteDialogue)}}  variant="contained" color="error" >Yes Delete</Button>
        </DialogActions>
      </Dialog>}

    </Container>




    
    
    }
    </div>
    
  );
};

export default Boxs;
