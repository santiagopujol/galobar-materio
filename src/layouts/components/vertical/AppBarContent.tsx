// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { useEffect } from 'react'
import router from 'next/router'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const {
    activeIconArrow,
    methodSearch,
    currentPageTitle,
    prevComponentUrl,
  } = settings.headerState;

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    console.log(props)
    console.log(methodSearch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.headerState])

  const backArrowButton = () => {
    router.push(prevComponentUrl)
    saveSettings({
      ...settings,
      headerState: {
        activeIconArrow: false,
        methodSearch: () => { return false },
        currentPageTitle: 'Home',
        prevComponentUrl: '/',
      }
    })

  }

  if (!activeIconArrow) {
    return (
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton
              color='inherit'
              onClick={toggleNavVisibility}
              sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
            >
              <Menu />
            </IconButton>
          ) : null}
          <form onSubmit={e => {e.preventDefault(); console.log("buscar, metodo"); methodSearch()}}>
            <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </form>

        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {hiddenSm ? null : (
            <Box
              component='a'
              target='_blank'
              rel='noreferrer'
              sx={{ mr: 4, display: 'flex' }}
              href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
            >
              <img
                height={24}
                alt='github stars'
                src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
              />
            </Box>
          )} */}
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <NotificationDropdown />
          <UserDropdown />
        </Box>
      </Box>
      )
  } else {

    // Button Arrow Back
    return (
      <IconButton color='inherit' onClick={backArrowButton} >
        {"< " + currentPageTitle}
      </IconButton>
    )
  }
}

export default AppBarContent
