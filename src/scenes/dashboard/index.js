import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  return (
    <div>{loading ? <LinearProgress color="secondary" /> : <>Dashboard</>}</div>
  );
};

export default Dashboard;
