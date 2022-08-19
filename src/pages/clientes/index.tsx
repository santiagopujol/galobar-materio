// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

// import TableDense from 'src/views/tables/TableDense'
// import TableSpanning from 'src/views/tables/TableSpanning'
// import TableCustomized from 'src/views/tables/TableCustomized'
// import TableCollapsible from 'src/views/tables/TableCollapsible'
// import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect } from 'react';

const ClientesPage = () => {

  const setting = useSettings();

  useEffect(() => {
    // Header State
    setting.saveSettings({
      ...setting.settings,
      headerState: {
        activeIconArrow: true,
        currentPageTitle: 'Cliente',
        prevComponentUrl: '/clientes',
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Clientes
            </Link>
          </Typography>
          <Typography variant='body2'></Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Clientes' titleTypographyProps={{ variant: 'h6' }} />
          {/* <TableBasic /> */}
            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="R" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

export default ClientesPage
