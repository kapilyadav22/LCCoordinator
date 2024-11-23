import React from 'react';
import { Grid, Typography, Box, Card, CardContent, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const CustomListView = ({ items, onItemClick, renderTitle }) => {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        padding: '12px',
        margin: '2px auto',
        minHeight: '500px',
        maxWidth: "100%",
        bgcolor: '#fafafa'
      }}
    >
        <CardContent>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id || item.title}
                button
                onClick={() => onItemClick(item)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                          color: 'primary.main',
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
