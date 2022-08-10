
//react
import React from "react";
// mui ui
import {
  LinearProgress,
  useMediaQuery,
  Paper
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//other libs
import { SnackbarProvider } from 'notistack';
import FirebaseProvider from './../services/firebase';

//modules
import MainContext from './Context';
import Themes from './../themes';
import attributeServices from "./../services/attribute";
import nodeServices from "./../services/node";
import discretizationServices from "./../services/attributeDiscretization";
import pointServices from "./../services/point";

//components
import Header from './../components/header';
import Drawer from './../components/drawer';
import Content from './../components/content';
import NodeDetail from './../components/nodeDetail';

import {
  getFeatureCollection,
  getColorByLastValue
} from "./../utils";

class App extends React.Component {
  state = {
    drawerIsOpen: false,
    theme: this.props.useDark ? 'dark' : 'default',
    process: {
      isLoading: false,
      error: undefined,
      progress: {
        color: 'primary',
        value: 0,
        variant: 'indeterminate'
      }
    },
    dashboard: {
      selectedAttribute: undefined,
      attributes: [],
      nodes: [],
      discretization: {},
      selectedNode: undefined
    }
  }

  setDashboard = (dashboard) => {
    this.setState({
      ...this.state,
      dashboard: {
        ...this.state.dashboard,
        ...(dashboard || {})
      }
    });
  }

  setProcess = (newProcesState) => {
    const {
      state,
      setState
    } = this;
    const {
      process
    } = state;
    setState({
      ...state,
      process: {
        ...process,
        ...newProcesState,
        progress: {
          ...process.progress,
          ...(newProcesState.progress || {}),
        }
      }
    });
  }

  toogleDrawer = () => {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    })
  }

  setTheme = (theme) => {
    this.setState({
      theme
    })
  }

  async componentDidMount() {
    const currentAttributes = await attributeServices.getByOrganizationId({ organizationId: "26235671" });
    let currentNodes = await nodeServices.getByOrganizationId({ organizationId: "26235671" });
    //fallback for mapbox location handling
    currentNodes = currentNodes.map(c => ({
      ...c,
      location: {
        ...c.location,
        coordinates: c.location.coordinates.reverse()
      }
    }));
    const currentAttribute = currentAttributes?.[0];
    const currentDiscretizations = await discretizationServices.getByAttributeId(currentAttribute)
    const currentDiscretization = currentDiscretizations?.[0]
    const lastNodeValues = await pointServices.getLastValues({
      nodeIds: currentNodes.map(c => c.id),
      attributeId: currentAttribute.id
    });

    currentNodes = currentNodes.map(c => {
      const {
        last: lastValue
      } = lastNodeValues.find(l => l.node_id == c.id) || {}
      return {
        ...c,
        lastValue: Number(lastValue),
        color: getColorByLastValue(Number(lastValue), currentDiscretization.map || [])
      }
    })

    this.setDashboard({
      selectedAttribute: currentAttribute,
      attributes: currentAttributes || [],
      discretization: currentDiscretization || {},
      nodes: currentNodes || [],
      nodesAsFeatures: getFeatureCollection(currentNodes || [])
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.useDark !== this.props.useDark) {
      this.setState({
        theme: this.props.useDark ? 'dark' : 'default'
      });
    }
    if (prevState.dashboard?.selectedAttribute?.id !== undefined &&
      prevState.dashboard?.selectedAttribute?.id !== 
      this.state.dashboard?.selectedAttribute?.id) {
      const currentDiscretizations = await discretizationServices.getByAttributeId(this.state.dashboard?.selectedAttribute)
      const currentDiscretization = currentDiscretizations?.[0]
      
      let currentNodes = this.state.dashboard.nodes;

      const lastNodeValues = await pointServices.getLastValues({
        nodeIds: currentNodes.map(c => c.id),
        attributeId: this.state.dashboard?.selectedAttribute?.id
      });
   
      currentNodes = currentNodes.map(c => {
        const {
          last: lastValue
        } = lastNodeValues.find(l => l.node_id == c.id) || {}
        return {
          ...c,
          lastValue: Number(lastValue),
          color: getColorByLastValue(Number(lastValue), currentDiscretization.map || [])
        }
      })
      
      this.setDashboard({
        discretization: currentDiscretization || {},
        nodes: currentNodes || [],
        nodesAsFeatures: getFeatureCollection(currentNodes || [])
      });
    }
  }

  render() {
    const {
      drawerIsOpen,
      process,
      theme,
      dashboard
    } = this.state;

    const {
      toogleDrawer,
      setTheme,
      setProcess,
      setDashboard
    } = this;

    const {
      isLoading,
      progress
    } = process

    return (
      <FirebaseProvider>
        <MainContext.Provider
          value={{
            drawerIsOpen,
            toogleDrawer,
            setTheme,
            setProcess,
            process,
            theme,
            dashboard,
            setDashboard
          }}>
          <ThemeProvider theme={Themes[theme]}>
            <SnackbarProvider preventDuplicate maxSnack={3}>
              <Paper
                square
                sx={{
                  minHeight: '100%',
                  display: "initial",
                  transform: 'translateZ(0px)',
                  flexGrow: 1,
                }}>
                {
                  isLoading &&
                  <LinearProgress
                    sx={{
                      height: "4px",
                      zIndex: "999",
                      position: "fixed",
                      width: "100%"
                    }}
                    variant={progress.variant}
                    value={progress.value}
                    color={progress.color} />
                }
                {
                  dashboard.selectedNode &&
                  <NodeDetail />
                }
                <Header />
                <Drawer />
                <Content />

              </Paper>
            </SnackbarProvider>
          </ThemeProvider>
        </MainContext.Provider>
      </FirebaseProvider>
    )
  }
}

const withTheme = (Component) => (props) => {
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  return <Component {...props} useDark={false} />;
}

export default withTheme(App);