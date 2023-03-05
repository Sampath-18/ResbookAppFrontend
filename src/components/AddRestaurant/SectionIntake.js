import { Container } from '@mui/system'
import React from 'react'
import AddSection from './AddSection'
import { Button, Typography } from '@mui/material'
import { useState } from 'react';


const SectionIntake = () => {
  const [sectionComponents,setSectionComponents] = useState([])


  const handleAddSection = () => {
    const newSectionComponent = {sectionName:'', description:'', capacity:0, avgCost:0, photos:[], dinein:'', catering:'', reservationCharge:0, cuisines:[], searchtags:[], timings:{}, autoAccept:'', menu:{}}
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
    console.log(prop + " : " + sectionComponentsList[index][prop])
    setSectionComponents(sectionComponentsList)
  }


  return (
    <Container>
      <Typography variant="h3">Section details</Typography>
      {sectionComponents.map((sectionComponent,index) => (
        <AddSection key={index} sectionName={sectionComponent.sectionName} description={sectionComponent.description} capacity={sectionComponent.capacity} avgCost={sectionComponent.avgCost} photos={sectionComponent.photos} dinein={sectionComponent.dinein} reservationCharge={sectionComponent.reservationCharge} catering={sectionComponent.catering} cuisines={sectionComponent.cuisines} searchtags={sectionComponent.searchtags} timings={sectionComponent.timings} autoAccept={sectionComponent.autoAccept} menu={sectionComponent.menu} onRemove={() => handleRemoveSection(index)} onChange={(event) => handleSectionChanges(event,index)} />
      ))}
      <Button variant="contained" sx={{marginTop:"1em"}} onClick={() => (handleAddSection())}>Add Section</Button>
    </Container>
  )
}

export default SectionIntake