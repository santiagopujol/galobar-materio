import React from 'react'
import dynamic from 'next/dynamic'

// ** Hooks
import { useEffect, useState } from 'react';
import { useSettings } from 'src/@core/hooks/useSettings'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast } from 'src/@core/utils/common';

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Cached  from 'mdi-material-ui/Cached'
import { Magnify } from 'mdi-material-ui'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import { Box, InputAdornment, TextField } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
//import ClientesList from 'src/components/Clientes/ClientesList'

import { ClientesService } from 'src/services/ClientesService';

// ** Dynamic Components
const ClientesList = dynamic(() => import('src/components/Clientes/ClientesList'))

// ** Services

export const getServerSideProps = async (context: any) => {
	const { query } = context;
	const {
		page = 1,
		count = 10,
		update = '0',
		filter = '',
	} = query != null && query;

	const baseUrl =
		process.env.NODE_ENV === 'production'
			? 'https://galobarclub.vercel.app//api'
			: 'http://localhost:3000/api';

	const res = await fetch(
		`${baseUrl}/getListMembers?page${page}&count=${count}&update=${update}&filter=${filter}`
	);
  const newDataMembers = await res.json();

	return {
		props: {
      newDataMembers,
      page,
			filter,
			baseUrl,
		},
	};
};

const ClientesPage = ({ newDataMembers, page, filter, baseUrl }: any) => {

  const setting = useSettings();
  const router = useRouter();
  const theme = useTheme()

	const [dataClientes, setDataClientes]: any = useState([]);
  const [searchValue, setSearchValue] = useState(filter ? filter : '');
  const [currentPageClientes, setCurrentPageClientes] = useState(page ? page : 1);
	const [showResultPagination, setShowResultPagination] = useState(filter != '' ? false : true);
  const { modalConfirmState } = setting.settings
  const [totalDataClientes, setTotalDataClientes] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const SearchClientes = (e: any) => {
    e.preventDefault();
    updateStateLoading(setting, true)

    // Buscando por filtro
    if (validateFormSearch()) {
      router.push(`/clientes?filter=${searchValue}`);
      setShowResultPagination(false);
      setCurrentPageClientes(1);

      // Buscando pagina 1
    } else {
      router.push(`/clientes?page=1`);
      setCurrentPageClientes(1);
      setShowResultPagination(true);
    }
  }

  function validateFormSearch() {
    if (!searchValue || searchValue == '') {
      return false;
    }

    return true;
  }

  const paginado = () => {
    updateStateLoading(setting, true)
    const currentPage = currentPageClientes + 1;
    setCurrentPageClientes(currentPage);
    getAndSetDataClientes(1, currentPage * 10, 0, '');
  };

  // Al pasar 1 en el tecer parametro hago un update a firebase y traigo por pagina
  async function getAndSetDataClientes(
    page = 1,
    count = 10,
    update = 0,
    filter = ''
  ) {
    updateStateLoading(setting, true)
    const res = await fetch(
      `${baseUrl}/getListMembers?page${page}&count=${count}&filter=${filter}&update=${update}`
    );
    const data = await res.json();

    setDataClientes(data);
    updateStateLoading(setting, false)

    if (update == 1) {
      setShowResultPagination(true);
      setSearchValue('');
      updateStateNotificationToast(setting, true, "success", "Clientes actualizados con éxito")
      updateStateModalConfirm(setting, false, "", false)
    }
  }

  // Temporal por problemas con timeout en vercell, (hay que pagar para q dure mas, sino ver otra forma)
  async function getAllDataClientes() {
    updateStateNotificationToast(setting, true, "warning", "Actualizando clientes, espere un momento", 9000)
    updateStateModalConfirm(setting, false, "", false)
    setSearchValue('');
    setShowResultPagination(true);

    fetch(
      `${baseUrl}/getListMembers?page${1}&count=${10}&filter=${''}&update=${1}`
    );

    setTimeout(() => {
      router.push(`/clientes?page=1`);
    }, 8000)

  }

  const openModalUpdateClientes = () => {
    updateStateModalConfirm(setting, true, "actualizar_clientes", false, "Actualización de Clientes", "¿Confirma actualizar los datos de los clientes?")
  }

  const getDataCountClientes = async () => {
    return await ClientesService.getCountClientes().then((result: any) => {
      return result
    });
  };

  useEffect(() => {
    updateStateLoading(setting, true)

    const asyncUseEffect = async () => {
      const dataCountClientes = await getDataCountClientes()
      setTotalDataClientes(dataCountClientes)
      updateStateLoading(setting, false)
    }
    asyncUseEffect();

		setDataClientes(newDataMembers);

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDataMembers]);

  // Efecto Respuesta Confirmacion Modal
  useEffect(() => {
    if (modalConfirmState.method === "actualizar_clientes" && modalConfirmState.successResult === true) {
      getAllDataClientes();
		}
  }, [modalConfirmState.successResult == true])

  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box sx={{width: '100%'}}
            >
              <form onSubmit={e => SearchClientes(e)}>
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
              <CardHeader title={`Clientes (${totalDataClientes})`}
                action={
                  <IconButton onClick={openModalUpdateClientes} size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary'   }}>
                    <Cached />
                  </IconButton>
                }
              />
              <ClientesList dataClientsState={dataClientes} />
            </Card>
            {(showResultPagination == true) && (
              <Box sx={{ display: 'flex', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  color='inherit'
                  aria-haspopup='true'
                  onClick={paginado}
                  sx={{
                    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500]
                }}>
                  <DotsHorizontal/>
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </>
  )
}

export default ClientesPage
