import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight'

const ClientesListItem = ({ element }: any) => {
  const theme = useTheme()

  return (
    <>
      <ListItemButton sx={{boxShadow: theme.shadows[99] }} key={element.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{
              color:"white", 
              bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[700]
            }} 
            alt={`${element.merge_fields.FNAME.toUpperCase()}`} 
            src="/static/images/avatar/1.jpg" 
          />
        </ListItemAvatar>
        <ListItemText 
          secondary={
            <React.Fragment>
              <Typography variant='h6'>{`${element.merge_fields.FNAME.toUpperCase()} ${element.merge_fields.LNAME.toUpperCase()}`}</Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {element.email_address}
              </Typography>
            </React.Fragment>
          }
        />
        <ChevronRight           
          sx={{
            mt: 4.5, 
            mr: -0.5,
            color: 'text.disabled'
          }} 
        />
      </ListItemButton>
    </>
  );
};

export default ClientesListItem;
