
/**
 * REPLICAR ESTRUCTURA DE PAGE CLIENTES
 * CON DISEÑO IGUAL PERO CON DATOS Y FUNCIONALIDAD DE PREMIOS (comentado abajo la version anterior)
 */



// import { useEffect, useState } from 'react';
// import useAppContext from '../../utils/context';
// import PremiosTableItem from '../../components/Premios/PremiosTableItem';
// import customStyles from '../../styles/custom.module.css';
// import { GetServerSideProps } from 'next';
// import { PremiosService } from '../../services/PremiosService'
// import Router from 'next/router';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context;
//   const {
//     filter = '',
//   } = query != null && query;

//   let dataPremios = await PremiosService.getAllPremios();

//   if (filter != '') {
//     dataPremios = await PremiosService.filterAndOrderPremios(dataPremios, filter);
//   }

//   return {
//     props: {
//       dataPremios,
//       filter
//     },
//   };
// };

// export default function Premios({ dataPremios, filter }) {
//   const {
//     setHeaderComponentState,
//     setLoadingState
//   } = useAppContext();

//   const [searchValue, setSearchValue] = useState(filter ? filter : '');

//   useEffect(() => {
//     setHeaderComponentState({
//       open: true,
//       activeIconArrow: false,
//       currentPageTitle: 'Premios',
//       prevComponentUrl: '/',
//       activeLogo: true
//     });
//     setLoadingState(false)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataPremios]);

//   function clearSearch() {
//     setLoadingState(true);
//     Router.push(`/premios`);
//     setSearchValue('');
//   }

  // function SearchButton() {
  //   // setLoadingState(true);
  //   // Buscando por filtro
  //   Router.push(`/premios?filter=${searchValue}`);
  // }

//   return (
//     <>
//       <div className="pt-28">
//         <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
//           Search
//         </label>
//         <div className="fixed z-[75] w-full top-12 mt-1 shadow-md shadow-slate-600/50 rounded-sm">
//           <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
//             <svg
//               className="w-5 h-5 text-gray-500 "
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//             </svg>
//           </div>
//           {searchValue != '' && (
//             <a
//               className="cursor-pointer hover:opacity-100 opacity-60 text-gray-900 mt-1 absolute right-20 top-4"
//               type="button"
//               onClick={() => {
//                 clearSearch();
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </a>
//           )}
//           <form onSubmit={(e) => e.preventDefault()}>
//             <input
//               id="inputSearch"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               name="inputSearch"
//               type="search"
//               className={
//                 'block p-4 pl-10 w-full text-sm border-gray-100 border-2 text-gray-900 rounded-sm border-solid h focus:ring-2 focus:outline-none focus:ring-indigo-900'
//               }
//               placeholder="Buscar premios .."
//             />
//             <button
//               onClick={() => SearchButton()}
//               type="submit"
//               className={`${customStyles.bg_primary_app} px-4 py-2 text-gray-300 hover:text-white absolute right-2.5 bottom-2.5
//               shadow-md shadow-slate-500/20 hover:opacity-100 opacity-95 focus:ring-2 focus:outline-none focus:ring-indigo-900 font-medium rounded-md text-sm`}
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//               </svg>
//             </button>
//           </form>
//         </div>
//         <div className="shadow-md -mt-1 shadow-slate-600/50 rounded bg-gray-100">
//           <table className="responsive w-full text-left bg-white">
//             <thead></thead>
//             <tbody>
//               {dataPremios &&
//                 dataPremios.map((premio) => (
//                   <PremiosTableItem key={premio.id} dataPremio={premio} />
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="fixed z-[90] w-full bottom-2 right-1 shadow-md shadow-slate-600/50">
//           <button
//             onClick={() => Router.push('/premios/new')}
//             type="submit"
//             className={`${customStyles.bg_primary_app} hover:bg-[${customStyles.bg_primary_app}] hover:opacity-100 opacity-95 px-4 py-4 absolute right-2.5 bottom-2.5
//               shadow-md shadow-slate-500/20 focus:ring-2 text-gray-300 hover:text-white focus:outline-none focus:ring-indigo-900 font-medium rounded-full text-sm`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5  "
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



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
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import { Box, InputAdornment, TextField } from '@mui/material'

import Fab from '@mui/material/Fab'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import ClientesList from 'src/components/Clientes/ClientesList'

// ** Services
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast,
  updateStateHeader } from 'src/@core/utils/common';
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

  console.log("DATA PREMIOS", newDataPremios)
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

  useEffect(() => {
    updateStateHeader(setting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateStateLoading(setting, false)
    setDataPremios(newDataPremios);
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
                    <IconButton color="info" size='small' aria-label='settings' className='card-more-options'>
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
