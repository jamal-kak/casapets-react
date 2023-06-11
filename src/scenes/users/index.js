import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddIcon from "@mui/icons-material/Add";
import { LinearProgress } from "@mui/material";
import Header from "../../components/Header";

import { useListUser } from "../../hooks/users/useListUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/users/useUserContext";

const Users = () => {
  const { listUser, error, isLoading } = useListUser();
  const { users } = useUserContext();
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    handleList();
  }, []);

  const handleList = async () => {
    await listUser();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Roles",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
          >
            {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Receptionniste" && <SecurityOutlinedIcon />}
            {role === "Veterianire" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Box m="20px">
          <Header
            title="Utilisateurs"
            subtitle="Gestion des membres utilisateurs"
          />

          <Box
            m="40px 0 0 0"
            height="47vh"
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
            }}
          >
            <Button
              sx={{
                marginBottom: "10px",
              }}
              color="info"
              variant="outlined"
              onClick={() => navigate("/add-user")}
            >
              <AddIcon />
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Ajouter Utilisateur
              </Typography>
            </Button>
            <DataGrid
              checkboxSelection
              rows={users?.data || []}
              columns={columns}
              rowCount={users?.meta?.total}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[
                users?.data?.length === 0 ? 0 : paginationModel.pageSize,
              ]}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Users;
