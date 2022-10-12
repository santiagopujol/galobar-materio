// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import CardHeader from '@mui/material/CardHeader'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {
  useTheme
} from '@mui/material'

// ** Icons Imports
import CashIcon from 'mdi-material-ui/Cash'

// App Imports
import moment from 'moment';

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { FirebaseClient } from 'src/services/helpers/FirebaseClient'

import { 
  updateStateNotificationToast 
} from 'src/@core/utils/common';

interface Data {
  id: number,
  fechaOperacion: Date,
  tipoOperacion: string,
  puntos: number,
  motivoVisitaNombre: string,
}

function createData(
  id: number,
  fechaOperacion: Date,
  tipoOperacion: string,
  puntos: number,
  motivoVisitaNombre: string,
): Data {
  return {
    id,
    fechaOperacion,
    tipoOperacion,
    puntos,
    motivoVisitaNombre
  }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string | Date }, b: { [key in Key]: number | string | Date }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'fechaOperacion',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Operación'
  },
  {
    id: 'motivoVisitaNombre',
    numeric: false,
    disablePadding: false,
    label: 'Motivo Visita'
  },
  {
    id: 'tipoOperacion',
    numeric: false,
    disablePadding: true,
    label: 'Operación'
  },
  {
    id: 'puntos',
    numeric: false,
    disablePadding: false,
    label: 'Puntos'
  },
]

function EnhancedTableHead(props: any) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ClientesListItemPuntosTab = ({ dataCliente }: { dataCliente: any }) => {
  const setting = useSettings();
  const theme = useTheme()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('fechaOperacion')
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [rows, setRows] = useState([]); //dataOperacionesByCliente
  const [dataMotivosVisita, setDataMotivosVisita] = useState([]);
  const [dataMotivosVisitaSinCanje, setDataMotivosVisitaSinCanje] = useState([]);

  const [stateForm, setStateForm] = useState<State>({
    puntos: '',
    motivoVisitaId: '',
    fechaOperacion: moment(Date.now()).format("yyyy-MM-DD hh:mm"),
    tipoOperacion: 'Crédito',
    clientId: dataCliente.id
  })

  const [totalPuntos, setTotalPuntos] = useState(0)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  interface State {
    puntos: string,
    motivoVisitaId: string,
    fechaOperacion: string
    tipoOperacion: string,
    clientId: string,
  }

  const handleInputChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [prop]: event.target.value })
  }

  const handleSelectChange = (prop: keyof State) => (event: SelectChangeEvent<string>) => {
    setStateForm({ ...stateForm, [prop]: event.target.value })
  }

  const validateForm = () => {
    if (stateForm.puntos == null || stateForm.puntos == "") {
      updateStateNotificationToast(setting, true, "warning", "Por favor, ingrese puntos a cargar.", 2000)
      return false
    }

    if (stateForm.motivoVisitaId == '') {
      updateStateNotificationToast(setting, true, "warning", "Por favor, ingrese un motivo de visita.", 2000)
      return false
    }

    stateForm.tipoOperacion = Number(stateForm.puntos) > 0 ? 'Crédito' : 'Débito';

    return true
  }

  async function saveFormPuntos() {
    if (!validateForm()) return false;
    setting.saveSettings({ ...setting.settings, loadingState: true })
    await FirebaseClient.addDocByRef("operaciones_miembros", stateForm)
      .then((res) => {
        setting.saveSettings({
          ...setting.settings,
          loadingState: false,
          notificationState: {
            open: true,
            type: "success",
            message: "Puntos cargados con éxito !",
            timeOut: 2000
          },
        })
        setStateForm({...stateForm, puntos: '', motivoVisitaId: ''})
        getAndSetDataOperaciones(dataMotivosVisita);
      }).catch((error) => {
        setting.saveSettings({
          ...setting.settings,
          loadingState: false,
          notificationState: {
            open: true,
            type: "error",
            message: "Ocurrió un error al realizar la operación, intente nuevamente.",
            timeOut: 2000
          },
        })
      });
  }


  const getDataMotivosVisita = async () => {
    return await FirebaseClient.getMotivosVisita().then((result: any) => {
      return result
    });
  };

  const getAndSetDataOperaciones = (dataMotivosResult: any) => {
    FirebaseClient.getOperacionesByClienteFirestore(dataCliente.id).then((result: any) => {
      let totPuntos = 0;
      result.forEach((operacion: any) => {
        operacion.motivoVisitaNombre = dataMotivosResult
          .filter((motivo: any) => motivo.id == operacion.motivoVisitaId)
          .map((m: any) => m.nombre)
          totPuntos = totPuntos + Number(operacion.puntos);
      })
      setRows(result)
      setTotalPuntos(totPuntos)
    });
  };
  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    const getData = async () => {
      const dataMotivosResult = await getDataMotivosVisita().then(result => result);
      const dataMotivosVisitaSinCanje = await getDataMotivosVisita().then(result => result); // Buscando 2 veces temporal

      // Eliminamos el canje premio que no se debe utilizar aqui
      const motivoCanjePremioId = dataMotivosVisitaSinCanje.findIndex((el: any) => el.nombre == "Canje Premio");
      dataMotivosVisitaSinCanje.splice(motivoCanjePremioId, 1)

      setDataMotivosVisitaSinCanje(dataMotivosVisitaSinCanje)
      setDataMotivosVisita(dataMotivosResult)
      getAndSetDataOperaciones(dataMotivosResult);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    value={stateForm.puntos}
                    id='puntos-input'
                    type='number'
                    onChange={handleInputChange('puntos')}
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
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel>Motivo de visita</InputLabel>
                  <Select label='Motivo de visita'
                    id='motivoVisita-select'
                    placeholder="Seleccione motivo"
                    value={stateForm.motivoVisitaId}
                    onChange={handleSelectChange('motivoVisitaId')}
                    >
                    {dataMotivosVisitaSinCanje != null && dataMotivosVisitaSinCanje.length > 0 &&
                      dataMotivosVisitaSinCanje.map((element: any) => (
                        <MenuItem key={element.id} value={element.id} >
                            <Avatar 
                              alt={element.nombre}
                              src={element.image64}
                            />
                          &nbsp;{element.nombre}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Button variant='contained' onClick={() => saveFormPuntos()} sx={{ marginRight: 3.5 }}>
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

        <Paper sx={{ width: '100%', mb: 2 }}>
        <CardHeader title={`Historial Operaciones ` + "(" + totalPuntos + " Puntos Disponibles)"}/>
        
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      <TableCell align='left'>{moment(row.fechaOperacion).format('DD/MM/YYYY HH:MM')}</TableCell>
                      <TableCell align='left'>{row.motivoVisitaNombre}</TableCell>
                      <TableCell color='error' align='left' sx={{ 
                          bgcolor: row.tipoOperacion == 'Crédito' ? 
                          theme.palette.success.dark : 
                          theme.palette.error.dark, color: "white"
                        }} 
                      >
                        {row.tipoOperacion}
                      </TableCell>
                      <TableCell align='left'>
                        <b>{row.puntos}</b>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Filas por página.'
        />
      </Paper>

      </CardContent>
    </form>
  )
}

export default ClientesListItemPuntosTab