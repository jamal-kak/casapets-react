// React Lib
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Lib
import { ResponsiveLine } from "@nivo/line";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../theme";

// Context
import { useDashContext } from "../hooks/dashboard/useDashContext";
import { useListFactures } from "../hooks/dashboard/useListFactures";

// Components
import ErrorMessage from "./ErrorMessage";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataFetchedRef = useRef(false);

  const { dashFacture } = useDashContext();
  const { listFacture, errorListFacture, isLoadingListFacture } =
    useListFactures();

  const [total, setTotal] = useState(0);

  const handleList = async () => {
    await listFacture("chart");
    let _total = 0;
    let total_mad = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    });
    dashFacture?.forEach((item) => {
      _total += item.y;
    });

    await setTotal(total_mad.format(_total));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleList();
  }, []);

  return (
    <Box>
      {isLoadingListFacture ? (
        <LinearProgress color="success" />
      ) : (
        <>
          {errorListFacture && (
            <ErrorMessage message={errorListFacture?.message} />
          )}

          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenus générés
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {total}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="255px" m="-20px 0 0 0">
            <ResponsiveLine
              data={[
                {
                  id: "Revenu Mensuel",
                  color: tokens("dark").greenAccent[500],
                  data: dashFacture || [],
                },
              ]}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: colors.grey[100],
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                tooltip: {
                  container: {
                    color: colors.primary[500],
                  },
                },
              }}
              colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "transportation", // added
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickValues: 5, // added
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "count", // added
                legendOffset: -40,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default LineChart;
