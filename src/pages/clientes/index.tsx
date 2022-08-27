// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import { Avatar, Divider, Box, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect, useState } from 'react';
import { updateStateLoading, 
  updateStateModalConfirm, 
  updateStateHeader, 
  updateStateNotificationToast } from 'src/@core/utils/common';
import { useRouter } from 'next/router'
import ClientesList from 'src/components/Clientes/ClientesList'
import { Magnify } from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'
import Cached  from 'mdi-material-ui/Cached'
import { useTheme } from '@mui/material/styles'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'

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
			? 'https://galobar.vercel.app/api'
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

const ClientesPage = ({ newDataMembers, page, filter, baseUrl }: any, props) => {

  const setting = useSettings();
  const router = useRouter();

	const [dataClientes, setDataClientes]: any = useState([]);
  const [searchValue, setSearchValue] = useState(filter ? filter : '');
  const [currentPageClientes, setCurrentPageClientes] = useState(page ? page : 1);
	const [showResultPagination, setShowResultPagination] = useState(filter != '' ? false : true);

  const { modalConfirmState } = setting.settings

  const theme = useTheme()

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

  useEffect(() => {
    console.log(newDataMembers)
		setDataClientes(newDataMembers);
    updateStateLoading(setting, false)

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDataMembers]);

  // Buscando todos los datos
  function UpdateAllMembersAndGet10() {
    updateStateLoading(setting, true)
    router.push(`/clientes?page=1&update=1`);
    setShowResultPagination(false);
    setCurrentPageClientes(1);
  }

  function clearSearch() {
    updateStateLoading(setting, true)
    router.push(`/clientes?page=${currentPageClientes}`);
    setSearchValue('');
    setCurrentPageClientes(1);
    setShowResultPagination(true);
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
    }
  }

  const openModalUpdateClientes = () => {
    updateStateModalConfirm(setting, true, "actualizar_clientes", false, "Actualización de Clientes", "¿Confirma actualizar los datos de los clientes?")
  }

  // Efecto Respuesta Confirmacion Modal
  useEffect(() => {
    if (modalConfirmState.method === "actualizar_clientes" && modalConfirmState.successResult === true) {
      // Al pasar 1 en el tecer parametro hago un update a firebase y traigo por pagina
      getAndSetDataClientes(1, 10, 1, '');
		}
  }, [modalConfirmState.successResult == true])

  return (
    <>
      <Grid container spacing={6}>
        <Box sx={{
          height: '20px',
          width: '100%',
          pl: 6,
          my: 2,
          // position: 'fixed',
          // width: '35%',
          // zIndex: 3,
          // top: 9,
          // left: 55,
        }} 
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
        <Grid item xs={12}>
          <Card >
            {/* <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: `success.main`
              }}
            >
              <AccountOutline color="common.white" sx={{ backgroundColor: `success.main`, fontSize: '1.75rem' }} />
            </Avatar> */}
            <CardHeader title='Clientes' TypographyProps={{ variant: 'h6' }} />
              <Box onClick={openModalUpdateClientes}
                sx={{
                  height: '20px',
                  top: "135px",
                  right: "30px",
                  position: 'absolute',
                }}>
                <IconButton 
                  color='inherit' aria-haspopup='true'>
                  <Cached />
                </IconButton>
              </Box>
            <ClientesList dataClientsState={dataClientes} />
          </Card>
          {(showResultPagination == true) && (
            <Box sx={{ display: 'flex', mt: 7, mb:1, alignItems: 'center', justifyContent: 'center' }}>
              <IconButton 
                  color='inherit' 
                  aria-haspopup='true'
                  onClick={paginado} 
                  sx={{ 
                    position: "absolute", 
                    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500]
                }}>
                <DotsHorizontal
                  size='medium' 
                />
              </IconButton>
            </Box>
          )}
        </Grid>
      </Grid>

    </>
  )
}

export default ClientesPage
