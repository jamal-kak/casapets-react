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
import Chip from '@mui/material/Chip';



import ServiceModal from './serviceModal';






import { LinearProgress , Container} from "@mui/material";
import { ServicesContext } from '../../context/servicesContext';
import { SERVICE_API_URL } from "../../UTILS/APIS";
import CustomizedSnackbars from "../global/snackbar";



const Services = () => {
    
    const [open, setOpen] = useState(false);
    const [serviceInfo, setServiceInfo] = useState(null);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
    
    // openSnackbar,setOpenSnackbar, message,messageType

    const servicesContext = useContext(ServicesContext);
    const { services, loading, error, fetchServices, addService, editService, nextPage, prevPage, deleteService, success } = servicesContext;

    // console.log("ttttttt",services);
    
      // useEffect(() => {
      //   console.log("services",services);
      //   fetchServices(SERVICE_API_URL);
      // }, []);

      const options = { year: "numeric", month: "long", day: "numeric"}
      function getDateTimeFromTimestamp(unixTimeStamp) {
        let date = new Date(unixTimeStamp);
        return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }
  

    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        width: 30,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'reference',
        headerName: 'Reference',
        width: 150,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 250,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'type',
        headerName: 'Service type',
        width: 150,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => {
          let chipColor;
    
          switch (params.value) {
            case 'Active':
              chipColor = 'success';
              break;
            case 'Inactive':
              chipColor = 'secondary';
              break;
            case 'Pending':
              chipColor = 'warning';
              break;
            default:
              chipColor = 'default';
          }
    
          return <Chip label={params.value} color={chipColor} />;
        },
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'created_at',
        headerName: 'Ajouté le',
        width: 150,
        valueFormatter: (params) => getDateTimeFromTimestamp(params.value),
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'updated_at',
        headerName: 'Modifié le',
        width: 150,
        valueFormatter: (params) => getDateTimeFromTimestamp(params.value),
        align: 'center',
        headerAlign: 'center',
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
            setServiceInfo(currentRow);
            setOpen(true);
          };
          const onDeleteClick = (e) => {
            const currentRow = params.row;
            setServiceInfo(currentRow);
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
    const [reference, setReference] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');

  
  const handleNameChange = (event) => {
    setName(event.target.value);
    };
    const handleReferanceChange = (event) => {
      setReference(event.target.value);
    };
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
    const handleAddService = () => {
        if(name&&type&&type&&status){
            addService(name,reference,type,status)}
            
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

  <TextField id="outlined-basic" label="Service name :" variant="outlined" fullWidth value={name} onChange={handleNameChange}/>
  <TextField id="outlined-basic" label="Reference :" variant="outlined" fullWidth value={reference} onChange={handleReferanceChange}/>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Service"
          onChange={handleTypeChange}
      >
          <MenuItem value={1} variant="contained">Chien</MenuItem>
          <MenuItem value={2} variant="contained">Chat</MenuItem>
      </Select>



    </FormControl>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Service"
          onChange={handleStatusChange}
      >
          <MenuItem value={1} variant="contained">Active</MenuItem>
          <MenuItem value={2} variant="contained">Desactive</MenuItem>
      </Select>



    </FormControl>
    <Button variant="contained" color="success" fullWidth onClick={handleAddService} size="large"  endIcon={<AddIcon />}>Ajouter la service</Button>


    </Box>


    <Stack spacing={2} sx={{ width: '100%' }}>

    {message && <Alert severity="info" >{message}</Alert>}
        <Box sx={{ height: "100%", width: '100%' }}>
        <DataGrid
        onRowClick={handleRowClick}
            rows={services.data}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            // pageSizeOptions={[5]}
            checkserviceSelection
            disableRowSelectionOnClick
        />
        </Box>
    </Stack>
      
    {open && <ServiceModal open={open} setOpen={setOpen} serviceInfo={serviceInfo} editService={editService} />}


    {
    openDeleteDialogue && 
    <Dialog
        open={openDeleteDialogue}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Suprimer le service !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} variant="contained" color="success" >No keep it</Button>
          <Button onClick={()=>{deleteService(serviceInfo.id, setOpenDeleteDialogue)}}  variant="contained" color="error" >Yes Delete</Button>
        </DialogActions>
      </Dialog>}

      

    </Container>




    
    
    }
    </div>
    
  );
};

export default Services;
