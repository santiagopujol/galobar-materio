// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'

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
    searchComponent,
    currentPageTitle,
    prevComponentUrl,
  } = settings.headerState;

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const hiddenLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const theme = useTheme()

  useEffect(() => {
    console.log(props)
    console.log(searchComponent)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.headerState])

  const backArrowButton = () => {
    router.push(prevComponentUrl)
    saveSettings({
      ...settings,
      headerState: {
        activeIconArrow: false,
        searchComponent: null,
        currentPageTitle: 'Home',
        prevComponentUrl: '/',
      }
    })
  }

  const ArrowBack = (text) => {
    return (
      <IconButton color='inherit'  onClick={backArrowButton} >
        <ArrowLeft/>
      </IconButton>
    )
  }

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      position: 'fixed',
      zIndex: 3,
      pt: 2,
      pb: 2,
      pl: 4,
      top: 0,
      left:0,
      boxShadow: theme.shadows[5],
      bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default,
      alignItems: 'center', 
      justifyContent: 'space-between' }}>

      {/* BOTON MENU O FLECHA ATRAS */}
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {!activeIconArrow ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
          >
            <Menu />
          </IconButton>
        ) :   
          // ARROW BACK PARA NO LG 
          (hiddenLg) ? 
            <ArrowBack />
          :    
          // ARROW BACK PARA LG 
          <Box sx={{ ml: 65 }}>
            <ArrowBack />
          </Box>   
        }
      </Box>

      {/* BOTONES DERECHA */}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
