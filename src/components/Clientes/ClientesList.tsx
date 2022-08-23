import { List } from '@mui/material';
import React from 'react';
import ClientesListItem from './ClientesListItem';

const ClientesList = ({ dataClientsState }: any) => {
  return (
    <>
      <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
        {dataClientsState != null && dataClientsState.members &&
          dataClientsState.members.map((element: any) => (
            <ClientesListItem key={element.id} element={element}></ClientesListItem>
          ))}
      </List>
    </>
  );
};

export default ClientesList;
