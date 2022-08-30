// import customStyles from '../../styles/custom.module.css';
// import moment from 'moment';
// import { FaBirthdayCake } from 'react-icons/fa';
// import { BsPhone } from 'react-icons/bs';
// import { RiVipLine } from 'react-icons/ri';
// import { AiOutlineMail } from 'react-icons/ai'

// const ClientesListItemInfoTab = ({ dataCliente }) => {
//   const {
//     merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
//     email_address,
//     vip,
//     last_changed,
//   } = dataCliente;

//   return (
//     <>
//       <div className="shadow-md border-r-1 pb-1 shadow-slate-600/50 rounded mt-3">
//         <table className="responsive w-full text-left ">
//           {/* 
//             <thead className={"text-base " + customStyles.bg_primary_app + " " + customStyles.col_secondary_app}>
//               <tr>
//                   <th scope="col" className={`px-4 py-2 text-md w-fit flex flex-row align-middle items-center ${customStyles.font_app_content}`}>
//                       <Image src={imageInfo} alt="notebook" width={25} height={25} />
//                       <span className="pl-3">Información</span>
//                   </th>
//               </tr>
//             </thead> 
//           */}
//           <tbody>
//             {/* <tr className="border-b border-gray-300"> */}
//               {/* <td className="px-3 py-3 font-bold rounded inline-flex items-center"> */}
//                 {/* <div className="relative w-10 h-10 mr-4 mb-2 overflow-hidden rounded-full ">
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
//                 </div> */}
//                 {/* <div className={'text-left ' + customStyles.font_app_content}>
//                   <b className="text-gray-900">
//                     {FNAME.toUpperCase()} {LNAME.toUpperCase()}
//                   </b> */}
//                   {/* <p className="text-gray-500 text-sm"> {email_address}</p> */}
                
//               {/* </td> */}
//             {/* </tr> */}
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-3 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <AiOutlineMail /><span>Email</span>
//                 </p>
//                 <p className="text-gray-900">
//                   <p className="text-gray-500 font-bold">{email_address != '' ? email_address : '-'}</p>
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-3 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <BsPhone /><span>Teléfono</span>
//                 </p>
//                 <p className="text-gray-900">
//                   <p className="text-gray-500">{PHONE != '' ? PHONE : '-'}</p>
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <FaBirthdayCake />
//                   <span>Cumpleaños</span>
//                 </p>
//                 <p className="text-gray-500">{BIRTHDAY != '' ? BIRTHDAY : '-'}</p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <RiVipLine /> <span>Vip:</span>
//                 </p>
//                 <p className={"font-bold " + (!vip ? 'text-green-500' : 'text-red-500')}>{!vip ? 'Si' : 'No'}</p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">Ult. Modificación</p>
//                 <p className="text-gray-500">
//                   {last_changed != null && moment(Date.parse(last_changed)).format('DD/MM/YYYY')}
//                 </p>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default ClientesListItemInfoTab;


// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// App Imports
// import moment from 'moment';


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const ClientesListItemInfoTab = ({ dataCliente }: { dataCliente: any }) => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const {
    merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
    email_address,
    vip,
    last_changed,
  } = dataCliente;

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' placeholder='johnDoe' defaultValue='johnDoe' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' placeholder='John Doe' defaultValue='John Doe' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue='johnDoe@example.com'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default ClientesListItemInfoTab
