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
import { useBoxContext } from "../../hooks/boxs/useBoxContext";
import { useListBoxs } from "../../hooks/boxs/useListBoxs";
import { useDeleteBox } from "../../hooks/boxs/useDeleteBox";
import FormBox from "./FormBox";

const Boxs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { listBoxs, isLoadingListBoxs } = useListBoxs();
  const { deleteBox, isLoadingDeleteBox } = useDeleteBox();
  const { boxs, updatedBox, NewBox, deletedBox } = useBoxContext();
  const [requestSend, setRequestSend] = useState(false);
  const [statusBox, setStatusBox] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openBoxForm, setOpenBoxForm] = useState(false);
  const [dataBox, setDataBox] = useState({});

  const handleList = async () => {
    await listBoxs();
  };

  const handleClickOpen = (data = null) => {
    setDataBox(data);
    setOpenBoxForm(true);
  };

  const handleClose = () => {
    setOpenBoxForm(false);
  };

  const handleDelete = async (id) => {
    await deleteBox(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusBox(NewBox || updatedBox || deletedBox);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },

    {
      field: "libelle",
      headerName: "Libelle",
      width: 400,
    },
    {
      field: "status",
      headerName: "Status",
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
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => handleDelete(id)}
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
      {statusBox?.success && (
        <SuccessMessage
          message={
            statusBox?.message || "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusBox?.success && <ErrorMessage message={statusBox?.message} />}
      <Box m="20px">
        <Header title="BOXS" subtitle="List des Boxs" />
        {openBoxForm && (
          <FormBox
            open={openBoxForm}
            close={handleClose}
            data={dataBox}
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
            onClick={() => handleClickOpen()}
          >
            <AddIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ajouter Box
            </Typography>
          </Button>
          <DataGrid
            loading={isLoadingListBoxs || isLoadingDeleteBox}
            rowCount={boxs?.meta?.total}
            rows={boxs?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              boxs?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Boxs;
