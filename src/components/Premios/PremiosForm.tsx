import { FormEvent, ChangeEvent, ElementType, useEffect, useState } from 'react';

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
import { useSettings } from 'src/@core/hooks/useSettings'
import { Common } from 'src/@core/utils/common';
import { useRouter } from 'next/router'
import { PremiosService } from '../../services/PremiosService';

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** States
import { 
  updateStateLoading, 
  updateStateModalConfirm, 
  updateStateNotificationToast 
} from 'src/@core/utils/common';

const PremiosForm = ({ dataPremio, edit = false }: any) => {
  const setting = useSettings();
  
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

  const [stateForm, setStateForm] = useState({
    id: edit ? dataPremio.id : null,
    nombre: dataPremio.nombre || "",
    descripcion: dataPremio.descripcion || "",
    puntos: dataPremio.puntos || "",
    image64: dataPremio.image64 || null,
    imageUrl: dataPremio.imageUrl || null,
    fechaAbm: dataPremio.fechaAbm || "",
  });

  const imagenInicial = dataPremio.image64 || null
  const [resetImage, setResetImage] = useState(false) 
  const { modalConfirmState } = setting.settings
  const router = useRouter()

  function handleChange(e: any) {
    if (e.target.files) {
      stateForm.imageUrl = URL.createObjectURL(e.target.files[0])
      Common.getBase64(e.target.files[0]).then(data => {
        stateForm.image64 = data
        setStateForm({ ...stateForm, [e.target.name]: e.target.files[0] });
      })
      setResetImage(false)
    } else {
      setStateForm({ ...stateForm, [e.target.name]: e.target.value });
    }
  }

  async function saveFormData() {
    if (!validateForm()) return false;
    setting.saveSettings({ ...setting.settings, loadingState: true })
    await PremiosService.savePremio(stateForm)
      .then((res) => {
        setting.saveSettings({
          ...setting.settings,
          loadingState: false,
          notificationState: {
            open: true,
            type: "success",
            message: "Premio guardado con éxito !",
            timeOut: 2000
          },
        })
        router.push('/premios');
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

  const validateForm = () => {
    if (stateForm.nombre == null || stateForm.nombre == "") {
      updateStateNotificationToast(setting, true, "warning", "Por favor, ingrese un nombre.", 2000)
      return false
    }

    if (stateForm.puntos == null || stateForm.puntos == "") {
      updateStateNotificationToast(setting, true, "warning", "Por favor, ingrese valor en puntos.", 2000)
      return false
    }

    if (stateForm.imageUrl == null) {
      updateStateNotificationToast(setting, true, "warning", "Por favor, seleccionar un archivo.", 2000)
      return false
    }

    return true
  }

  // Efecto secundario para escuchar la respuesta del modal de confirmacion 
  useEffect(() => {
    if (modalConfirmState.method === "eliminar_premio" && modalConfirmState.successResult == true) {
      eliminarPremio(stateForm.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalConfirmState.successResult == true])

  const eliminarPremio = async function (id: number) {
    setting.saveSettings({ ...setting.settings, loadingState: true })
    await PremiosService.deletePremio(id)
      .then((res) => {
        setting.saveSettings({
          ...setting.settings,
          loadingState: false,
          modalConfirmState: {},
          notificationState: {
            open: true,
            type: "success",
            message: "Premio eliminado con éxito !",
            timeOut: 2000
          },
        })
        router.push('/premios');
      }).catch((error) => {
        alert("error")
        setting.saveSettings({
          ...setting.settings,
          loadingState: false,
          modalConfirmState: {},
          notificationState: {
            open: true,
            type: "error",
            message: "Ocurrió un error al realizar la operación, intente nuevamente.",
            timeOut: 2000
          },
        })
      });
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
                type='text'
                name="nombre"
                required
                label='Nombre'
                onChange={handleChange}
                value={stateForm.nombre}
                placeholder='-'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {/* <AccountOutline /> */}
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="puntos"
                label='Puntos'
                type='number'
                value={stateForm.puntos}
                onChange={handleChange}
                placeholder='-'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {/* <Phone /> */}
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                type='text'
                name="descripcion"
                minRows={3}
                onChange={handleChange}
                value={stateForm.descripcion}
                label='Descripción'
                placeholder='...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {/* <MessageOutline /> */}
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {(stateForm.imageUrl != null || stateForm.image64 != null) &&
                  <ImgStyled src={
                    resetImage ? imagenInicial : 
                      stateForm.image64 != null ? 
                        stateForm.image64 : 
                        stateForm.imageUrl} 
                  alt="image_premio" />
                }
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Agregar Imagen
                    <input
                      hidden
                      name="image" 
                      type='file'
                      onChange={handleChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => setResetImage(true) }>
                    Limpiar Imagen
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Archivos permitidos PNG o JPEG. Tamaño máximo 800Kb.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* EDIT FORM */}
            {stateForm.id != null &&
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                  <Button color='error' onClick={() => updateStateModalConfirm(setting, true, "eliminar_premio")}>
                    Eliminar
                  </Button>
                </Box>
              </Grid>
            }
            <Grid item xs={stateForm.id != null ? 6 : 12}>
              <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <Button onClick={() => saveFormData() }>
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
