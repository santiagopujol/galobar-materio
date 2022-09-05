import React from 'react';
import { Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight'
import { useRouter } from 'next/router'

const ClientesListItem = ({ element }: any) => {
  const theme = useTheme()
  const router = useRouter();

  // const setting = useSettings();


  const openItem = (element: any) => {
    router.push('/clientes/' + element.id)
  }

  return (
    <>
      <ListItemButton onClick={() => openItem(element)}
        sx={{boxShadow: theme.shadows[6] }} key={element.id}
        alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{
              color:"white",
              bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.grey[700]
            }}
          >
            {/* {letra1 || letra2 || letra3} */} david
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography>
                <b>
                 Juan Carlos
                </b>
              </Typography>
              <Typography
                sx={{ display: 'inline',
                  color: theme.palette.mode === 'light' ? theme.palette.grey[600] : "default"
                }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {/* {element.email_address} */}dannellmd@gmail.com
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

      {/* <ListItemButton sx={{boxShadow: theme.shadows[99] }} key={element.id} alignItems="flex-start">
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
      </ListItemButton> */}
    </>
  );
};

export default ClientesListItem;
