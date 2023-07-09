import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";

import { tokens } from "../../theme";
import {
  Header,
  StatBox,
  ProgressCircle,
  LineChart,
  RecentRdv,
  Factures,
  AdoptionState,
} from "../../components";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PetsIcon from "@mui/icons-material/Pets";
import Groups2Icon from "@mui/icons-material/Groups2";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TABLEAU DE BORD"
          subtitle="Bienvenue sur votre tableau de bord"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* HEADER */}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: 5 }}
        >
          <StatBox
            title="reservation"
            subtitle="Réservation"
            progress="0.75"
            increase="+14%"
            icon={
              <EditCalendarIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: 5 }}
        >
          <StatBox
            title="vet"
            subtitle="Vétérinaire"
            progress="0.50"
            increase="+21%"
            icon={
              <VaccinesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: 5 }}
        >
          <StatBox
            title="pet"
            subtitle="Pets"
            progress="0.30"
            increase="+5%"
            icon={
              <PetsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: 5 }}
        >
          <StatBox
            title="client"
            subtitle="Clients"
            progress="0.80"
            increase="+43%"
            icon={
              <Groups2Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 1 */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <LineChart isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Réservations récente
            </Typography>
          </Box>
          <RecentRdv />
        </Box>
        {/* ROW 2 */}

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="8px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Liste Factures
            </Typography>
          </Box>
          <Factures />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "50vh" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Status Pets en Adoption
            </Typography>
          </Box>
          <AdoptionState />
        </Box>
        {/* ROW 3 */}
      </Box>
      {/* GRID & CHARTS */}
    </Box>
  );
};

export default Dashboard;
