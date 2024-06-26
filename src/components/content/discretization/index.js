
import React, { useContext } from "react";
import MainContext from './../../Context';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {queryToString} from "./../../../utils/";

export default function OutlinedCard() {
  const {
    dashboard: {
      selectedAttribute = {},
      discretizationMap = {} 
    } = {}
  } = useContext(MainContext);
  const currentDiscretizations = discretizationMap?.[selectedAttribute?.id] || [];
  const discretization = currentDiscretizations?.[0] || {}
  
  return (
    <Box sx={{
      minWidth: 275,
      display: "inline-block",
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: "999"
    }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            {discretization.description}
          </Typography>
          {
            discretization?.map?.length ?
            discretization?.map?.map((d, didx) => (
              <Box key={didx} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    backgroundColor: d.result.color,
                    height: "10px",
                    width: "25px",
                    display: "flex"
                  }}
                />
                <Typography variant="caption" sx={{ marginLeft: "8px" }}>
                  {queryToString(d.query)}
                </Typography>
                <Typography variant="caption" sx={{ marginLeft: "8px" }}>
                  {d.result.label}
                </Typography>
              </Box>
            )) :
            <Typography variant="h6" component="div">
            {"No hay cuadro explicativo"}
          </Typography>
          }
        </CardContent>
      </Card>
    </Box>
  );
}
