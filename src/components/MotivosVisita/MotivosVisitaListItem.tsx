import React from 'react'
import {
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import Pencil from 'mdi-material-ui/Pencil'
import { useRouter } from 'next/router'

const MotivosVisitaListItem = ({ element }: any) => {
  const theme = useTheme()
  const router = useRouter()

  const openItem = (element: any) => {
    router.push('/motivos_visita/' + element.id)
  }

  return (
    <>
      <ListItemButton onClick={() => openItem(element)} sx={{ boxShadow: theme.shadows[6] }} alignItems='flex-start'>
        <ListItemAvatar>
          <img width={150} height={150} alt={element.nombre} src={element.image64} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography>
                <b>{element.nombre}</b>
              </Typography>
              <Typography>
                <small>
                  {element.descripcion}
                </small>
              </Typography>
            </React.Fragment>
          }
        />
        <Pencil
          sx={{
            mt: 17,
            mr: -0.5,
            color: 'text.disabled'
          }}
        />
      </ListItemButton>
    </>
  )
}

export default MotivosVisitaListItem
