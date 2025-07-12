import { TextField } from '@mui/material';

const CustomTextField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}) => {
  const titleColor = 'title.main';

  return (
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
      multiline
      minRows={1}
      maxRows={100}
      InputLabelProps={{
        sx: {
          color: titleColor,
          '&.Mui-focused': {
            color: titleColor,
          },
        },
      }}
      InputProps={{
        sx: {
          color: titleColor,
          caretColor: titleColor,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: titleColor,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: titleColor,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: titleColor,
          },
          '& input, & textarea': {
            color: titleColor,
          },
        },
      }}
    />
  );
};

export default CustomTextField;
