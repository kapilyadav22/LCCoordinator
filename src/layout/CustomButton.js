import Button from '@mui/material/Button';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="inherit"
      sx={{
        mt: 3,
        mb: 2,
        color: 'white',
        backgroundColor: 'title.main',
        '&:hover': {
          backgroundColor: 'title.dark', 
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
