import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import CustomIcon from '../icons/CustomIcon';
import ListView from '../layout/CustomListView';

const CustomAccordion = ({index, category, content, isOpen, handleClick, onChange}) => {

    return <>
     <Accordion key={index} 
     sx={{ borderRadius: "10px", margin: "0.8%",  color: 'title.main' }}
     expanded={isOpen}
     onChange={onChange}
     >
                    <AccordionSummary
                        sx={{ borderRadius: "10px" }}
                        expandIcon={
                        <CustomIcon name={"expand"}
                        sx={{ fontSize: 20, color: 'title.main' }} > 
                        </CustomIcon>}
                        aria-controls={`${category}-content`}
                        id={`${category}-header`}
                    >
                        <Typography variant="h6">{category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListView items={content} onItemClick={handleClick} />
                    </AccordionDetails>
                </Accordion>
                </>
}

export default CustomAccordion;