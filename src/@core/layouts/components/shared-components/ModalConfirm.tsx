import React from "react"
import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import { useSettings } from "src/@core/hooks/useSettings";
import { updateStateModalConfirm } from 'src/@core/utils/common';

// Componente
const ModalConfirm = () => {

  const theme = useTheme();
  const setting = useSettings();
  const { settings, saveSettings } = setting
  const { modalConfirmState } = settings
  const { title, message, buttonTrue, buttonFalse, open, method, successResult  } = modalConfirmState
  
  const sizeScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const closeAction = () => {
    updateStateModalConfirm(setting, false, method, false)
  }

  const confirmAction = () => {
    updateStateModalConfirm(setting, false, method, true)
  }

  // On change modalConfirm state
  useEffect(() => {
    console.log(modalConfirmState)
  }, [modalConfirmState]);

  if (open) {
    return (
      <>
        <Dialog
          fullScreen={sizeScreen}
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
            <Button fullWidth variant='body2' onClick={closeAction}>
              {buttonFalse}
            </Button>
            <Button fullWidth variant='contained' onClick={confirmAction}>
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