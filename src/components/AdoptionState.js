// React Lib
import { useEffect, useRef, useState } from "react";

// MUI Lib
import {
  Box,
  Typography,
  useTheme,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { tokens } from "../theme";

// Context
import { useDashContext } from "../hooks/dashboard/useDashContext";
import { useListAdoption } from "../hooks/dashboard/useListAdoption";

// Components
import ErrorMessage from "./ErrorMessage";

const AdoptionState = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataFetchedRef = useRef(false);

  const { dashAdoption } = useDashContext();
  const { listAdoption, errorListAdoption, isLoadingListAdoption } =
    useListAdoption();

  const handleList = async () => {
    await listAdoption();
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleList();
  }, []);

  return (
    <>
      {isLoadingListAdoption ? (
        <LinearProgress color="success" />
      ) : (
        <>
          {errorListAdoption && (
            <ErrorMessage message={errorListAdoption?.message} />
          )}
          {dashAdoption?.data?.map((adoption, i) => (
            <Box
              key={`${adoption?.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Avatar src={adoption.photo} />
              </Box>
              <Box color={colors.grey[100]}>{adoption?.name}</Box>
              <Box
                backgroundColor={
                  adoption?.disponible === "non"
                    ? colors.redAccent[400]
                    : colors.greenAccent[700]
                }
                p="5px 10px"
                borderRadius="4px"
                width={90}
                textAlign="center"
              >
                {adoption?.disponible === "non" ? "Non Adopté" : "Adopté"}
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
};
export default AdoptionState;
