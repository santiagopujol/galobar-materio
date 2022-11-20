import React from 'react'

// ** Hooks
import { useEffect, useState } from 'react';
import { useSettings } from 'src/@core/hooks/useSettings'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Filter  from 'mdi-material-ui/Filter'
import PlusThick from 'mdi-material-ui/PlusThick'
import { Magnify } from 'mdi-material-ui'
import { Box, InputAdornment, TextField } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Services
import { updateStateLoading,
  updateStateHeader,
  updateStateModalConfirm
} from 'src/@core/utils/common';
import MotivosVisitaList from 'src/components/MotivosVisita/MotivosVisitaList';
import { MotivosVisitaService } from 'src/services/MotivosVisitaService';

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const {
    filter = '',
  } = query != null && query;

  let newData = await MotivosVisitaService.getAll();

  if (filter != '') {
    newData = await MotivosVisitaService.filterAndOrder(newData, filter);
  }

  return {
    props: {
      newData,
      filter
    },
  };
};

const MotivosVisitaPage = ({ newData, filter  }: any) => {

  const setting = useSettings();
  const router = useRouter();
  const theme = useTheme()

  const [data, setData]: any = useState([]);
  const [searchValue, setSearchValue] = useState(filter ? filter : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const Search = (e: any) => {
    e.preventDefault();
    updateStateLoading(setting, true)
    router.push(`/motivos_visita?filter=${searchValue}`);
  }

  useEffect(() => {
    setData(newData);

    setting.saveSettings({
      ...setting.settings,
      loadingState: false,
      headerState: {
        activeIconArrow: false,
        currentPageTitle: "",
        prevComponentUrl: "/",
      },
      modalConfirmState: {}
    })

  }, [newData]);

  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box sx={{width: '100%'}}
            >
              <form onSubmit={e => Search(e)}>
                <TextField
                  size='small'
                  id='filter'
                  value={searchValue}
                  onChange={handleChange}
                  type="search"
                  placeholder='Buscar'
                  sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                      borderRadius: 4,
                  }}}
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
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Motivos de visita'
                action={
                  <React.Fragment>
                    <IconButton size='small' aria-label='settings' className='card-more-options'
                      sx={{ color: 'text.secondary'}}>
                      <Filter />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton color="info" size='small' aria-label='settings' className='card-more-options'
                      onClick={() => router.push('/motivos_visita/new')}
                      >
                      <PlusThick color="info" />
                    </IconButton>
                  </React.Fragment>
                }
              />
              <MotivosVisitaList data={data} />
            </Card>
          </Grid>

        </Grid>
      </ApexChartWrapper>
    </>
  )
}

export default MotivosVisitaPage
