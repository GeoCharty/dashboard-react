import React, { useState, useEffect, useContext } from "react";
import MainContext from '../Context';
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
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Highcharts from 'highcharts'
import Dark from 'highcharts/themes/dark-unica';
import Light from 'highcharts/themes/brand-light';
import HighchartsReact from 'highcharts-react-official'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts);
const options = (attribute, timeRange) => ({
  chart: {
    style: {
      fontFamily: 'inherit'
    }
  },
  title: {
    text: ""
  },
  subtitle: {
    text: '',
  },
  yAxis: {
    title: {
      text: attribute.name
    },
    gridLineWidth: 0.75,
    gridLineDashStyle: "dash"
  },
  xAxis: {
    title: {
      text: "Time range"
    },
    accessibility: {
      rangeDescription: 'Range: 2010 to 2017'
    },
    gridLineWidth: 0.75,
    gridLineDashStyle: "dash"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    },
    area: {
      fillOpacity: 0.30
    },

  },
  series: [{
    type: "area",
    name: attribute.name,
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  },
  exporting: {
    enabled: true
  }
})

export default function NodeDetail(props) {
  const {
    lightMode
  } = useContext(MainContext);

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
    }
  ];

  useEffect(() => {

    console.log("lightMode", lightMode);
    if (lightMode == 'default') {
      Light(Highcharts);
    } else if (lightMode == 'dark' || lightMode == undefined) {
      console.log("dark moded")
      Dark(Highcharts);
    }
  }, [])

  const [selectedAttribute, selectAttribute] = useState(attributes?.[0]);
  const [selectedDateRange, selectDateRange] = useState("today");

  const handleChangeAttribute = (event) => {
    selectAttribute(event.target.value);
  };
  const handleChangeDateRange = (event) => {
    selectDateRange(event.target.value)
  }

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



  return (
    <Paper
      elevation={1}
      sx={{
        position: "absolute",
        zIndex: "100",
        width: "450px",
        height: "450px",
        maxWidth: "450px",
        maxHeight: "450px",
        pt: "16px",
        boxSizing: "border-box"
      }}
    >
      <IconButton aria-label="delete" sx={{
        color: "text.primary",
        position: "absolute",
        top: "16px",
        right: "16px",
        p: 0
      }}>
        <CloseIcon sx={{ p: 0, m: 0 }} />
      </IconButton>

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
        variant="outlined"
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
          <Box sx={{ width: "100%" }}>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="attribute-label">Attribute</InputLabel>
              <Select
                autoWidth
                labelId="attribute-label"
                id="attribute"
                renderValue={(value) => value.name}
                value={selectedAttribute}
                onChange={handleChangeAttribute}
              >
                {
                  attributes.map((a, idx) => (
                    <MenuItem value={a}>{a.name}</MenuItem>
                  ))
                }
              </Select></FormControl>
            <FormControl variant="filled" sx={{ ml: "16px", minWidth: 120 }}>

              <InputLabel id="date-range-label">Date range</InputLabel>
              <Select
                autoWidth
                labelId="date-range-label"
                id="date-range"
                value={selectedDateRange}
                onChange={handleChangeDateRange}
              >
                <MenuItem value={"this month"}>This month</MenuItem>
                <MenuItem value={"this year"}>This year</MenuItem>
                <MenuItem value={"today"}>Today</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{
              mt: "16px", width: "100%"
            }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={options(selectedAttribute)}
              />
            </Box>
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
