import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CustomBox from './CustomIconButtonBox';

const TopicFilterChips = ({ uniqueTopics, selectedTopics, onChipClick, onReset, handleRefresh }) => {
    return (
        <Grid container alignItems="center"
            sx={{
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: '1%',
                paddingBottom: '1%',
                marginBottom: '1%'
            }}>
            <Grid item xs>
                <Box display="flex" flexWrap="wrap">
                    {uniqueTopics.map((topic) => (
                        <Chip
                            key={topic}
                            label={topic}
                            onClick={() => onChipClick(topic)}
                            variant={selectedTopics.includes(topic) ? 'filled' : 'outlined'}
                            color={selectedTopics.includes(topic) ? 'primary' : 'default'}
                            sx={{ margin: '5px' }}
                        />
                    ))}
                </Box>
            </Grid>
            <Grid item>
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

            </Grid>
        </Grid>
    );
};

export default TopicFilterChips;
