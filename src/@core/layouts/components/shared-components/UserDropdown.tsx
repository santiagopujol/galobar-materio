// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Account from 'mdi-material-ui/Account'


import LogoutVariant from 'mdi-material-ui/LogoutVariant'

import { UserService } from 'src/services'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useTheme } from '@mui/material/styles'


// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const setting = useSettings();

  const { userState } = setting.settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    UserService.checkUser(setting);
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, mr: 1,  cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar onClick={handleDropdownOpen}
          sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main, color: "white" }} >
          <Account />
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar onClick={handleDropdownOpen}
                sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main, color: "white" }} >
                <Account />
              </Avatar>
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                {userState != null ? userState.email : 'Usuario'}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userState != null ? userState.typeUser : 'Usuario'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem sx={{ py: 2 }} onClick={() => {UserService.logout(); handleDropdownClose('/login')}}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Salir
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
