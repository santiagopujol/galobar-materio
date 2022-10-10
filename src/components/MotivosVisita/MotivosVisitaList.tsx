import { List } from '@mui/material'
import React from 'react'
import { Typography, useTheme } from '@mui/material'
import MotivosVisitaListItem from './MotivosVisitaListItem'

const MotivosVisitaList = ({ data }: any) => {
  const theme = useTheme()

  return (
    <>
      <List sx={{ pt: 0, pb:0, width: '100%', boxShadow: theme.shadows[24], maxWidth: '100%', bgcolor: 'background.paper' }}>
        {data != null && data.map((element: any) =>
          <MotivosVisitaListItem key={element.id} element={element} />
        )}
        {data != null && data.length == 0 && (
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

export default MotivosVisitaList
