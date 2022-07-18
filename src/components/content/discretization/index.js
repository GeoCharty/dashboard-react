
import React, { useContext } from "react";
import MainContext from './../../Context';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard() {
  const {
    dashboard: {
      discretization = {}
    } = {}
  } = useContext(MainContext);

  return (
    <Box sx={{
      minWidth: 275,
      display: "inline-block",
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: "9999"
    }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            {discretization.description}
          </Typography>
          {discretization.map?.length &&
            discretization.map.map((d, didx) => (
              <Box key={didx} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    backgroundColor: d.result.color,
                    height: "10px",
                    width: "25px"
                  }}
                />
                <Typography variant="caption" sx={{ marginLeft: "8px" }}>
                  {d.result.label}
                </Typography>
              </Box>
            ))}
        </CardContent>
      </Card>
    </Box>
  );
}
