import { TextField } from '@mui/material';


const CustomTextField = ({ label, name, value, onChange, type = 'text', required = false }) => (

  <TextField
    margin="normal"
    required={required}
    fullWidth
    id={name}
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}

    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'title.main',
        },
        '& input': {
          backgroundColor: 'background.paper',
          color: 'title.main'
        },
        '&:hover fieldset': {
          borderColor: 'title.main',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'title.main',
        },
      },
      '& .MuiInputLabel-root': {
        color: 'title.main'
      },
    }}
  />
);

export default CustomTextField;
