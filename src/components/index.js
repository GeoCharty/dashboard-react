
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
//modules
import MainContext from './Context';
import Themes from './../themes';
import {
  getRawAttribute,
  getDiscretization,
  getPoints
} from "./../services";
//components
import Header from './../components/header';
import Drawer from './../components/drawer';
import Content from './../components/content';

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
      attributes: [],
      points: [],
      discretization: {}
    }
  }

  setProcess = (newProcesState) => {
    const {
      state: { process }
    } = this;
    this.setState({
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
    const rawAttributes = await getRawAttribute({});
    const attribDiscretization = await getDiscretization({});
    const currentPoints = await getPoints({});
    console.log("..---", attribDiscretization)
    this.setState({
      ...this.state,
      dashboard: {
        ...this.state.dashboard,
        attributes: rawAttributes || [],
        discretization: attribDiscretization || {},
        points: currentPoints || []
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.useDark !== this.props.useDark) {
      this.setState({
        theme: this.props.useDark ? 'dark' : 'default'
      });
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
      toogleDrawer,
      setTheme,
      setProcess
    } = this;

    const {
      isLoading,
      progress
    } = process
    console.log("0000theme:v ", theme);

    return (
      <MainContext.Provider
        value={{
          drawerIsOpen,
          toogleDrawer,
          lightMode,
          setTheme,
          setProcess,
          process,
          theme,
          dashboard
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
              <Header />
              <Drawer />
              <Content />
            </Paper>
          </SnackbarProvider>
        </ThemeProvider>
      </MainContext.Provider>
    )
  }
}

const withTheme = (Component) => (props) => {
  const matches = useMediaQuery('(prefers-color-scheme: dark)');
  return <Component {...props} useDark={matches} />;
}

export default withTheme(App);