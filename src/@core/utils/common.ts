export const Common = {
  getBase64,
  updateStateLoading
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

// Actualizar estado loading
export function updateStateLoading(setting: any, status: boolean, timeOut = 10) {
  setTimeout(()=>{
    setting.saveSettings({
      ...setting.settings,
      loadingState: status
    })
  }, timeOut)
}
