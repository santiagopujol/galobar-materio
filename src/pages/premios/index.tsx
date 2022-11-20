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
import PremiosList from 'src/components/Premios/PremiosList';
import { PremiosService } from 'src/services/PremiosService';

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const {
    filter = '',
  } = query != null && query;

  let newDataPremios = await PremiosService.getAllPremios();

  if (filter != '') {
    newDataPremios = await PremiosService.filterAndOrderPremios(newDataPremios, filter);
  }

  return {
    props: {
      newDataPremios,
      filter
    },
  };
};

const PremiosPage = ({ newDataPremios, filter  }: any) => {

  const setting = useSettings();
  const router = useRouter();
  const theme = useTheme()

  const [dataPremios, setDataPremios]: any = useState([]);
  const [searchValue, setSearchValue] = useState(filter ? filter : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const SearchPremios = (e: any) => {
    e.preventDefault();
    updateStateLoading(setting, true)
    router.push(`/premios?filter=${searchValue}`);
  }

  // useEffect(() => {
  //   updateStateHeader(setting, false, "", "/" )
  //   updateStateModalConfirm(setting, false, "", false)

  // }, [])

  useEffect(() => {
    setDataPremios(newDataPremios);
    // updateStateLoading(setting, false)
    // updateStateModalConfirm(setting, false, "", false)
    // updateStateHeader(setting, false, "", "/" )

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

  }, [newDataPremios]);

  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box sx={{width: '100%'}}
            >
              <form onSubmit={e => SearchPremios(e)}>
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
              <CardHeader title='Premios'
                action={
                  <React.Fragment>
                    <IconButton size='small' aria-label='settings' className='card-more-options'
                      sx={{ color: 'text.secondary'}}>
                      <Filter />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton color="info" size='small' aria-label='settings' className='card-more-options'
                      onClick={() => router.push('/premios/new')}
                      >
                      <PlusThick color="info" />
                    </IconButton>
                  </React.Fragment>
                }
              />
              <PremiosList dataPremios={dataPremios} />
            </Card>
          </Grid>

        </Grid>
      </ApexChartWrapper>
    </>
  )
}

export default PremiosPage
