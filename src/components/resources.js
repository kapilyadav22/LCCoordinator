import Container from '@mui/material/Container';
import { useState } from 'react';
import { resourcesData } from '../dataFields/resourcesData';
import CustomAccordion from '../layout/CustomAccordion';
import { CustomTitle } from '../layout/CustomTitle';

const Resources = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleResourcesClick = (item) => {
        if (item.link) {
            window.open(item.link, '_blank', 'noopener,noreferrer');
        }
    };

    const onAccordionChange = (index) => {
        setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <Container sx={{minWidth: "100%" }}>
            <CustomTitle title={"Resources"} />
            {resourcesData.map((category, index) => (
                      <CustomAccordion
                      key={`${index+'_'+category.title}`}
                      index = {index}
                      category={category.title} 
                      content={category.items} 
                      isOpen={openAccordion === index}
                      onChange={()=>onAccordionChange(index)}
                      handleClick={handleResourcesClick}/>
            ))}
        </Container>
    );
};

export default Resources;
