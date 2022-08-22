// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

// import TableDense from 'src/views/tables/TableDense'
// import TableSpanning from 'src/views/tables/TableSpanning'
// import TableCustomized from 'src/views/tables/TableCustomized'
// import TableCollapsible from 'src/views/tables/TableCollapsible'
// import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import { updateStateLoading } from 'src/@core/utils/common';
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { query } = context;
	const {
		page = 1,
		count = 10,
		all = '0',
		filter = '',
	} = query != null && query;

	const baseUrl =
		process.env.NODE_ENV === 'production'
			? 'https://galobar.vercel.app/api'
			: 'http://localhost:3000/api';

	const res = await fetch(
		`${baseUrl}/getListMembers?page${page}&count=${count}&all=${all}&filter=${filter}`
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

const ClientesPage = ({ newDataMembers, page, filter, baseUrl }) => {

  const setting = useSettings();
  const router = useRouter();

	const [dataClientes, setDataClientes]: any = useState([]);
  const [searchValue, setSearchValue] = useState(filter ? filter : '');
  const [currentPageClientes, setCurrentPageClientes] = useState(page ? page : 1);
	const [showResultPagination, setShowResultPagination] = useState(true);

  useEffect(() => {
    // Header State
    setting.saveSettings({
      ...setting.settings,
      headerState: {
        activeIconArrow: false,
        methodSearch: SearchClientes,
        currentPageTitle: 'Cliente',
        prevComponentUrl: '/clientes',
      }
    })
    setCurrentPageClientes(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
		setDataClientes(newDataMembers);
    updateStateLoading(setting, false)

		// Confirmar si desea actualizar la informacion de mailchimp
		// if (newDataMembers.members && newDataMembers.members.length == 0) {
		// 	setModalConfirmState({
		// 		open: true,
		// 		method: "acualizar_clientes",
		// 		title: "¿Desea actualizar todos los datos de los clientes?",
		// 		message: "Se recomienda actualizar al realizar la primer búsqueda.",
		// 		buttonTrue: "SI",
		// 		buttonFalse: "NO",
		// 	})
		// } else {
    //   setModalConfirmState({})
		// }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newDataMembers]);

  // Buscando todos los datos
  function SearchAll() {
    updateStateLoading(setting, true)
    router.push(`/clientes?page=1&all=1`);
    setShowResultPagination(false);
    setCurrentPageClientes(1);
  }

  function SearchClientes() {
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
    all = 0,
    filter = ''
  ) {
    updateStateLoading(setting, true)
    const res = await fetch(
      `${baseUrl}/getListMembers?page${page}&count=${count}&filter=${filter}&all=${all}`
    );
    const data = await res.json();
    setDataClientes(data);
    updateStateLoading(setting, false)
  }

  return (
    <>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Clientes
            </Link>
          </Typography>
          <Typography variant='body2'></Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Clientes' titleTypographyProps={{ variant: 'h6' }} />
          {/* <TableBasic /> */}

            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="R" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

export default ClientesPage
