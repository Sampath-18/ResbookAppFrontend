import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EditIcon from '@mui/icons-material/Edit';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
  {[
    {text: 'Restaurant Details', path: '/admin'},
    {text: 'Sections', path: '/sections'},
    {text: 'Statistics', path: '/stats'},
    {text: 'Bookings', path: '/bookings'},
    {text: 'Add Section', path: '/add-section'},
    {text: 'Remove Restaurant', path: '/remove-restaurant'},
    {text: 'Profile', path: '/profile'},
    {text: 'Log Out', path: '/logout'}
  ].map(({text, path}, index) => (
    <ListItem key={text} disablePadding>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} style={{ color: 'black' }}/>
        </ListItemButton>
      </Link>
    </ListItem>
  ))}
</List>






    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
      position='absolute'
//       ''
// | 'fixed'
// | 'relative'
// | 'static'
// | 'sticky'
        

        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          marginTop:'4.3em'
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
       
          
          <Grid container spacing={2}>
          <Grid item xs={4}>
  <Typography variant="h5" noWrap component="div" >
           Admin View
          </Typography> 
  </Grid>
  <Grid item xs={4}>
  <AccountCircleRoundedIcon fontSize='large'/>
  </Grid>
  
  <Grid item xs={4}>
    <EditIcon fontSize='large'/>
  </Grid>
  
</Grid>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
    <Box
      sx={{
        width:' 100%',
        height: 100,
        backgroundColor: 'primary.dark',
        
      }}
    > <Grid container spacing={3}>
          <Grid item xs={5}>
          <Typography variant="h5" noWrap component="div" color='white'>
           Name of the Restaurant
          </Typography>
  </Grid>
 
  

  <Grid item xs={7}>
  <Typography variant="h5" noWrap component="div" color='white'>
           Current status
          </Typography>
  <Grid item spacing={2} >
 <Button variant="contained" color="success" size='small'>
<Typography>Open</Typography>
</Button>
<Button variant="outlined" color="error"size='small' sx={{backgroundColor:'red', color:'white',marginLeft:'1em'}} >
<Typography>Close</Typography>
</Button>
 

  </Grid>
  
  </Grid>
  
</Grid></Box>

    <Container sx={{display:'flex',
        borderRadius:'1em',
        justifyContent:'center',
        marginTop:'1em',
        alignItems:'center'
      }}>
    <Box
      sx={{
        width: 700,
        height: 500,
        backgroundColor: 'primary.dark',
      
      }}
    ><img style={{width: '700px',
        height: '500px',}}  src='https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80'></img></Box>
    </Container>

<Box sx={{display:'flex',justifyContent:'space-around',marginTop:'1em',}}>
<Box
      sx={{
        width: 500,
        height: 50,
        backgroundColor: 'primary.dark',
        display:'flex',
        borderRadius:'1em',
        justifyContent:'center',
        
        alignItems:'center'
      }}
    >
         <Typography variant="h5" noWrap component="div" color='white'>
          Avg cost per person :
          </Typography>
          <Typography variant="h5" noWrap component="div" color='white'>
         1000
          </Typography>
    </Box>
    
    <Box
    style={{borderColor:'blue',}}
      sx={{
        width: 300,
        height: 70,
        borderRadius:'1em',
       
        border:2
       
      }}
    ><Grid container spacing={2} sx={{display:'flex',
        
        justifyContent:'center',
        
        alignItems:'center',}}>
  <Grid item >
  <Typography variant="h5" noWrap component="div" >
         Parking Availability
          </Typography> 
          <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>

          <Button variant='contained' size='small'>Yes/No</Button>
  {/* <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> */}
</div> </Grid>
     
  
</Grid></Box>


</Box>
    


    <Box
    style={{borderColor:'blue',}}
      sx={{
        width: 300,
        height: 70,
        borderRadius:'1em',
       
        border:2
       
      }}>
        <Typography>Restaurant Ratings</Typography>
        <img src='https://icons8.com/icon/qdQpy48X3Rjv/star'/>
        <img src='https://icons8.com/icon/qdQpy48X3Rjv/star'/>
        <img src='https://icons8.com/icon/qdQpy48X3Rjv/star'/>
        <img src='https://icons8.com/icon/qdQpy48X3Rjv/star'/>
      </Box>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
