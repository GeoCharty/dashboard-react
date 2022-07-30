import React, { useContext } from 'react';
import MainContext from './../Context';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const {
    drawerIsOpen,
    toogleDrawer,
    dashboard: {
      attributes,
      attribute
    } = {},
    setDashboard
  } = useContext(MainContext);
  const theme = useTheme();
  const handleDrawerClose = () => {
    toogleDrawer(false);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerIsOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <FormControl>
        {
          attributes?.length > 0
            ? (
              <>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{
                    textAlign: "center",
                    paddingTop: "12px"
                  }}>
                  Select a metric
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={attribute?.id}
                  onChange={
                    (_, value) => { 
                      setDashboard({
                        attribute: attributes.find(a => a?.id == value)
                      });
                    }
                  }
                >
                  <List>
                    {
                      attributes.map(attribute => (
                        <ListItem 
                          key={attribute.id} 
                          disablePadding>
                          <ListItemButton>
                            <FormControlLabel 
                              value={attribute.id} 
                              control={<Radio />} 
                              label={attribute.name} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    }
                  </List>
                </RadioGroup>
              </>
            )
            : <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                textAlign: "center",
                paddingTop: "12px"
              }}>
              No metrics to select
            </FormLabel>
        }
      </FormControl>
    </Drawer>
  );
}
