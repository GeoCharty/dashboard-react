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
import FirebaseContext from '../..//services/firebase/context';

import networkServices from "./../../services/network";
import attributeServices from "./../../services/attribute";
import pointServices from "./../../services/point";
import Utils from "./../../utils";


import HighchartsReact from 'highcharts-react-official';
import {
  firebase
} from "./../../services/firebase/firebase";
import CONSTANTS from "./../../utils/constants";
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts);

const {
  getTimestamps
} = Utils;
const {
  DATE_RANGE
} = CONSTANTS;

const options = (attribute, data) => ({
  chart: {
    height: (278 / 408 * 100) + '%',
    zoomType: 'x',
    style: {
      fontFamily: 'inherit'
    },
    backgroundColor: ""
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
    type: 'datetime',
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
      }
    },
    area: {
      fillOpacity: 0.30
    },

  },
  series: [{
    type: "area",
    name: attribute.name,
    data: data?.length ? data : []
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
  },
  accessibility: {
    enabled: true
  }
})

export default function NodeDetail() {
  const { db } = useContext(FirebaseContext);

  const {
    lightMode,
    dashboard: {
      selectedNode: {
        id: nodeId,
        name: nodeName = "Node name",
        description: nodeDescription = "Node description"
      } = {}
    } = {},
    setDashboard
  } = useContext(MainContext);
  const [network, setNetwork] = useState();
  const {
    name: networkName = "Network name"
  } = network || {};
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, selectAttribute] = useState();
  const [selectedDateRange, selectDateRange] = useState(DATE_RANGE.TODAY);
  const [tabIndex, setTabIndex] = useState(0);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // let isSubscribed = true;
    const fetchData = async () => {
      const data = await attributeServices.getByNodeId({ nodeId });
      setAttributes(data);
      selectAttribute(data?.[0]);
      
      const data2 = await networkServices.getByNodeId({ nodeId });
      setNetwork(data2?.[0]);
    }
    fetchData().catch(console.error);
    // return () => isSubscribed = false;
  }, [])

  useEffect(() => {
    if (lightMode == 'default') Light(Highcharts);
    if (lightMode == 'dark' || lightMode == undefined) Dark(Highcharts);
  }, []);

  useEffect(() => {
    if (![selectedAttribute, selectedDateRange].includes(undefined) &&
      tabIndex == 1) {
      const {
        id: attributeId
      } = selectedAttribute;

      const params = {
        nodeId,
        attributeId,
        dateRange: getTimestamps(selectedDateRange)
      }

      const fetchData = async () => {
        const data = await pointServices.getByDateRange(params);
        const {
          result = []
        } = data;
        setPoints(result.map(r => [new Date(r.time).valueOf(), Number(r.measure_value)]));
      }
      fetchData().catch(console.error);
    }
  }, [selectedAttribute, selectedDateRange])

  useEffect(() => {

    if (selectedAttribute?.node_attribute_id) {
      
      const syncAttribute = () => {
        db
          .collection('node_attribute')
          .doc(String(selectedAttribute.node_attribute_id))
          .onSnapshot((snapshot, error) => {
            if (error) {
              console.log(error);
            } else {
              const document = snapshot.data();
              console.log("Firebase read");
              if(document){
                setAttributes(lastAttributes => {
                  return lastAttributes.map(att => {
                    if(att.id == document.attributeId){
                      if(att.value != undefined) att.lastValue = att.value
                      if(document.attributeValue != undefined) att.value = document.attributeValue
                    }
                    return att;
                  })
                })
              }
            }
          });
      }
      syncAttribute();
      // eslint-disable-next-line
    }
  }, [selectedAttribute]);

  console.log("modal", {nodeId, attributeId: selectedAttribute?.id})
  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        top: "calc((100vh - 550px) / 2)",
        left: "calc((100vw - 450px) / 2)",
        zIndex: "100",
        width: "450px",
        height: "550px",
        maxWidth: "450px",
        maxHeight: "550px",
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
      }} onClick={() => { setDashboard({ selectedNode: undefined }) }}>
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
        square
        variant="outlined"
        sx={{
          boxSizing: "border-box",
          height: "72px"
        }}
      >
        <Tabs
          variant="fullWidth"
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
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
          tabIndex === 1 &&
          <Box sx={{ width: "100%" }}>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="attribute-label">Attribute</InputLabel>
              <Select
                autoWidth
                labelId="attribute-label"
                id="attribute"
                renderValue={(value) => value.name}
                value={selectedAttribute}
                onChange={(event) => selectAttribute(event.target.value)}
              >
                {
                  attributes?.map((a, idx) => (
                    <MenuItem key={`${a.id} - ${idx}`} value={a}>{a.name}</MenuItem>
                  ))
                }
              </Select></FormControl>
            <FormControl variant="filled" sx={{ ml: "16px", minWidth: 120 }}>

              <InputLabel id="date-range-label">Date range</InputLabel>
              <Select
                autoWidth
                labelId="date-range-label"
                id="date-range"
                renderValue={(value) => value.label}
                value={selectedDateRange}
                onChange={(event) => selectDateRange(event.target.value)}
              >
                {
                  Object.values(DATE_RANGE).map(dateRange => (
                    <MenuItem
                      key={dateRange.id}
                      value={dateRange}>
                      {dateRange.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Box sx={{
              mt: "16px", width: "100%", height: "calc(100% - 202px)"
            }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={options(selectedAttribute, points)}
              />
            </Box>
          </Box>
        }
        {
          tabIndex === 0 &&
          attributes?.map((a, idx) => {
            return (
              <Paper
                variant="outlined"
                square
                key={`${a.id} - ${idx}`}
                sx={{
                  height: "100px",
                  p: "8px",
                  minWidth: "100px"
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
                  {a.value != undefined ? a.value : "NA"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {
                    a.value != undefined &&
                    a.lastValue != undefined &&
                    <>
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
          })
        }
      </Paper>
    </Paper>
  );
}
