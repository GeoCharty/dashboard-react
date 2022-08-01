
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

//components
import Header from './../components/header';
import Drawer from './../components/drawer';
import Content from './../components/content';
import NodeDetail from './../components/nodeDetail';

import {
  getFeatureCollection
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
    const currentAttributes = await attributeServices.getByOrganizationId({organizationId: "32186570"});
    const currentNodes = await nodeServices.getByOrganizationId({organizationId: "32186570"});
    const currentAttribute = currentAttributes?.[0];
    const currentDiscretization = await discretizationServices.getByAttributeId(currentAttribute)
    this.setDashboard({
      selectedAttribute: currentAttribute,
      attributes: currentAttributes || [],
      discretization: currentDiscretization?.[0] || {},
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
    if (prevState.dashboard?.selectedAttribute?.id !== this.state.dashboard?.selectedAttribute?.id) {
      const currentDiscretizations = await discretizationServices.getByAttributeId(this.state.dashboard?.selectedAttribute)
      const currentDiscretization = currentDiscretizations?.[0]
      this.setDashboard({
        discretization: currentDiscretization || {}
      })
    }
  }

  render() {
    const {
      drawerIsOpen,
      lightMode,
      process,
      theme,
      dashboard
    } = this.state;

    const {
      selectedNode
    } = dashboard;
    console.log("selectedNode", selectedNode);

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
          lightMode,
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
  return <Component {...props} useDark={matches} />;
}

export default withTheme(App);