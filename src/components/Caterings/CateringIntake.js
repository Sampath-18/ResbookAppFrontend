import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import React from 'react'

const CateringIntake = () => {
  return (
    <Paper elevation={3}>
      <Typography variant="h4" fontWeight="bold">
        Catering Details
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Delivery available</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}

export default CateringIntake