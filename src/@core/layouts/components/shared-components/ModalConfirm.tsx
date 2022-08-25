import React from "react"
import { useEffect } from 'react';
import customStyles from '../../styles/custom.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import { useSettings } from "src/@core/hooks/useSettings";
import { updateStateModalConfirm } from 'src/@core/utils/common';

// Componente
const ModalConfirm = () => {
  // const {
  //   modalConfirmState,
  //   setModalConfirmState
  // } = useAppContext();

  // const {
  //   title = modalConfirmState.title != undefined ? modalConfirmState.title : "¿Desea confirmar la operación?",
  //   message = modalConfirmState.message != undefined ? modalConfirmState.message : "",
  //   buttonTrue = modalConfirmState.buttonTrue != undefined ? modalConfirmState.buttonTrue : "CONFIRMAR",
  //   buttonFalse = modalConfirmState.buttonFalse != undefined ? modalConfirmState.buttonFalse : "CANCELAR",
  //   open = modalConfirmState.open != undefined ? modalConfirmState.open : false,
  // } 
  // = modalConfirmState

  
  const theme = useTheme();
  const setting = useSettings();
  const { settings, saveSettings } = setting
  const { modalConfirmState } = settings
  const { title, message, buttonTrue, buttonFalse, open, method, successResult  } = modalConfirmState
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const closeAction = () => {
    updateStateModalConfirm(setting, false, method, false)
  }

  const confirmAction = () => {
    updateStateModalConfirm(setting, false, method, true)
  }

  //ComponentDidMouunt
  useEffect(() => {
    //Apagar modal y restablecer
    if (modalConfirmState == {}) {
      setting.saveSettings({
        ...setting.settings,
        modalConfirmState: {
          title: modalConfirmState.title != undefined ? modalConfirmState.title : "¿Desea confirmar la operación?",
          message: "",
          buttonTrue: "CONFIRMAR",
          buttonFalse: "CANCELAR",
          open: false,
          method: "",
          successResult: false
        }
      })
    }
  }, [modalConfirmState]);

  if (open) {
    return (
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={closeAction}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeAction}>
              {buttonFalse}
            </Button>
            <Button onClick={confirmAction} autoFocus>
              {buttonTrue}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  } else {
    return null
  }
}

export default ModalConfirm