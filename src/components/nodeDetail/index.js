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

import HighchartsReact from 'highcharts-react-official';

import CONSTANTS from "./../../utils/constants";
const {
  DATE_RANGE
} = CONSTANTS;
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts);

const options = (attribute, timeRange) => ({
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
    data: [
      [
        1167609600000,
        0.7537
      ],
      [
        1167696000000,
        0.7537
      ],
      [
        1167782400000,
        0.7559
      ],
      [
        1167868800000,
        0.7631
      ],
      [
        1167955200000,
        0.7644
      ],
      [
        1168214400000,
        0.769
      ],
      [
        1168300800000,
        0.7683
      ],
      [
        1168387200000,
        0.77
      ],
      [
        1168473600000,
        0.7703
      ],
      [
        1168560000000,
        0.7757
      ],
      [
        1168819200000,
        0.7728
      ],
      [
        1168905600000,
        0.7721
      ],
      [
        1168992000000,
        0.7748
      ],
      [
        1169078400000,
        0.774
      ],
      [
        1169164800000,
        0.7718
      ],
      [
        1169424000000,
        0.7731
      ],
      [
        1169510400000,
        0.767
      ],
      [
        1169596800000,
        0.769
      ],
      [
        1169683200000,
        0.7706
      ],
      [
        1169769600000,
        0.7752
      ],
      [
        1170028800000,
        0.774
      ],
      [
        1170115200000,
        0.771
      ],
      [
        1170201600000,
        0.7721
      ],
      [
        1170288000000,
        0.7681
      ],
      [
        1170374400000,
        0.7681
      ],
      [
        1170633600000,
        0.7738
      ],
      [
        1170720000000,
        0.772
      ],
      [
        1170806400000,
        0.7701
      ],
      [
        1170892800000,
        0.7699
      ],
      [
        1170979200000,
        0.7689
      ],
      [
        1171238400000,
        0.7719
      ],
      [
        1171324800000,
        0.768
      ],
      [
        1171411200000,
        0.7645
      ],
      [
        1171497600000,
        0.7613
      ],
      [
        1171584000000,
        0.7624
      ],
      [
        1171843200000,
        0.7616
      ],
      [
        1171929600000,
        0.7608
      ],
      [
        1172016000000,
        0.7608
      ],
      [
        1172102400000,
        0.7631
      ],
      [
        1172188800000,
        0.7615
      ],
      [
        1172448000000,
        0.76
      ],
      [
        1172534400000,
        0.756
      ],
      [
        1172620800000,
        0.757
      ],
      [
        1172707200000,
        0.7562
      ],
      [
        1172793600000,
        0.7598
      ],
      [
        1173052800000,
        0.7645
      ],
      [
        1173139200000,
        0.7635
      ],
      [
        1173225600000,
        0.7614
      ],
      [
        1173312000000,
        0.7604
      ],
      [
        1173398400000,
        0.7603
      ],
      [
        1173657600000,
        0.7602
      ],
      [
        1173744000000,
        0.7566
      ],
      [
        1173830400000,
        0.7587
      ],
      [
        1173916800000,
        0.7562
      ],
      [
        1174003200000,
        0.7506
      ],
      [
        1174262400000,
        0.7518
      ],
      [
        1174348800000,
        0.7522
      ],
      [
        1174435200000,
        0.7524
      ],
      [
        1174521600000,
        0.7491
      ],
      [
        1174608000000,
        0.7505
      ],
      [
        1174867200000,
        0.754
      ],
      [
        1174953600000,
        0.7493
      ],
      [
        1175040000000,
        0.7493
      ],
      [
        1175126400000,
        0.7491
      ],
      [
        1175212800000,
        0.751
      ],
      [
        1175472000000,
        0.7483
      ],
      [
        1175558400000,
        0.7487
      ],
      [
        1175644800000,
        0.7491
      ],
      [
        1175731200000,
        0.7479
      ],
      [
        1175817600000,
        0.7479
      ],
      [
        1176076800000,
        0.7479
      ],
      [
        1176163200000,
        0.7449
      ],
      [
        1176249600000,
        0.7454
      ],
      [
        1176336000000,
        0.7427
      ],
      [
        1176422400000,
        0.7391
      ],
      [
        1176681600000,
        0.7381
      ],
      [
        1176768000000,
        0.7382
      ],
      [
        1176854400000,
        0.7366
      ],
      [
        1176940800000,
        0.7353
      ],
      [
        1177027200000,
        0.7351
      ],
      [
        1177286400000,
        0.7377
      ],
      [
        1177372800000,
        0.7364
      ],
      [
        1177459200000,
        0.7328
      ],
      [
        1177545600000,
        0.7356
      ],
      [
        1177632000000,
        0.7331
      ],
      [
        1177891200000,
        0.7351
      ],
      [
        1177977600000,
        0.7351
      ],
      [
        1178064000000,
        0.736
      ],
      [
        1178150400000,
        0.7347
      ],
      [
        1178236800000,
        0.7375
      ],
      [
        1178496000000,
        0.7346
      ],
      [
        1178582400000,
        0.7377
      ],
      [
        1178668800000,
        0.7389
      ],
      [
        1178755200000,
        0.7394
      ],
      [
        1178841600000,
        0.7416
      ],
      [
        1179100800000,
        0.7382
      ],
      [
        1179187200000,
        0.7388
      ],
      [
        1179273600000,
        0.7368
      ],
      [
        1179360000000,
        0.74
      ],
      [
        1179446400000,
        0.7421
      ],
      [
        1179705600000,
        0.7439
      ],
      [
        1179792000000,
        0.7434
      ],
      [
        1179878400000,
        0.7414
      ],
      [
        1179964800000,
        0.7437
      ],
      [
        1180051200000,
        0.7441
      ],
      [
        1180310400000,
        0.7434
      ],
      [
        1180396800000,
        0.7403
      ],
      [
        1180483200000,
        0.7453
      ],
      [
        1180569600000,
        0.7434
      ],
      [
        1180656000000,
        0.7444
      ],
      [
        1180915200000,
        0.7418
      ],
      [
        1181001600000,
        0.7391
      ],
      [
        1181088000000,
        0.7401
      ],
      [
        1181174400000,
        0.7425
      ],
      [
        1181260800000,
        0.7492
      ],
      [
        1181520000000,
        0.7489
      ],
      [
        1181606400000,
        0.7494
      ],
      [
        1181692800000,
        0.7527
      ],
      [
        1181779200000,
        0.7518
      ],
      [
        1181865600000,
        0.7512
      ],
      [
        1182124800000,
        0.7461
      ],
      [
        1182211200000,
        0.7462
      ],
      [
        1182297600000,
        0.7449
      ],
      [
        1182384000000,
        0.7465
      ],
      [
        1182470400000,
        0.7441
      ],
      [
        1182729600000,
        0.743
      ],
      [
        1182816000000,
        0.743
      ],
      [
        1182902400000,
        0.7443
      ],
      [
        1182988800000,
        0.7427
      ],
      [
        1183075200000,
        0.7406
      ],
      [
        1183334400000,
        0.736
      ],
      [
        1183420800000,
        0.7353
      ],
      [
        1183507200000,
        0.7344
      ],
      [
        1183593600000,
        0.7332
      ],
      [
        1183680000000,
        0.7356
      ],
      [
        1183939200000,
        0.7343
      ],
      [
        1184025600000,
        0.7318
      ],
      [
        1184112000000,
        0.7272
      ],
      [
        1184198400000,
        0.7254
      ],
      [
        1184284800000,
        0.7257
      ],
      [
        1184544000000,
        0.7257
      ],
      [
        1184630400000,
        0.7263
      ],
      [
        1184716800000,
        0.7258
      ],
      [
        1184803200000,
        0.7237
      ],
      [
        1184889600000,
        0.7246
      ],
      [
        1185148800000,
        0.7236
      ],
      [
        1185235200000,
        0.723
      ],
      [
        1185321600000,
        0.7277
      ],
      [
        1185408000000,
        0.7289
      ],
      [
        1185494400000,
        0.7326
      ],
      [
        1185753600000,
        0.7322
      ],
      [
        1185840000000,
        0.7297
      ],
      [
        1185926400000,
        0.732
      ],
      [
        1186012800000,
        0.732
      ],
      [
        1186099200000,
        0.7303
      ],
      [
        1186358400000,
        0.7238
      ],
      [
        1186444800000,
        0.7251
      ],
      [
        1186531200000,
        0.7251
      ],
      [
        1186617600000,
        0.7285
      ],
      [
        1186704000000,
        0.7327
      ],
      [
        1186963200000,
        0.7326
      ],
      [
        1187049600000,
        0.7359
      ],
      [
        1187136000000,
        0.7422
      ],
      [
        1187222400000,
        0.7461
      ],
      [
        1187308800000,
        0.7434
      ],
      [
        1187568000000,
        0.7422
      ],
      [
        1187654400000,
        0.7404
      ],
      [
        1187740800000,
        0.7412
      ],
      [
        1187827200000,
        0.7368
      ],
      [
        1187913600000,
        0.7346
      ],
      [
        1188172800000,
        0.7323
      ],
      [
        1188259200000,
        0.732
      ],
      [
        1188345600000,
        0.7337
      ],
      [
        1188432000000,
        0.7349
      ],
      [
        1188518400000,
        0.7298
      ],
      [
        1188777600000,
        0.7337
      ],
      [
        1188864000000,
        0.7365
      ],
      [
        1188950400000,
        0.736
      ],
      [
        1189036800000,
        0.7317
      ],
      [
        1189123200000,
        0.7302
      ],
      [
        1189382400000,
        0.725
      ],
      [
        1189468800000,
        0.7235
      ],
      [
        1189555200000,
        0.7203
      ],
      [
        1189641600000,
        0.7197
      ],
      [
        1189728000000,
        0.7216
      ],
      [
        1189987200000,
        0.7207
      ],
      [
        1190073600000,
        0.7212
      ],
      [
        1190160000000,
        0.7157
      ],
      [
        1190246400000,
        0.7129
      ],
      [
        1190332800000,
        0.7119
      ],
      [
        1190592000000,
        0.7087
      ],
      [
        1190678400000,
        0.709
      ],
      [
        1190764800000,
        0.708
      ],
      [
        1190851200000,
        0.7053
      ],
      [
        1190937600000,
        0.7054
      ],
      [
        1191196800000,
        0.7027
      ],
      [
        1191283200000,
        0.7061
      ],
      [
        1191369600000,
        0.7046
      ],
      [
        1191456000000,
        0.7089
      ],
      [
        1191542400000,
        0.7075
      ]
    ]
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

export default function NodeDetail() {
  const {
    lightMode,
    dashboard: {
      selectedNode: {
        id: nodeId,
        name: nodeName = "Node name",
        description: nodeDescription = "Node description"
      } = {},

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

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const data = await attributeServices.getByNodeId({ nodeId });
      if (isSubscribed) {
        setAttributes(data);
        selectAttribute(data?.[0]);
      }
    }
    fetchData().catch(console.error);
    return () => isSubscribed = false;
  }, [nodeId]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const data = await networkServices.getByNodeId({ nodeId });
      if (isSubscribed) {
        setNetwork(data?.[0]);
      }
    }
    fetchData().catch(console.error);
    return () => isSubscribed = false;
  }, [nodeId]);

  useEffect(() => {
    if (lightMode == 'default') {
      Light(Highcharts);
    } else if (lightMode == 'dark' || lightMode == undefined) {
      Dark(Highcharts);
    }
  }, []);

  useEffect(()=>{
    if(![selectedAttribute, selectedDateRange].includes(undefined)){
      console.log("Filters", JSON.stringify({selectedAttribute, selectedDateRange}, null, 2));
    }
  }, [selectedAttribute, selectedDateRange])

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
                options={options(selectedAttribute)}
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
