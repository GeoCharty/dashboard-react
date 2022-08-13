import React, { useEffect, useContext, useCallback, useState } from "react";
import MainContext from '../../Context';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { styled } from '@mui/material/styles';

import FirebaseContext from '../../../services/firebase/context';
import {
  getColorByLastValue
} from "./../../../utils";

// text-overflow: ellipsis;
//     overflow: hidden;
//     white-space: nowrap;

const StyledTypography = styled(Typography)(({ theme }) => ({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap"
}));

export default function NodeDetailAttribute(props) {
  const {
    theme,
    dashboard: {
      discretizationMap = {}
    } = {}
  } = useContext(MainContext);

  const { db } = useContext(FirebaseContext);
  const {
    attribute: {
      id: attributeId,
      name: attributeName,
      value: attributeValue,
      lastValue: attributeLastValue,
      node_attribute_id: nodeAttributeId
    } = {},
    setAttributes
  } = props;
  const [statusColor, setStatusColor] = useState("transparent");

  const updateStatusColor = useCallback((lastValue) => {
    const currentDiscretizations = discretizationMap?.[attributeId] || [];
    const discretization = currentDiscretizations?.[0] || {}
    setStatusColor(getColorByLastValue(lastValue, discretization?.map));
  })

  useEffect(() => {
    let unsubscribe = null;
    if (nodeAttributeId !== undefined) {
      unsubscribe = db
        .collection('node_attribute')
        .doc(String(nodeAttributeId))
        .onSnapshot((snapshot, error) => {
          if (error) console.log(error);
          const document = snapshot.data();
          console.log("Firebase read realtime");
          if (document) {
            setAttributes(lastAttributes => {
              return lastAttributes.map(att => {
                if (att.id === document.attributeId) {
                  if (att.value !== undefined) att.lastValue = att.value
                  if (document.attributeValue !== undefined) att.value = parseFloat(document.attributeValue.toFixed(2))
                  updateStatusColor(att.value);
                }
                return att;
              })
            })
          }
        });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, []);

  return (
    <Paper
      variant="outlined"
      square
      sx={(theme) => ({
        height: "100px",
        p: "8px",
        backgroundColor: statusColor || theme.palette.background.paper,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      })}
    >
      <StyledTypography
        align="left"
        color="text.secondary"
        variant="caption"
        component="div"
      >
        {attributeName}
      </StyledTypography>
      <StyledTypography align="left" variant="h4" component="div">
        {attributeValue !== undefined ? attributeValue : "NA"}
      </StyledTypography>
      {
        attributeValue !== undefined &&
        attributeLastValue !== undefined &&
        <Box sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "8px"
        })}>
          <Typography
            align="center"
            sx={{
              ml: "5px"
            }}
            color={`${
              attributeValue < attributeLastValue 
              ? "error" 
              : "success"}.${
                theme === "default" 
                ? "dark" 
                : "light"}`}
            variant="button"
            component="div"
          >
            {attributeValue < attributeLastValue ? "-" : "+"}
            {Math.round(
              attributeValue < attributeLastValue
                ? attributeLastValue / attributeValue
                : attributeValue / attributeLastValue
            ) + "%"}
          </Typography>
          <Typography
            sx={{ pl: "5px" }}
            align="center"
            color="text.secondary"
            variant="caption"
            component="div"
          >
            {"variación"}
          </Typography>
        </Box>
      }
    </Paper>
  );
}
