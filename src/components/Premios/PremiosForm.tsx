// import customStyles from '../../styles/custom.module.css';
// import Image from 'next/image';
// import { FormEvent, useEffect, useState } from 'react';
// import { PremiosService } from '../../services/PremiosService';
// import { useAppContext } from '../../utils/context';
// import Router from 'next/router';
// import { Common } from '../../utils/common';

// const PremiosForm = ({ dataPremio, edit = false }) => {

//   const [stateForm, setStateForm] = useState({
//     id: edit ? dataPremio.id : null,
//     nombre: dataPremio.nombre || "",
//     descripcion: dataPremio.descripcion || "",
//     puntos: dataPremio.puntos || "",
//     image64: dataPremio.image64 || null,
//     imageUrl: dataPremio.imageUrl || null,
//     fechaAbm: dataPremio.fechaAbm || "",
//   });

//   const {
//     setLoadingState,
//     setNotificationState,
//     modalConfirmState,
//     setModalConfirmState,
//   } = useAppContext();

//   function handleChange(e) {
//     if (e.target.files) {
//       stateForm.imageUrl = URL.createObjectURL(e.target.files[0])
//       Common.getBase64(e.target.files[0]).then(data => {
//         stateForm.image64 = data
//         setStateForm({ ...stateForm, [e.target.name]: e.target.files[0] });
//       })
//     } else {
//       setStateForm({ ...stateForm, [e.target.name]: e.target.value });
//     }
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     await saveFormData(stateForm)
//   }

//   const validateForm = () => {
//     if (stateForm.imageUrl != null) {
//       return true
//     }
//     setNotificationState({
//       open: true,
//       type: "warning",
//       message: "Por favor, seleccionar un archivo.",
//       timeOut: 2000
//     })
//     return false
//   }

//   async function saveFormData(data: object) {
//     console.log(stateForm)
//     if (!validateForm()) return false;

//     setLoadingState(true)
//     await PremiosService.savePremio(data)
//       .then((res) => {
//         setNotificationState({
//           open: true,
//           type: "success",
//           message: "Premio guardado con éxito !",
//           timeOut: 2000
//         })
//         Router.push('/premios');
//       }).catch((error) => {
//         setNotificationState({
//           open: true,
//           type: "error",
//           message: "Ocurrió un error al realizar la operación, intente nuevamente.",
//           timeOut: 2000
//         })
//       });
//   }

//   // Efecto secundario para escuchar la respuesta del modal de confirmacion 
//   useEffect(() => {
//     if (modalConfirmState.method === "eliminar_premio" && modalConfirmState.successResult == true) {
//       eliminarPremio(stateForm.id)
//       setModalConfirmState({})
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [modalConfirmState])

//   const eliminarPremio = async function (id) {
//     setLoadingState(true)
//     await PremiosService.deletePremio(id)
//       .then((res) => {
//         setNotificationState({
//           open: true,
//           type: "success",
//           message: "Premio eliminado con éxito !",
//           timeOut: 2000
//         })
//         Router.push('/premios');
//       }).catch((error) => {
//         setNotificationState({
//           open: true,
//           type: "error",
//           message: "Ocurrió un error al realizar la operación, intente nuevamente.",
//           timeOut: 2000
//         })
//       });
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-2">
//           <label htmlFor="text" className="block text-sm font-semibold text-gray-800">
//             Nombre
//           </label>
//           <input
//             type="text"
//             name="nombre"
//             id="nombre"
//             required
//             onChange={handleChange}
//             value={stateForm.nombre}
//             className={`block w-full px-4 py-2 ${customStyles.col_primary_app} 
//               bg-white border rounded-md focus:border-blue-900 mt-1
// 							focus:ring-blue-500 shadow-md shadow-slate-600/50 focus:outline-none focus:ring focus:ring-opacity-40`}
//           />
//         </div>
//         <div className="mb-2">
//           <label htmlFor="text" className="block text-sm font-semibold text-gray-800">
//             Descripción
//           </label>
//           <input
//             type="text"
//             name="descripcion"
//             required
//             onChange={handleChange}
//             value={stateForm.descripcion}
//             className={`block shadow-md shadow-slate-600/50 rounded-md w-full px-4 py-2 mt-1 ${customStyles.col_primary_app} 
//               bg-white border rounded-md focus:border-blue-900
// 							focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
//           />
//         </div>
//         <div className="mb-2">
//           <label htmlFor="date" className="block text-sm font-semibold text-gray-800">
//             Valor Puntos
//           </label>
//           <input
//             type="number"
//             name="puntos"
//             required
//             value={stateForm.puntos}
//             onChange={handleChange}
//             className={`block w-full shadow-md shadow-slate-600/50 px-4 py-2 mt-1	${customStyles.col_primary_app} 
//               bg-white border rounded-md focus:border-blue-900
//               focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
//           />
//         </div>
//         <div className="mb-2">
//           <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
//             Fecha Modificación
//           </label>
//           <input
//             type="date"
//             name="fecha"
//             value={stateForm.fechaAbm}
//             onChange={handleChange}
//             className={`block w-full shadow-md shadow-slate-600/50 px-4 py-2 mt-1	${customStyles.col_primary_app} 
//               bg-white border rounded-md focus:border-blue-900
//               focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
//           />
//         </div>
//         <div className="flex flex-col gap-2 pt-1 xs:w-fit sm:w-fit md:w-fit justify-center">
//           {(stateForm.imageUrl != null || stateForm.image64 != null) &&
//             <Image src={stateForm.image64 != null ? stateForm.image64 : stateForm.imageUrl}
//               alt="image" width={100} height={180}
//             />
//           }<input className="block w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
//             id="small_size" 
//             name="image" 
//             type="file" 
//             onChange={handleChange}>
//           </input>
//         </div>

//       <div className="mt-3 mb-3">
//         {/* EDIT FORM */}
//         {stateForm.id != null &&
//           <div className="w-full fixed bottom-0 left-0 justify-center text-white">
//             <button type="button"
//               onClick={() => setModalConfirmState({ open: true, method: "eliminar_premio" })
//               }
//               className={`justify-center text-gray-400 border-gray-700 border-r border-1 hover:text-red-500 ${customStyles.font_app_content} ${customStyles.bg_primary_app} w-1/2 hover:bg-[red-500]
//               rounded-t-sm py-3 text-center opacity-95 hover:opacity-100 inline-flex font-bold items-center focus:ring-2 focus:outline-none focus:ring-red-500`}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 -ml-1 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               ELIMINAR
//             </button>
//             <button type="submit" className={` 
//               ${customStyles.font_app_content} ${customStyles.bg_primary_app} w-1/2 hover:bg-[${customStyles.bg_primary_app}]
//               rounded-t-sm py-3 text-center text-gray-400 hover:opacity-100 opacity-95 border-gray-700 border-l border-1 hover:text-green-500 font-bold inline-flex 
//               justify-center items-center focus:ring-2 focus:outline-none focus:ring-green-500`}>
//               <svg xmlns="http://www.w3.org/2000/svg"
//                 className="mr-2 -ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//               GUARDAR
//             </button>
//           </div>
//         }
//         {/* NUEVO FORM */}
//         {stateForm.id == null &&
//           <button type="submit" className={`w-full fixed bottom-0 left-0 justify-center text-white 
//               ${customStyles.font_app_content} ${customStyles.bg_primary_app} hover:bg-[${customStyles.bg_primary_app}] hover:opacity-100 opacity-95
//               rounded-t-sm py-3 text-gray-400 text-center font-bold inline-flex items-center focus:ring-2 focus:outline-none hover:text-green-500 focus:ring-green-500`}>
//             <svg xmlns="http://www.w3.org/2000/svg"
//               className="mr-2 -ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//             </svg>
//             GUARDAR
//           </button>
//         }
//         </div>
//       </form>
//     </>
//   );
// };

// export default PremiosForm;

import { ChangeEvent, ElementType, useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button, { ButtonProps } from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const PremiosForm = ({ dataPremio, edit = false }: any) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  console.log(dataPremio)
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
  
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
  
      reader.readAsDataURL(files[0])
    }
  }


  return (
    <Card>
      <CardHeader title={(edit ? 'Editar ' : 'Nuevo ') + 'Premio'}/>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Message'
                placeholder='Bio...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Agregar Imagen
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                    Limpiar Imagen
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Archivos permitidos PNG o JPEG. Tamaño máximo 800Kb.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                <Button>
                  Eliminar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <Button>
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default PremiosForm
