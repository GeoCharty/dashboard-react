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
import Grid from '@mui/material/Grid';

import networkServices from "./../../services/network";
import attributeServices from "./../../services/attribute";
import pointServices from "./../../services/point";
import Utils from "./../../utils";
import NodeDetailAttribute from "./nodeDetailAttribute";
import HighchartsReact from 'highcharts-react-official';
import CONSTANTS from "./../../utils/constants";
import FirebaseContext from '../../services/firebase/context';

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts);

const {
  getTimestamps,
  convertToLocalTimestamp
} = Utils;
const {
  DATE_RANGE
} = CONSTANTS;

export default function NodeDetail() {
  const {
    theme,
    dashboard: {
      selectedNode: {
        id: nodeId,
        name: nodeName = "Node name",
        description: nodeDescription = "Node description"
      } = {}
    } = {},
    setDashboard
  } = useContext(MainContext);
  const [trigger, setTrigger] = useState(false);
  const [network, setNetwork] = useState();
  const {
    name: networkName = "Network name"
  } = network || {};
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, selectAttribute] = useState("");
  const [selectedDateRange, selectDateRange] = useState(DATE_RANGE.TODAY);
  const [tabIndex, setTabIndex] = useState(0);
  const [lineChartOptions, setLineChartOptions] = useState({
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
      text: "",
    },
    yAxis: {
      title: {
        text: ""
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
        rangeDescription: 'Line chart data'
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
    series: [
      {
        type: "area",
      }
    ],
    lang: {
      noData: "No data"
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    },
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
      enabled: false
    },
    colors: ["#006064"],
    tooltip: {
      style: {
        backgroundColor: "#1c1c1b"
      }
    },
    time: {
      timezoneOffset: new Date().getTimezoneOffset()
    }
  });
  const { db } = useContext(FirebaseContext);


  useEffect(() => {
    let unsubscribe = null;
    if (selectedAttribute?.node_attribute_id !== undefined) {
      unsubscribe = db
          .collection('node_attribute')
          .doc(String(selectedAttribute?.node_attribute_id))
          .onSnapshot((snapshot, error) => {
            if (error) console.log(error);
            const document = snapshot.data();
            console.log("Firebase read Historical: ");
            if (
              document && 
              document.attributeValue !== undefined && 
              document.attributeValue !== null &&
              document.timestamps !== undefined &&
              document.timestamps !== null
            ) {
              setLineChartOptions(lineChartOptions => {
                const newValues = lineChartOptions?.series?.[0]?.data || []
                if(document.timestamps != newValues[0]?.[0]){
                  newValues.push([
                    document.timestamps,
                    parseFloat(Number(document.attributeValue).toFixed(2))
                  ]);
                  newValues.sort((a, b) => {
                    return b[0] - a[0]
                  });
                  console.log('V Result: ', newValues);
                  return {
                    ...lineChartOptions,
                    series: [
                      {
                        ...(lineChartOptions?.series?.[0] || {}),
                        data: newValues
                      }
                    ]
                  }
                } else {
                  return lineChartOptions
                }
              })
            }
          });
    }
    return () => {
      if (unsubscribe) {
        console.log("Firebase unsubscribe Historical: ");
        unsubscribe();
      }
    }
  }, [trigger]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await attributeServices.getByNodeId({ nodeId });
      setAttributes(data);
      selectAttribute(data?.[0]);

      const data2 = await networkServices.getByNodeId({ nodeId });
      setNetwork(data2?.[0]);
    }
    fetchData()  
  }, [])

  useEffect(() => {
    if (theme === 'default') Light(Highcharts);
    if (theme === 'dark' || theme === undefined) Dark(Highcharts);
  }, [theme]);

  useEffect(() => {
    if (
      selectedAttribute?.id !== undefined &&
      selectedDateRange?.id !== undefined &&
      tabIndex == 1
    ) {
      const {
        id: attributeId
      } = selectedAttribute;

      const params = {
        nodeId,
        attributeId,
        dateRange: getTimestamps(selectedDateRange)
      }

      const fetchData = async () => {
        console.log('1');
        const data = await pointServices.getByDateRange(params);
        let {
          result = []
        } = data;
        result = result.map(r => {
          const rTime = convertToLocalTimestamp(r.time);
          return [rTime, parseFloat(Number(r.measure_value).toFixed(2))]
        });
        result.sort((a, b) => {
          return b[0] - a[0]
        });
        console.log('RESULT: ', result);
        setLineChartOptions(lineChartOptions => ({
          ...lineChartOptions,
          series: [
            {
              ...lineChartOptions?.series?.[0],
              name: selectedAttribute.name,
              data: result
            }
          ]
        }))
        console.log('2');
        setTrigger(!trigger);
      }
      fetchData()
    }      
    return () => {
      if(selectedAttribute?.id !== undefined && tabIndex == 1){
        console.log('AQUI ME DESUSB¿CRIBIRIA');
      }
    }
  }, [tabIndex, selectedAttribute?.id, selectedDateRange?.id]);
  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        top: "calc((100vh - 550px) / 2)",
        left: "calc((100vw - 450px) / 2)",
        zIndex: "999",
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
                options={lineChartOptions}
                constructorType={'chart'}
                allowChartUpdate={true}
                immutable={false}
                updateArgs={[true, true, true]}
              />
            </Box>
          </Box>
        }
        {
          tabIndex === 0 &&
          <Grid container spacing={2}>
            {
              attributes?.map((attribute, idx) => (
                <Grid key={`${attribute.id}`} item xs={4}>
                  <NodeDetailAttribute
                    attribute={attribute}
                    setAttributes={setAttributes} />
                </Grid>))
            }
          </Grid>
        }
      </Paper>
    </Paper>
  );
}
