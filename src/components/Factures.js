// React Lib
import { useEffect, useState, useRef } from "react";

// Mui Library
import {
  Box,
  Button,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

// Mui Theme
import { tokens } from "../theme";

// Context
import { useDashContext } from "../hooks/dashboard/useDashContext";
import { useListFactures } from "../hooks/dashboard/useListFactures";
import { useStateFacture } from "../hooks/dashboard/useStateFacture";
import { useDownload } from "../hooks/dashboard/useDownload";

// Component
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const Factures = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataFetchedRef = useRef(false);

  const { dashFactureTable, dashEtatFacture } = useDashContext();
  const { listFacture, errorListFacture, isLoadingListFacture } =
    useListFactures();
  const { download, errorDownload, isLoadingDownload } = useDownload();
  const { changeStateFacture, isLoadingStatusPaye } = useStateFacture();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });

  const [requestSend, setRequestSend] = useState(false);
  const [statusFacture, setStatusFacture] = useState({});

  const handleList = async () => {
    await listFacture("table");
  };

  const handlePay = async (id) => {
    await setStatusFacture({});
    await changeStateFacture(id);
    dataFetchedRef.current = false;
    setRequestSend((prev) => !prev);
  };

  const downloadFacture = async (id, type) => {
    await download(id, type);
  };

  useEffect(() => {
    handleList();
    setStatusFacture(dashEtatFacture);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },

    {
      field: "reference",
      headerName: "Référence",
      width: 100,
    },
    {
      field: "total",
      headerName: "Prix Total",
      width: 120,
      valueGetter: ({ row: { total } }) => {
        // Format the price above to USD using the locale, style, and currency.
        let prix_mad = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "MAD",
        });
        return prix_mad.format(total);
      },
    },
    {
      field: "client",
      headerName: "Client",
      width: 150,
      valueGetter: (params) => {
        return params.row.reservation.client.full_name;
      },
    },
    {
      field: "phone",
      headerName: "TELEPHONE",
      width: 150,
      valueGetter: (params) => {
        return params.row.reservation.client.phone;
      },
    },
    {
      field: "actions",
      headerName: "Paiement (Payé / Non Payé)",
      width: 200,
      renderCell: ({ row: { status, id } }) => {
        return (
          <Box width="100%" p="5px" display="flex" justifyContent="left">
            <Switch
              checked={status === "Non payé" ? false : true}
              color="success"
              onChange={() => handlePay(id)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        );
      },
    },
    {
      field: "download",
      headerName: "Téléchargement",
      width: 120,
      renderCell: ({ row: { reservation } }) => {
        return (
          <Box width="100%" p="5px" display="flex" justifyContent="left">
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="info"
              onClick={() => downloadFacture(reservation.id, "facture")}
            >
              <FileDownloadRoundedIcon color="info" />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      m="0 0 0 0"
      height="45vh"
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
      {statusFacture?.success && (
        <SuccessMessage
          message={
            statusFacture?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusFacture?.success && (
        <ErrorMessage message={statusFacture?.message} />
      )}
      <DataGrid
        columnHeaderHeight={40}
        loading={isLoadingListFacture || isLoadingStatusPaye}
        rowCount={dashFactureTable?.meta?.total}
        rows={dashFactureTable?.data || []}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[
          dashFactureTable?.data?.length === 0 ? 0 : paginationModel.pageSize,
        ]}
      />
    </Box>
  );
};

export default Factures;
