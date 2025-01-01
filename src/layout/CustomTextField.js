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
          borderColor: 'text.primary', 
        },
        '& input': {
          backgroundColor: 'background.paper', 
        },
        '&:hover fieldset': {
          borderColor: 'text.primary', 
        },
        '&.Mui-focused fieldset': {
          borderColor: 'text.primary', 
        },
      },
    }}
  />
);

export default CustomTextField;
