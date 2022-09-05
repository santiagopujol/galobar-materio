import { List } from '@mui/material';
import React from 'react';
import ClientesListItem from './ClientesListItem';
import { Typography, useTheme } from '@mui/material';

const ClientesList = ({ dataClientsState }: any) => {

  const theme = useTheme()

  return (
    <>
      <List sx={{ width: '100%', boxShadow: theme.shadows[24], maxWidth: "100%", bgcolor: 'background.paper' }}>
        {/* {dataClientsState != null && dataClientsState.members != undefined &&
          dataClientsState.members.map((element: any) => (
            <ClientesListItem key={element.id} element={element}></ClientesListItem>
          ))} */}
        {dataClientsState!= null && dataClientsState.members && dataClientsState.members.length == 0 && 
          <React.Fragment>
            <Typography
              sx={{ display: 'inline', pl: 5, fontSize: '0.875rem'  }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              No se encontraron resultados.
            </Typography>
          </React.Fragment>
        }

      </List>
    </>
  );
};

export default ClientesList;
