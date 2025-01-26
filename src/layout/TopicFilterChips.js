import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CustomBox from './CustomIconButtonBox';

const TopicFilterChips = ({ uniqueTopics, selectedTopics, onChipClick, onReset, handleRefresh }) => {
    return (
        <Grid2 container alignItems="center"
            sx={{
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: '1%',
                paddingBottom: '1%',
                marginBottom: '1%'
            }}>
            <Grid2 item xs>
                <Box display="flex" flexWrap="wrap">
                    {uniqueTopics.map((topic) => (
                        <Chip
                            key={topic}
                            label={topic}
                            onClick={() => onChipClick(topic)}
                            variant={selectedTopics.includes(topic) ? 'filled' : 'outlined'}
                            sx={{ margin: '5px',
                                color:selectedTopics.includes(topic) ? 'white' : '#37086a',
                                backgroundColor:selectedTopics.includes(topic)?'title.main':'white'}}
                        />
                    ))}
                </Box>
            </Grid2>
            <Grid2 item>
                <CustomBox iconName='refresh'
                    onClick={handleRefresh}
                    sx={{ cursor: 'pointer', fontSize: 32 }}
                    arialabel="refresh"
                />

                <CustomBox iconName='reset'
                    onClick={onReset}
                    sx={{ cursor: 'pointer', fontSize: 32 }}
                    arialabel="reset filters"
                />

            </Grid2>
        </Grid2>
    );
};

export default TopicFilterChips;
