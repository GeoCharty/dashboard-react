import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SensorsIcon from "@mui/icons-material/Sensors";
import DateRangeIcon from "@mui/icons-material/DateRange";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function NodeDetail(props) {
  const [age, setAge] = useState('');

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const {
    node: {
      name: nodeName = "Roter 300-A",
      description: nodeDescription = "Edificio 205"
    } = {},
    network = {}
  } = props;

  const { name: networkName = "FIEC - ESPOL" } = network;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const attributes = [
    {
      id: "Temperature",
      name: "Temperature",
      lastValue: 90,
      value: 98.3,
      unit: "K"
    },
    {
      id: "Connected users",
      name: "Connected users",
      value: 35,
      lastValue: 45,
      unit: ""
    },
    {
      id: "Voltage",
      name: "Voltage",
      unit: "V",
      value: 12,
      lastValue: 12
    },
    {
      id: "Temperature",
      name: "Temperature",
      lastValue: 90,
      value: 98.3,
      unit: "K"
    },
    {
      id: "Connected users",
      name: "Connected users",
      value: 35,
      lastValue: 45,
      unit: ""
    },
    {
      id: "Voltage",
      name: "Voltage",
      unit: "V",
      value: 12,
      lastValue: 12
    },
    {
      id: "Temperature",
      name: "Temperature",
      lastValue: 90,
      value: 98.3,
      unit: "K"
    },
    {
      id: "Connected users",
      name: "Connected users",
      value: 35,
      lastValue: 45,
      unit: ""
    },
    {
      id: "Voltage",
      name: "Voltage",
      unit: "V",
      value: 12,
      lastValue: 12
    }
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        position: "absolute",
        zIndex: "100",
        width: "450px",
        height: "450px",
        maxWidth: "450px",
        maxHeight: "450px"
      }}
    >
      <Box
        sx={{
          height: "80px",
          boxSizing: "border-box"
        }}
      >
        <Typography align="center" variant="h6" component="div">
          {nodeName}
        </Typography>
        <Typography align="center" variant="caption" component="div">
          {nodeDescription}
        </Typography>
        <Typography align="center" variant="subtitle1" component="div">
          {networkName}
        </Typography>
      </Box>
      <Paper
        elevation={12}
        sx={{
          boxSizing: "border-box",
          height: "72px"
        }}
      >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<SensorsIcon />} label="REAL TIME" />
          <Tab icon={<DateRangeIcon />} label="HISTORICAL" />
        </Tabs>
      </Paper>

      <Paper
        sx={{
          overflowY: "scroll",
          p: "16px",
          display: "flex",
          gap: "16px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          height: "calc(100% - 184px)"
        }}
      >
        {
          value === 1 &&
          <Box>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="attribute-label">Attribute</InputLabel>
              <Select
                autoWidth
                labelId="attribute-label"
                id="attribute"
                value={age}
                onChange={handleChangeAge}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select></FormControl>
            <FormControl variant="filled" sx={{ ml: "16px", minWidth: 120 }}>

              <InputLabel id="date-range-label">Date range</InputLabel>
              <Select
                autoWidth
                labelId="date-range-label"
                id="date-range"
                value={age}
                onChange={handleChangeAge}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

        }
        {
          value === 0 &&
          attributes.map((a, idx) => {
            return (
              <Paper
                variant="outlined"
                square
                key={String(idx)}
                sx={{
                  height: "100px",
                  p: "8px",
                  width: "auto"
                }}
              >
                <Typography
                  align="left"
                  color="text.secondary"
                  variant="caption"
                  component="div"
                >
                  {a.name}
                </Typography>
                <Typography align="left" variant="h4" component="div">
                  {a.value}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    align="center"
                    color={a.value < a.lastValue ? "error.dark" : "success.dark"}
                    variant="button"
                    component="div"
                  >
                    {a.value < a.lastValue ? "-" : "+"}
                    {Math.round(
                      a.value < a.lastValue
                        ? a.lastValue / a.value
                        : a.value / a.lastValue
                    )}
                    {"%"}
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
                </Box>
              </Paper>
            );
          })
        }
      </Paper>
    </Paper>
  );
}
