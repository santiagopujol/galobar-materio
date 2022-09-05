import { List } from '@mui/material'
import React from 'react'
import { Typography, useTheme } from '@mui/material'
import PremiosListItem from './PremiosListItem'

const PremiosList = ({ dataPremios }: any) => {
  const theme = useTheme()

  return (
    <>
      <List sx={{ pt: 0, pb:0, width: '100%', boxShadow: theme.shadows[24], maxWidth: '100%', bgcolor: 'background.paper' }}>
        {dataPremios != null && dataPremios.map((element: any) =>
          <PremiosListItem key={element.id} element={element} />
        )}
        {dataPremios != null && dataPremios.length == 0 && (
          <React.Fragment>
            <Typography
              sx={{ display: 'inline', pl: 5, fontSize: '0.875rem' }}
              component='span'
              variant='body2'
              color='primary.main'
            >
              No se encontraron resultados.
            </Typography>
          </React.Fragment>
        )}
      </List>
    </>
  )
}

export default PremiosList
