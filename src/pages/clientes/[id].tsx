import React, { useEffect } from 'react';

import { MailchimpService } from '../../services/MailchimpService';
import { PuntosService } from '../../services/PuntosService'

// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ClientesListItemInfoTab from 'src/components/Clientes/ClientesListItemInfoTab';

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { updateStateLoading, updateStateHeader, updateStateNotificationToast } from 'src/@core/utils/common';

// ** Services

export const getServerSideProps = async (context: any) => {

  // Buscar info de cliente
  const dataCliente = await MailchimpService.getMemberMailchimp(context.query.id);

  //Get data puntos de la base y pasarlo al componente de puntos
  // ...
  console.log(dataCliente)

  return {
    props: {
      dataCliente: JSON.parse(dataCliente),
      // dataOperaciones
    },
  };
}

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const ClienteItemPage = ({ dataCliente }: { dataCliente: any }) => {

  //Hooks
  const setting = useSettings();

  // ** State
  const [value, setValue] = useState<string>('account')


  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // const {
  //   setLoadingState,
  //   setHeaderComponentState,
  //   setActiveTabDetalleClientes
  // } = useAppContext();

  // const [dataPuntosCliente, setDataPuntoscliente] = useState({});

  // const getPuntosCliente = () => {
  //   getPuntosByClienteFirestore(dataCliente.id).then((result) => {
  //     // console.log(result);
  //     setDataPuntoscliente(result[0]);
  //   });
  //   // return JSON.stringify(dataOperaciones)
  // };

  useEffect(() => {
    console.log(dataCliente)
    updateStateHeader(setting, true, dataCliente.email_address , "/clientes" )
    // setLoadingState(false);
    // setActiveTabDetalleClientes("submenu-tab-clientes-detalle")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <ClientesListItemInfoTab dataCliente={dataCliente} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ClienteItemPage
