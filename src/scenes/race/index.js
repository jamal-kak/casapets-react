// React Lib
import { useEffect, useState } from "react";

// Mui Library
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Mui Theme
import { tokens } from "../../theme";

// Components
import { Header, ErrorMessage, SuccessMessage } from "../../components";

// Context
import { useRaceContext } from "../../hooks/races/useRaceContext";
import { useListRaces } from "../../hooks/races/useListRaces";
import { useDeleteRace } from "../../hooks/races/useDeleteRace";
import FormRace from "./FormRace";

const Races = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = JSON.parse(localStorage.getItem("user"));

  const { listRaces, isLoadingListRaces } = useListRaces();
  const { deleteRace, isLoadingDeleteRace } = useDeleteRace();
  const { races, updatedRace, NewRace, deletedRace } = useRaceContext();
  const [requestSend, setRequestSend] = useState(false);
  const [statusRace, setStatusRace] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openRaceForm, setOpenRaceForm] = useState(false);
  const [dataRace, setDataRace] = useState({});

  const handleList = async () => {
    await listRaces();
  };

  const handleClickOpen = (data = null) => {
    setDataRace(data);
    setOpenRaceForm(true);
  };

  const handleClose = () => {
    setOpenRaceForm(false);
  };

  const handleDelete = async (id) => {
    await deleteRace(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusRace(NewRace || updatedRace || deletedRace);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },

    {
      field: "name",
      headerName: "Race",
      width: 400,
    },
    {
      field: "race",
      headerName: "Type",
      width: 400,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 380,
      renderCell: ({ row, row: { id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="left"
            gap={1}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="success"
              width="10px"
              onClick={() => handleClickOpen(row)}
              disabled={user?.role_id === 2 ? true : false}
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => handleDelete(id)}
              disabled={user?.role_id === 2 ? true : false}
            >
              <DeleteIcon color={colors.redAccent[200]} />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {statusRace?.success && (
        <SuccessMessage
          message={
            statusRace?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusRace?.success && <ErrorMessage message={statusRace?.message} />}
      {openRaceForm && (
        <FormRace
          open={openRaceForm}
          close={handleClose}
          data={dataRace}
          setRequestSend={setRequestSend}
        />
      )}
      <Box m="20px">
        <Header title="RACES" subtitle="List des Races" />
        <Box
          m="40px 0 0 0"
          height="65vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Button
            color="info"
            variant="outlined"
            onClick={() => handleClickOpen()}
            disabled={user?.role_id === 2 ? true : false}
          >
            <AddIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ajouter Race
            </Typography>
          </Button>
          <DataGrid
            loading={isLoadingListRaces || isLoadingDeleteRace}
            rowCount={races?.meta?.total}
            rows={races?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              races?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Races;
