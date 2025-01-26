import Grid from '@mui/material/Grid';
import { SocialMediaLinks } from '../constants/urlConstants';
import CustomIcon from '../icons/CustomIcon';

const SocialMediaBar = () => {

  const handleButtonClick = (link) => {
    window.open(link, '_blank', 'noopener noreferrer');
  }

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: '2px', padding: '1px' }}>
      {Object.keys(SocialMediaLinks).map((key) => (
        <Grid item key={key}>
          <CustomIcon
            name={key}
            sx={{ fontSize: 30,   color: 'text.primary' }}
            onClick={() => handleButtonClick(SocialMediaLinks[key])} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SocialMediaBar;
