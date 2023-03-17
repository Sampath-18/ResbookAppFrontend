import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import AddSection from './AddSection'
import { Button, Typography } from '@mui/material'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const SectionsIntake = () => {

  const locations = useLocation();
  const restaurant = locations.state;// retrieve restaurant from passed json

  useEffect(() => {
    console.log(restaurant)
  }, [])
  

  const navigate = useNavigate();

  const [sectionComponents,setSectionComponents] = useState([])


  const handleAddSection = () => {
    const newSectionComponent = {sectionName:'', sectionDescription:'', capacity:0, avgCost:0, secImg:[], dineinAvailable:'', cateringAvailable:'', reservationCharge:0, cuisines:[], searchtags:[], timing:{}, autoAcceptBookings:'', menu:[]}
    setSectionComponents([...sectionComponents, newSectionComponent])
    console.log("Added a new section. Total sections: " + sectionComponents.length)
  }


  const handleRemoveSection = (sectionIndexToRemove) => {
    setSectionComponents(sectionComponents.filter((_,index) => index !== sectionIndexToRemove));
    console.log("Remove Section "+sectionIndexToRemove+" called. Remaining sections - "+sectionComponents.length);
  }


  const handleSectionChanges = (event,index) => {
    const prop = event.target.name;
    const sectionComponentsList=[...sectionComponents]
    sectionComponentsList[index][prop]=event.target.value
    // console.log(prop + " : " + sectionComponentsList[index][prop])
    setSectionComponents(sectionComponentsList)
  }

  const handleSubmit = () => {
    console.log({restaurant:restaurant, sections:sectionComponents})//JSON.stringify({restaurant:restaurant, sections:sectionComponents}))
    // navigate to Review Information page
    navigate("/ReviewAddRestaurant", {state: {restaurant:restaurant, sections:sectionComponents}});
  }

  const setTimings = (timing, index) => {
    const prop = "timing";
    const sectionComponentsList=[...sectionComponents]
    sectionComponentsList[index][prop]=timing
    // console.log(prop + " : " + sectionComponentsList[index][prop])
    setSectionComponents(sectionComponentsList)
  }

  const setMenu = (menu, index) => {
    const prop = "menu";
    const sectionComponentsList=[...sectionComponents]
    sectionComponentsList[index][prop]=menu
    // console.log(prop + " : " + sectionComponentsList[index][prop])
    setSectionComponents(sectionComponentsList)
  }

  return (
    <Container>
      {/* {restaurantDetails ? <>{restaurantDetails}</> : <>Restaurant details not passed</>}
      {location ? <>{location}</> : <>location details not passed</>} */}
      <Typography variant="h3">Section details</Typography>
      {sectionComponents.map((sectionComponent,index) => (
        <AddSection key={index} sectionName={sectionComponent.sectionName} sectionDescription={sectionComponent.sectionDescription} capacity={sectionComponent.capacity} avgCost={sectionComponent.avgCost} secImg={sectionComponent.secImg} dineinAvailable={sectionComponent.dineinAvailable} reservationCharge={sectionComponent.reservationCharge} cateringAvailable={sectionComponent.cateringAvailable} cuisines={sectionComponent.cuisines} searchtags={sectionComponent.searchtags} timing={sectionComponent.timing} autoAcceptBookings={sectionComponent.autoAcceptBookings} menu={sectionComponent.menu} onRemove={() => handleRemoveSection(index)} onChange={(event) => handleSectionChanges(event,index)} setTimings={(timing) => setTimings(timing,index)} setMenu={(menu) => setMenu(menu,index)} />
      ))}
      <Button variant="contained" sx={{marginTop:"1em"}} onClick={() => (handleAddSection())}>Add Section</Button>

      <Button variant="contained" sx={{marginTop:"1em"}} onClick={() => (handleSubmit())}>Submit</Button>
    </Container>
  )
}

export default SectionsIntake