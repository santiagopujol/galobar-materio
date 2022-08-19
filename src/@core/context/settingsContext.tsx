// ** React Imports
import { createContext, useState, ReactNode } from 'react'

// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

// ** Types Import
import { ThemeColor, ContentWidth } from 'src/@core/layouts/types'

export type Settings = {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth

  // My Hooks
  adminUsersAccessTemp: any, // User
  userState: any, // User
  notificationState: any, // Notification
  loadingState: boolean, // Loading
  headerState: any, // Header
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void,
}

// Configuracion de estados
const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,

  adminUsersAccessTemp: [
    {
      email: 'hola@galowines.com.ar',
      password: 'miclub_galowines',
      typeUser: "cliente"
    },
    {
      email: 'miclub@gmail.com',
      password: 'admin123',
      typeUser: "admin"
    },
  ],
  userState: null,

  // Estado de notificaciones
  notificationState: {
    open: false,
    type: "",
    message: "",
    timeOut: 2000,
  },

  //Loading
  loadingState: false,

  //Header State
  headerState: {
    activeIconArrow: false,
    currentPageTitle: 'Home',
    prevComponentUrl: '/',
  }
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings })

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{settings, saveSettings}}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
