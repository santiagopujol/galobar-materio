export const Common = {
  getBase64,
  updateStateHeader,
  updateStateLoading,
  updateStateNotificationToast,
  updateStateModalConfirm
}

// Obtener base 64 de archivo para guardar en firebase
export function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Actualizar estado Usuario
export function updateStateUser(setting: any, user: boolean, timeOut = 1) {
  setTimeout(() => {
    setting.saveSettings({
      ...setting.settings,
      userState: user
    })
  }, timeOut)
}

// Actualizar estado Header
export function updateStateHeader(
  setting: any,
  activeIconArrow = false,
  currentPageTitle = "",
  prevComponentUrl = "/",
  timeOut = 1
) {
  setTimeout(() => {
    setting.saveSettings({
      ...setting.settings,
      headerState: {
        activeIconArrow: activeIconArrow,
        currentPageTitle: currentPageTitle,
        prevComponentUrl: prevComponentUrl,
      },
    })
  }, timeOut)
}

// Actualizar estado loading
export function updateStateLoading(setting: any, status: boolean, timeOut = 1) {
  setTimeout(() => {
    setting.saveSettings({
      ...setting.settings,
      loadingState: status
    })
  }, timeOut)
}

// Actualizar estado Notification Toast
export function updateStateNotificationToast(setting: any, status: boolean, type = "", message = "", timeOutNotif = 2000, timeOut = 1) {
  setTimeout(() => {
    setting.saveSettings({
      ...setting.settings,
      notificationState: {
        open: status,
        type: type,
        message: message,
        timeOut: timeOutNotif
      },
    })
  }, timeOut)
}

// Actualizar estado ModalConfirm
export function updateStateModalConfirm(setting: any, status: boolean, method = "", successResult = false, title = "", message = "", timeOut = 1) {
  setTimeout(() => {
    setting.saveSettings({
      ...setting.settings,
      modalConfirmState: {
        title: title != "" ? title : "Confirmación",
        message: message != "" ? message : "¿Desea confirmar la operación?",
        buttonTrue: "CONFIRMAR",
        buttonFalse: "CANCELAR",
        open: status,
        method: method,
        successResult: successResult
      }
    })
  }, timeOut)
}


