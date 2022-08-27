import { FirebaseClient } from "./helpers/FirebaseClient";

const REFMODEL = "miembros_clientes"
export const ClientesService = {
	getAllClientes,
  getClienteById,
  getClientesByFilter,
  saveCliente,
  deleteCliente,
  filterAndOrderClientes
};

async function getAllClientes() {
  return await FirebaseClient.getDocsByRef(REFMODEL)
}

async function getClienteById(id: any) {
  return await FirebaseClient.getDocByRefAndDocId(REFMODEL, id)
}

async function getClientesByFilter(filters: any) {
  const totalData: any = [];
  const filtersSplitted = filters?.split(" ") || [filters];
  const filtersSplittedFormat = filtersSplitted.map(item => 
    item.includes("@") 
      ?  item 
      : item.substring(0, 1).toUpperCase() + item.substring(1)
  )

  console.log(filtersSplittedFormat)
  const dataFilterByFullName = await FirebaseClient.getDocsByRefAndFilter(REFMODEL, "full_name", "in", filtersSplittedFormat)
  dataFilterByFullName?.map((item) => totalData.push(item))

  const dataFilterByEmailAdress = await FirebaseClient.getDocsByRefAndFilter(REFMODEL, "email_address", "in", filtersSplittedFormat)
  dataFilterByEmailAdress?.map((item) => {
    if (totalData.find((el) => item.id === el.id) == null)
      totalData.push(item)
  })

  const dataFilterByFName = await FirebaseClient.getDocsByRefAndFilter(REFMODEL, "merge_fields.FNAME", "in", filtersSplittedFormat)
  dataFilterByFName?.map((item) => {
    if (totalData.find((el) => item.id === el.id) == null)
      totalData.push(item)
  })

  const dataFilterByLName = await FirebaseClient.getDocsByRefAndFilter(REFMODEL, "merge_fields.LNAME", "in",  filtersSplittedFormat)
  dataFilterByLName?.map((item) => {
    if (totalData.find((el) => item.id === el.id) == null)
      totalData.push(item)
  })

  const dataFilterByPhone = await FirebaseClient.getDocsByRefAndFilter(REFMODEL, "merge_fields.PHONE", "in", filtersSplittedFormat)
  dataFilterByPhone?.map((item) => {
    if (totalData.find((el) => item.id === el.id) == null)
      totalData.push(item)
  })

  return totalData;
}

async function saveCliente(data: any) {
  if (data.id != null) {
    return await FirebaseClient.updateDocByRefAndId(REFMODEL, data, data.id)
  } else {
    return await FirebaseClient.addDocByRef(REFMODEL, data)
  }
}

async function deleteCliente(id: any) {
  return await FirebaseClient.deleteDocByRef(REFMODEL, id)
}

function filterAndOrderClientes(dataPremios: any, filter: string) {
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