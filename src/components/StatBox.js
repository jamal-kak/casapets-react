import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

// Context
import { useDashContext } from "../hooks/dashboard/useDashContext";
import { useListDash } from "../hooks/dashboard/useListDash";

// React Lib
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ErrorMessage from "./ErrorMessage";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { dashClient, dashVet, dashPet, dashRes } = useDashContext();
  const { listDash, errorListDash, isLoadingListDash } = useListDash();

  const handleList = async () => {
    await listDash(title);
  };

  const navigateTo = () => {
    switch (title) {
      case "client":
        navigate("/clients");
        break;
      case "vet":
        navigate("/vet");
        break;
      case "pet":
        navigate("/pets");
        break;
      default:
        navigate("/");
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleList();
  }, []);

  return (
    <>
      {isLoadingListDash ? (
        <CircularProgress color="success" />
      ) : (
        <>
          {errorListDash && <ErrorMessage message={errorListDash?.message} />}
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                {icon}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  {title === "client"
                    ? dashClient?.data?.length
                    : title === "vet"
                    ? dashVet?.data?.length
                    : title === "pet"
                    ? dashPet?.data?.length
                    : dashRes?.data?.length}{" "}
                  {subtitle}
                </Typography>
              </Box>
              <Box>
                <ProgressCircle progress={progress} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography
                onClick={() => navigateTo()}
                variant="h5"
                sx={{ color: colors.greenAccent[500], cursor: "pointer" }}
              >
                {"Plus..."}
              </Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600] }}
              >
                {increase}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default StatBox;
