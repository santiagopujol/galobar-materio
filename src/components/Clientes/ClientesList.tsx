import React from 'react';
import ClientesTableItem from './ClientesListItem';

const ClientesList = ({ dataClientsState }) => {
  return (
    <>
      <div className="shadow-md shadow-slate-600/50 rounded bg-gray-100">
        <table className="responsive w-full text-left bg-white">
          <thead></thead>
          <tbody>
            {dataClientsState != null && dataClientsState.members &&
              dataClientsState.members.map((element) => (
                <ClientesTableItem key={element.id} element={element} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientesList;
