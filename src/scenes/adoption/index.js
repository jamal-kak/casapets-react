// React Lib
import { useEffect, useState } from "react";

// Mui Lib
import { Box, Button, Typography, Avatar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Mui Theme
import { tokens } from "../../theme";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import LensIcon from "@mui/icons-material/Lens";

// Components
import { Header, SuccessMessage, ErrorMessage } from "../../components";

// Context
import { useAdoptionsContext } from "../../hooks/adoptions/useAdoptionsContext";
import { useListAdoptions } from "../../hooks/adoptions/useListAdoptions";
import { useDeleteAdoption } from "../../hooks/adoptions/useDeleteAdoption";

// Scenes
import InfoAdoption from "./InfoAdoption";
import FormAdoption from "./FormAdoption";

const Adoptions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = JSON.parse(localStorage.getItem("user"));

  const { adoption, newAdoption, updatedAdoption, deletedAdoption } =
    useAdoptionsContext();
  const { listAdoptions, isLoadingListAdoptions } = useListAdoptions();
  const { deleteAdoption, isLoadingDeleteAdoption } = useDeleteAdoption();

  const [requestSend, setRequestSend] = useState(false);
  const [statusAdoption, setStatusAdoption] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openAdoptionInfo, setOpenAdoptionInfo] = useState(false);
  const [adoptionDetail, setAdoptionDetail] = useState({});
  const [openAdoptionForm, setOpenAdoptionForm] = useState(false);

  const handleClickOpen = (data, typeForm) => {
    setStatusAdoption(null);
    setAdoptionDetail(null);
    setAdoptionDetail(data);
    if (typeForm === "Info") {
      setOpenAdoptionInfo(true);
    } else if (typeForm === "Form") {
      console.log("hh");
      setOpenAdoptionForm(true);
    }
  };

  const handleClose = () => {
    setAdoptionDetail(null);
    setOpenAdoptionInfo(false);
    setOpenAdoptionForm(false);
  };

  const handleList = async () => {
    await listAdoptions();
  };

  const handleDelete = async (id) => {
    setStatusAdoption(null);
    await deleteAdoption(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusAdoption(newAdoption || updatedAdoption || deletedAdoption);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "photo",
      headerName: "Photo",
      width: 100,
      renderCell: ({ row: { photo } }) => {
        return <Avatar src={photo} />;
      },
    },

    {
      field: "name",
      headerName: "Nom",
      width: 120,
    },
    {
      field: "date_de_naissance",
      headerName: "Date Naissance",
      width: 140,
    },
    {
      field: "race",
      headerName: "Race",
      width: 150,
      valueGetter: (params) => {
        return params.row.race.name;
      },
    },
    {
      field: "caractere",
      headerName: "Caractère",
      width: 120,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "profile",
      headerName: "Profile",
      width: 120,
    },
    {
      field: "disponible",
      headerName: "Disponible",
      width: 100,
      renderCell: ({ row: { disponible } }) => {
        return <LensIcon color={disponible === "oui" ? "success" : "error"} />;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: ({ row, row: { id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="start"
            gap={1}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="info"
              width="10px"
              onClick={() => handleClickOpen(row, "Info")}
            >
              <VisibilityIcon color={colors.blueAccent[100]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="success"
              width="10px"
              onClick={() => handleClickOpen(row, "Form")}
              disabled={user?.role_id === 2 ? true : false}
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => {
                handleDelete(id);
              }}
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
      {statusAdoption?.success && (
        <SuccessMessage
          message={
            statusAdoption?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}

      {(statusAdoption?.errors || adoption?.message) && (
        <ErrorMessage message={statusAdoption?.message || adoption?.message} />
      )}
      <Box m="20px">
        <Header title="ADOPTIONS" subtitle="List des adoptions" />
        {openAdoptionInfo && (
          <InfoAdoption
            open={openAdoptionInfo}
            close={handleClose}
            data={adoptionDetail}
          />
        )}
        {openAdoptionForm && (
          <FormAdoption
            open={openAdoptionForm}
            close={handleClose}
            data={adoptionDetail}
            setRequestSend={setRequestSend}
          />
        )}
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
            onClick={() => handleClickOpen(null, "Form")}
            disabled={user?.role_id === 2 ? true : false}
          >
            <AddIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ajouter Adoption
            </Typography>
          </Button>
          <DataGrid
            loading={isLoadingListAdoptions || isLoadingDeleteAdoption}
            rowCount={adoption?.meta?.total}
            rows={adoption?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              adoption?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Adoptions;
