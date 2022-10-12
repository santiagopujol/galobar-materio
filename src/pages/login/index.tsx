// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
// import Google from 'mdi-material-ui/Google'
// import Github from 'mdi-material-ui/Github'
// import Twitter from 'mdi-material-ui/Twitter'
import Instagram from 'mdi-material-ui/Instagram'
import Facebook from 'mdi-material-ui/Facebook'
import Whatsapp from 'mdi-material-ui/Whatsapp'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { UserService } from 'src/services'
import { useSettings } from 'src/@core/hooks/useSettings'
import { updateStateLoading, updateStateNotificationToast, updateStateUser } from 'src/@core/utils/common';

interface State {
  email: string,
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    email: 'hola@galowines.com.ar', // TEST TEMP ''
    password: '', // TEST TEMP ''
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const setting = useSettings();
  const router = useRouter();
  const { settings, saveSettings } = setting

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const login = () => {
    updateStateLoading(setting, true)

    const user = UserService.login(
      values,
      settings.adminUsersAccessTemp
    )

    if(user != null) {
      updateStateUser(setting, user)
      router.push('/');
    }
    else {
      updateStateLoading(setting, false, 1000)
      updateStateNotificationToast(setting, true, "warning", "Usuario y/o contraseña incorrecta, intente nuevamente")
    }
}

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
            <img
              src={theme.palette.mode === 'light' ? '/images/logos/logo_galo2.png' : '/images/logos/logo_galo.png'}
              alt="Club Galo"
              width={70}
              height={65}
            />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6}}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenidos a {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Por favor, iniciar sesión con tu cuenta MiClub</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth
              id='email'
              label='Email'
              value={values.email}
              sx={{ marginBottom: 4 }}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Recordarme' />
              <Link passHref href='/'>
                <LinkStyled sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>Olvidó su contraseña?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={login}
            >
              INGRESAR
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Nuevo en nuestra plataforma?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  <LinkStyled sx={{ color: '#1da1f2' }}>Solicitar cuenta</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}></Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='https://www.facebook.com/472701869477652/posts/5032477236833403/?d=n' passHref>
                <IconButton component='a' target="_blank">
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
               <Link href='https://www.instagram.com/galowines/' passHref>
                <IconButton component='a' target="_blank">
                  <Instagram sx={{ color: '#C13584' }} />
                </IconButton>
              </Link>
              <Link href='https://api.whatsapp.com/send?phone=+5493518596950&text=%C2%A1Hola!%20quisiera%20hacer%20una%20consulta.' passHref>
                <IconButton component='a' target="_blank">
                  <Whatsapp
                    sx={{ color: '#25D366'}}

                    // sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              {/* <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link> */}
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
