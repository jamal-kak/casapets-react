// React Lib
import { useEffect, useRef, useState } from "react";

// MUI Lib
import { Box, Typography, useTheme, LinearProgress } from "@mui/material";
import { tokens } from "../theme";

// Context
import { useDashContext } from "../hooks/dashboard/useDashContext";
import { useListRdv } from "../hooks/dashboard/useListRdv";

// Components
import ErrorMessage from "./ErrorMessage";

const RecentRdv = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataFetchedRef = useRef(false);

  const { dashRdv } = useDashContext();
  const { listRdv, errorListRdv, isLoadingListRdv } = useListRdv();

  const handleList = async () => {
    await listRdv();
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleList();
  }, []);

  return (
    <>
      {isLoadingListRdv ? (
        <LinearProgress color="success" />
      ) : (
        <>
          {errorListRdv && <ErrorMessage message={errorListRdv?.message} />}
          {dashRdv?.data?.map((rdv, i) => (
            <Box
              key={`${rdv?.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {rdv?.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {rdv?.client_id}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{rdv?.date_rdv}</Box>
              <Box
                backgroundColor={colors.redAccent[400]}
                p="5px 10px"
                borderRadius="4px"
              >
                {rdv?.status}
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
};
export default RecentRdv;
