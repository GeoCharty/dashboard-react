import React, { useEffect, useContext } from "react";
import MainContext from '../../Context';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FirebaseContext from '../../../services/firebase/context';
import moment from "moment";

export default function NodeDetailAttribute(props) {
  const {
    theme
  } = useContext(MainContext);

  const { db } = useContext(FirebaseContext);
  const {
    attribute: {
      name: attributeName,
      value: attributeValue,
      lastValue: attributeLastValue,
      node_attribute_id: nodeAttributeId
    } = {},
    setAttributes
  } = props;

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
      sx={{
        height: "100px",
        p: "8px"
      }}
    >
      <Typography
        align="left"
        color="text.secondary"
        variant="caption"
        component="div"
      >
        {attributeName}
      </Typography>
      <Typography align="left" variant="h4" component="div">
        {attributeValue !== undefined ? attributeValue : "NA"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center"
        }}
      >
        {
          attributeValue !== undefined &&
          attributeLastValue !== undefined &&
          <>
            <Typography
              align="center" 
              color={`${attributeValue < attributeLastValue ? "error" : "success"}.${theme === "default" ? "light": "dark"}`}
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
              {"vs. last read"}
            </Typography>
          </>
        }

      </Box>
    </Paper>
  );
}
