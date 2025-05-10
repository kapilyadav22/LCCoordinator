import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';

const CustomListView = ({ items, onItemClick, renderTitle }) => {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        padding: '12px',
        margin: '2px auto',
        // minHeight: '200px',
        maxWidth: "100%",
        backgroundColor: 'background.paper',
      }}
    >
        <CardContent>
          <List>
            {items.map((item) => (
              <ListItem
              key={`${item.id}_${item.title?.trim() ? item.title : 'title_'+item.id}`}
                button
                onClick={() => onItemClick(item)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                  backgroundColor: 'itemhover.main',
                  transform: 'scale(1.02)', 
                  },
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
                          color: 'text.primary',
                          fontWeight: 500,
                        }}
                      >
                        ○ {item.title}
                      </Typography>
                    }
                  />
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
    </Card>
  );
};

export default CustomListView;
