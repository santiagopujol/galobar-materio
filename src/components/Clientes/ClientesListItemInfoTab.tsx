// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// App Imports
import moment from 'moment';

const ClientesListItemInfoTab = ({ dataCliente }: { dataCliente: any }) => {

  // ** State
  const {
    merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
    email_address,
    vip,
    last_changed,
  } = dataCliente;

  return (
    <CardContent>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '5rem' }} image='/images/cards/background-user.png' />
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/1.png'
          sx={{
            width: 75,
            height: 75,
            left: '1.313rem',
            top: '2.28125rem',
            position: 'absolute',
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}
        />
        <CardContent>
          <Box
            sx={{
              mt: 6.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h6'>{FNAME.toUpperCase()} {LNAME.toUpperCase()}</Typography>
              <Typography variant='body2'>{email_address != '' ? email_address : '-'}</Typography>
              <br></br>
              <Typography variant='body2'>Teléfono: <b>{PHONE != '' ? PHONE : '-'}</b></Typography>
              <Typography variant='body2'>Cumpleaños: <b>{BIRTHDAY != '' ?  BIRTHDAY.split('/')[1] + "/" + BIRTHDAY.split('/')[0] : '-'}</b></Typography>
              <Typography variant='body2'>Vip: <b>{!vip ? 'Si' : 'No'}</b></Typography>
              <Typography variant='body2'>Última Modificación: <b>{last_changed != null && moment(Date.parse(last_changed)).format('DD/MM/YYYY')}</b></Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardContent>
  )
}

export default ClientesListItemInfoTab
