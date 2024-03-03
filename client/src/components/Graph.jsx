
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [5,10, 15, 20, 25, 30, 35, 40, 45,50, 55, 60];
const pData = [5,10, 15, 20, 22, 27, 33, 44, 47,52, 58, 70];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Graph() {
  return (
    <Box sx={{ minWidth: "100%", overflow : 'auto', }}>
      <LineChart
        height={400}
        series={[
          { data: pData, label: "Project Alpha" },
          { data: uData, label: "Project Beta" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </Box>
  );
}
