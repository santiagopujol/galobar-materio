import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { visuallyHidden } from '@mui/utils'
import moment from 'moment'

interface Data {
  id: number
  fullName: string
  email: string
  ultimaOperacion: Date
  total_operaciones: number
  total_puntos_acumulados: number
  total_premios_canjeados: number
}

function createData(
  id: number,
  fullName: string,
  email: string,
  ultimaOperacion: Date,
  total_operaciones: number,
  total_puntos_acumulados: number,
  total_premios_canjeados: number
): Data {
  return {
    id,
    fullName,
    email,
    ultimaOperacion,
    total_operaciones,
    total_puntos_acumulados,
    total_premios_canjeados
  }
}

const rows = [
  createData(1, 'Pedro Perez', 'pedro@gmail.com', moment('2022-10-16').toDate(), 54, 60000, 20),
  createData(2, 'Marcelo Marea', 'marce@gmail.com', moment('2022-10-11').toDate(), 40, 50000, 15),
  createData(3, 'Carlos Mive', 'fer@gmail.com', moment('2022-10-22').toDate(), 53, 30000, 5),
  createData(4, 'Osvaldo Notx', 'osvaldo@gmail.com', moment('2022-09-15').toDate(), 44, 20000, 7),
  createData(5, 'Mike Wasosky', 'mike@gmail.com', moment('2022-09-13').toDate(), 34, 20000, 11)
]

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
    id: 'fullName',
    numeric: false,
    disablePadding: true,
    label: 'Nombre'
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'ultimaOperacion',
    numeric: true,
    disablePadding: false,
    label: 'Ult. Operación'
  },
  {
    id: 'total_operaciones',
    numeric: true,
    disablePadding: false,
    label: 'Total. Operaciones'
  },
  {
    id: 'total_puntos_acumulados',
    numeric: true,
    disablePadding: false,
    label: 'Total puntos acumulados'
  },
  {
    id: 'total_premios_canjeados',
    numeric: true,
    disablePadding: false,
    label: 'Total premios canjeados'
  }
]

function EnhancedTableHead(props: any) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('ultimaOperacion')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <CardHeader title='Ranking' />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.fullName}>
                      <TableCell align='center'>
                        <Avatar alt={row.fullName} src='#' />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.fullName}
                      </TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell align='right'>{moment(row.ultimaOperacion).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align='right'>{row.total_operaciones}</TableCell>
                      <TableCell align='right'>{row.total_puntos_acumulados}</TableCell>
                      <TableCell align='right'>{row.total_premios_canjeados}</TableCell>
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
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Comprimir filas' />
    </Box>
  )
}
