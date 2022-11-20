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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gender = require('gender-detection');

const ClientesListItemInfoTab = ({ dataCliente }: { dataCliente: any }) => {

  console.log(dataCliente);
  // ** State
  const {
    merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
    email_address,
    vip,
    last_changed,
    status,
    location
  } = dataCliente;

  let avatar = "/images/avatars/2.png"
  if (gender.detect(FNAME) === "female"){
    avatar = "/images/avatars/4.png"
  }
  if (gender.detect(FNAME) === "male"){
    avatar = "/images/avatars/5.png"
  }

  return (
    <CardContent>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '5rem' }} image='/images/cards/banner.jpg' />
        <Avatar
          alt='Robert Meyer'
          src={avatar}
          sx={{
            width: 150,
            height: 150,
            left: '45%',
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
              <Typography variant='body2'>Estado: <b>{status}</b></Typography>
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
