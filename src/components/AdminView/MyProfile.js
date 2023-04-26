import React from 'react'
import { Box } from '@mui/material';

const drawerWidth = 240;

const MyProfile = () => {
  return (
        <Box
          sx={{
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
            width: 300,
            height: 300,
            color: 'black',
            backgroundColor: 'primary',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          My Profile Details here..
        </Box>
      );
    }

export default MyProfile
