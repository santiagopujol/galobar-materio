// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
// import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline'
import GiftOutline from 'mdi-material-ui/GiftOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

const EstadisticasHome = ({ porcCrecimiento, operaciones, clientes, premiosCanjeados }: any) => {

  return (
    <Card>
      <CardHeader
        title='Estadísticas'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <Grid xs={12} sm={3} key={2}>
            <Box key={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 43,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `${"success"}.main`
                }}
              >
                <AccountMultipleOutline sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>{"Clientes"}</Typography>
                <Typography variant='h6'>{clientes}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={3} key={1}>
            <Box key={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `${"primary"}.main`
                }}
              >
                <TrendingUp sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>{"Operaciones"}</Typography>
                <Typography variant='h6'>{operaciones}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={3} key={3}>
            <Box key={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `${"warning"}.main`
                }}
              >
                <GiftOutline sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>{"Premios Canjeados"}</Typography>
                <Typography variant='h6'>{premiosCanjeados}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EstadisticasHome
