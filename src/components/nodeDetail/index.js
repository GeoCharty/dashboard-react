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

import networkServices from "./../../services/network";
import attributeServices from "./../../services/attribute";
import pointServices from "./../../services/point";
import Utils from "./../../utils";
import NodeDetailAttribute from "./nodeDetailAttribute";
import LineChartOptions from "./LineChartOptions";

import HighchartsReact from 'highcharts-react-official';

import CONSTANTS from "./../../utils/constants";
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts);

const {
  getTimestamps
} = Utils;
const {
  DATE_RANGE
} = CONSTANTS;

export default function NodeDetail() {
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
  const [lineChartOptions, setLineChartOptions] = useState(LineChartOptions);

  console.log("lineChartOptions", lineChartOptions);

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
    if (lightMode === 'default') Light(Highcharts);
    if (lightMode === 'dark' || lightMode === undefined) Dark(Highcharts);
  }, [lightMode]);

  useEffect(() => {
    if (
      selectedAttribute?.id !== undefined &&
      selectedDateRange?.id !== undefined &&
      tabIndex == 1) {
      const {
        id: attributeId
      } = selectedAttribute;

      const params = {
        nodeId,
        attributeId,
        dateRange: getTimestamps(selectedDateRange)
      }
      console.log("params", params);

      const fetchData = async () => {
        const data = await pointServices.getByDateRange(params);
        let {
          result = []
        } = data;
        result = result.map(r => [new Date(r.time).valueOf(), Number(r.measure_value)]);
        setLineChartOptions(lineChartOptions => ({
          ...lineChartOptions,
          series: [
            {
              type: "area",
              name: selectedAttribute.name,
              data: result
            }
          ]
        }))
      }
      fetchData()
    }
  }, [tabIndex, lineChartOptions?.series?.length, selectedAttribute?.id, selectedDateRange?.id]);
  console.log("modal", { nodeId, attributeId: selectedAttribute?.id })
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
                options={lineChartOptions}
              />
            </Box>
          </Box>
        }
        {
          tabIndex === 0 &&
          attributes?.map((attribute, idx) => {
            return (
              <NodeDetailAttribute
                key={`${attribute.id}`}
                attribute={attribute}
                setAttributes={setAttributes} />);
          })
        }
      </Paper>
    </Paper>
  );
}
