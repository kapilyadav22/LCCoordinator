import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const CustomListView = ({ items, onItemClick, renderTitle }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        padding: "2px",
        margin: "2px auto",
        // minHeight: '200px',
        maxWidth: "100%",
        backgroundColor: "background.cardcolor",
      }}
    >
      <CardContent  sx={{padding: "2px"}}>
        <List>
          {items.map((item) => (
            <ListItem
              sx={{
                padding: "2px",
              }}
              key={`${item.id}_${
                item.title?.trim() ? item.title : "title_" + item.id
              }`}
            >
              <ListItemButton
                onClick={() => onItemClick(item)}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "itemhover.main",
                    transform: "scale(1.01)",
                  },
                  padding: "2px",
                }}
              >
                {renderTitle ? (
                  renderTitle(item)
                ) : (
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.primary",
                          fontWeight: 500,
                          pl: 5,
                        }}
                      >
                        ○ {item.title}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CustomListView;
