// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import CashIcon from 'mdi-material-ui/Cash'

// App Imports
import moment from 'moment';
import { Numeric9PlusCircle } from 'mdi-material-ui'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const ClientesListItemPuntosTab = ({ dataCliente }: { dataCliente: any }) => {

  interface State {
    puntos: string
  }
  
  const [values, setValues] = useState<State>({
    puntos: '',
  })

  const handlePuntosInputChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const [dataPuntosCliente, setDataPuntosCliente] = useState(null);
  const [dataOperacionesByCliente, setDataOperacionesByCliente] = useState([]);

  const getPuntosCliente = async () => {
    // await FirebaseClient.getPuntosByClienteFirestore(dataCliente.id).then((result) => {
    //   console.log('Resultados', result);
    //   setDataPuntosCliente(result[0]);
    // });
    // setLoadingState(false);

    // return JSON.stringify(dataOperaciones)
  };

  const getDataOperaciones = () => {
    // FirebaseClient.getOperacionesByClienteFirestore(dataCliente.id).then((result) => {
      // console.log(result);
      // setDataOperacionesByCliente(result);
    // });
    // return JSON.stringify(dataOperaciones)
  };
  
  interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density'
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2)
    }
  ]
  
  interface Data {
    name: string
    code: string
    size: number
    density: number
    population: number
  }
  
  function createData(name: string, code: string, population: number, size: number): Data {
    const density = population / size
  
    return { name, code, population, size, density }
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
  ]
  
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    // getPuntosCliente();
    // getDataOperaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ** State

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='puntos-input'>Puntos</InputLabel>
                  <OutlinedInput
                    label='Puntos'
                    value={values.puntos}
                    id='puntos-input'
                    type='number'
                    onChange={handlePuntosInputChange('puntos')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='puntos-icon'
                        >
                          <CashIcon/>
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Button variant='contained' sx={{ marginRight: 3.5 }}>
                    Cargar Puntos
                </Button>
              </Box>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

      </CardContent>
    </form>
  )
}

export default ClientesListItemPuntosTab


// import { useEffect, useState } from 'react';
// import customStyles from '../../styles/custom.module.css';
// import { useAppContext } from '../../utils/context';
// import { FirebaseClient } from '../../services/helpers/FirebaseClient';
// import { BsPlusLg } from 'react-icons/bs';

// const ClientesListItemPuntosTab = ({ dataCliente }) => {
//   const [dataPuntosCliente, setDataPuntosCliente] = useState(null);
//   const [dataOperacionesByCliente, setDataOperacionesByCliente] = useState([]);

//   const { setLoadingState } = useAppContext();

//   const {
//     merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
//     email_address,
//     vip,
//     last_changed,
//   } = dataCliente;

//   const getPuntosCliente = async () => {
//     await FirebaseClient.getPuntosByClienteFirestore(dataCliente.id).then((result) => {
//       console.log('Resultados', result);
//       setDataPuntosCliente(result[0]);
//     });
//     setLoadingState(false);

//     // return JSON.stringify(dataOperaciones)
//   };

//   const getDataOperaciones = () => {
//     FirebaseClient.getOperacionesByClienteFirestore(dataCliente.id).then((result) => {
//       // console.log(result);
//       // setDataOperacionesByCliente(result);
//     });
//     // return JSON.stringify(dataOperaciones)
//   };

//   useEffect(() => {
//     getPuntosCliente();
//     getDataOperaciones();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <div className="shadow-md border-r-1 shadow-slate-600/50 rounded mt-3 ">
//         <table className="responsive w-full text-left">
//           <tbody>
//             <tr className="border-b border-gray-300">
//               <td className="px-3 py-3 font-bold rounded inline-flex items-center">
//                 <div className="relative w-10 h-10 mr-4 mb-2 overflow-hidden rounded-full ">
//                   <svg
//                     className={'absolute w-12 h-12 -left-1 ' + customStyles.col_primary_app}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </div>
//                 <div className={'text-left ' + customStyles.font_app_content}>
//                   <b className="text-gray-900">
//                     {FNAME.toUpperCase()} {LNAME.toUpperCase()}
//                   </b>
//                   <p className="text-gray-500 text-sm"> {email_address}</p>
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`mx-auto w-full px-4 py-4 rounded grid grid-cols-1 align-middle h-full
//                 items-center ${customStyles.font_app_content}`}
//               >
//                 <ul className="w-full text-sm font-medium">
//                   <li>
//                     <div
//                       className={`flex justify-between flex-row text-center items-center w-full py-0 tracking-wide 
//                       rounded-sm `}
//                     >
//                       <p
//                         className="text-white justify-center mx-auto shadow-xl hover:text-emerald-400 transition-colors ease-linear
//                        font-bold text-2xl rounded-full  px-8 py-4 h-fit bg-emerald-500 "
//                       >
//                         {dataPuntosCliente != null ? dataPuntosCliente.total_puntos : ''}
//                         <span
//                           className={`text-xl w-auto pl-1  font-bold text-gray-900 uppercase  ${customStyles.font_app_content}`}
//                         >
//                           Puntos disponibles
//                         </span>
//                       </p>
//                     </div>
//                   </li>
//                   <li className="py-4">
//                     <div className="flex justify-center gap-9 items-center bg-slate-200 p-4 rounded-sm">
//                       <label
//                         htmlFor="list-radio-license"
//                         className={`text-base w-fit text-gray-900  ${customStyles.font_app_content}`}
//                       >
//                         Cargar monto:
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="5000"
//                         className="w-16 text-lg py-1 text-emerald-500 text-center rounded-lg"
//                       />
//                       <button
//                         className={` px-2 py-2 bg-emerald-500 text-slate-800 shadow-md shadow-slate-600/50 
//                         hover:opacity-80 focus:ring-2 focus:outline-none focus:ring-indigo-900 font-medium rounded-full 
//                         text-sm`}
//                       >
//                         <i>
//                           {' '}
//                           <BsPlusLg />
//                         </i>
//                       </button>
//                     </div>
//                   </li>
//                 </ul>
//                 <ul>
//                   <div
//                     className="overflow-y-scroll shadow-md sm:rounded-lg h-40
//                     "
//                   >
//                     <table className="w-full text-sm text-center border border-gray-200">
//                       <thead
//                         className="text-xs uppercase text-slate-700 bg-slate-200 sticky top-0 h-10
//                         "
//                       >
//                         <tr>
//                           <th scope="col" className="py-3 px-2 ">
//                             Puntos
//                           </th>
//                           <th scope="col" className="py-3 px-2 ">
//                             Operacion
//                           </th>
//                           <th scope="col" className="py-3 px-2 ">
//                             Fecha
//                           </th>
//                           <th scope="col" className="py-3 px-2">
//                             Hora
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr
//                           className="border-b border-gray-100 hover:bg-gray-200 
//                           transition-colors ease-linear"
//                         >
//                           <th
//                             scope="row"
//                             className="py-4 px-6 text-red-500 whitespace-nowrap font-normal "
//                           >
//                             1000
//                           </th>
//                           <td className="py-4 px-2 text-red-500 ">Canje</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">14:33</td>
//                         </tr>
//                         <tr className="border-b border-gray-100  hover:bg-gray-200 transition-colors ease-linear">
//                           <th scope="row" className="py-4 px-6 text-emerald-400 whitespace-nowrap ">
//                             2800
//                           </th>
//                           <td className="py-4 px-2 text-emerald-400 ">Carga</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">19:42</td>
//                         </tr>
//                         <tr className="border-b border-gray-100 hover:bg-gray-200 transition-colors ease-linear">
//                           <th
//                             scope="row"
//                             className="py-4 px-6 text-red-500 whitespace-nowrap 
//                                "
//                           >
//                             1000
//                           </th>
//                           <td className="py-4 px-2 text-red-500 ">Canje</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">14:33</td>
//                         </tr>
//                         <tr className="border-b border-gray-100  hover:bg-gray-200 transition-colors ease-linear">
//                           <th scope="row" className="py-4 px-6  text-emerald-400 whitespace-nowrap">
//                             2800
//                           </th>
//                           <td className="py-4 px-2 text-emerald-400">Carga</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">19:42</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ClientesListItemPuntosTab;
