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
import CashIcon from 'mdi-material-ui/Cash'
import GiftOutline from 'mdi-material-ui/GiftOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ClientesListItemInfoTab from 'src/components/Clientes/ClientesListItemInfoTab';
import ClientesListItemPuntosTab from 'src/components/Clientes/ClientesListItemPuntosTab';
import ClientesListItemPremiosTab from 'src/components/Clientes/ClientesListItemPremiosTab';

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { updateStateLoading, updateStateHeader, updateStateNotificationToast } from 'src/@core/utils/common';

// ** Services

export const getServerSideProps = async (context: any) => {

  // Buscar info de cliente
  const dataCliente = await MailchimpService.getMemberMailchimp(context.query.id);

  //Get data puntos de la base y pasarlo al componente de puntos
  // ...

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

  console.log(dataCliente);
  const setting = useSettings();

  // ** State
  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  useEffect(() => {
    updateStateHeader(setting, true, dataCliente.email_address , "/clientes" )
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
                <TabName>Información</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CashIcon />
                <TabName>Puntos</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GiftOutline />
                <TabName>Premios</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <ClientesListItemInfoTab dataCliente={dataCliente} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <ClientesListItemPuntosTab dataCliente={dataCliente} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <ClientesListItemPremiosTab dataCliente={dataCliente} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ClienteItemPage
