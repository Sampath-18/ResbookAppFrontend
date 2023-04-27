import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button, Container, Paper, Typography } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useNavigate, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FavCuisineSelection = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const onNextClick = async() => {
        let justCuisines = cuisines.filter(cuisine => cuisine[1])
        justCuisines = {cuisines:justCuisines.map(cuisine => cuisine[0])}
        let response = await fetch("http://localhost:8080/addUserFavCuisine/"+id,{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify(justCuisines)
        })
        response = await response.json()
        if(response.success)
        {
            alert('added favorite cuisines successfully')
            navigate('/')
        }
        else
        {
            alert('adding favorite cuisines failed')
        }
    }

    const [cuisines,setCuisines] = useState([['Italian',false],['North-Indian',false],['Chinese',false]])

    return (
        <Container>
            <Typography>Select Your Favourite Cuisines</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {cuisines.map((cuisine, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        {
                            cuisine[1] ?
                            <Item sx={{backgroundColor:'pink'}} onClick={() => {setCuisines(cuisines.map((cuisine,idx) => idx===index ? [cuisine[0],!cuisine[1]] : cuisine))}}>{cuisine[0]} <DoneRoundedIcon /></Item>
                            :
                            <Item onClick={() => {setCuisines(cuisines.map((cuisine,idx) => idx===index ? [cuisine[0],!cuisine[1]] : cuisine))}}>{cuisine[0]}</Item>
                        }
                    </Grid>
                ))}
            </Grid>
            <Button onClick={onNextClick} variant="contained">Next</Button>
        </Container>
    )
}

export default FavCuisineSelection