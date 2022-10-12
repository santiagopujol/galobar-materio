import { FirebaseClient } from "./helpers/FirebaseClient";

const REFMODEL = "premios"
export const PremiosService = {
	getAllPremios,
	getPremioById,
  savePremio,
  deletePremio,
  filterAndOrderPremios
};

async function getAllPremios() {
  return await FirebaseClient.getDocsByRef(REFMODEL)
}

async function getPremioById(id: any) {
  return await FirebaseClient.getDocByRefAndDocId(REFMODEL, id)
}

async function savePremio(data: any) {
  delete data.image
  if (data.id != null) {
    return await FirebaseClient.updateDocByRefAndId(REFMODEL, data, data.id)
  } else {
    return await FirebaseClient.addDocByRef(REFMODEL, data)
  }
}

async function deletePremio(id: any) {
  return await FirebaseClient.deleteDocByRef(REFMODEL, id)
}

function filterAndOrderPremios(dataPremios: any, filter: string) {
  const filterSplit = filter.split(" ");
  let tempData: any = [];
  tempData = dataPremios.filter((e: any) =>
    String(e.nombre.trim().toLowerCase()).includes(filter.trim().toLowerCase()) ||
    filterSplit[0] && String(e.nombre.trim().toUpperCase()).includes(filterSplit[0].trim().toUpperCase()) ||
    filterSplit[0] && String(e.descripcion.trim().toUpperCase()).includes(filterSplit[0].trim().toUpperCase()) ||
    filterSplit[1] && String(e.nombre.trim().toUpperCase()).includes(filterSplit[1].trim().toUpperCase()) ||
    filterSplit[1] && String(e.descripcion.trim().toUpperCase()).includes(filterSplit[1].trim().toUpperCase()) ||
    filterSplit[2] && String(e.nombre.trim().toUpperCase()).includes(filterSplit[2].trim().toUpperCase()) ||
    filterSplit[2] && String(e.descripcion.trim().toUpperCase()).includes(filterSplit[2].trim().toUpperCase())
  ).sort((first: any, second: any) => 0 - (first.full_name > second.full_name ? -1 : 1));

  return tempData;
}