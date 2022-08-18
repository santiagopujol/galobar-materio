// eslint-disable-next-line @typescript-eslint/no-var-requires
const mailchimp = require("@mailchimp/mailchimp_marketing");

let dataMembersCache: any = {members: []};

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const MailchimpService = {
  getAudienceMailchimp,
  getListMembersMailchimp,
  getMemberMailchimp,
  getListMembersMailchimpWithParams
};

async function getAudienceMailchimp() {
  const responseData = await mailchimp.lists.getList(String(process.env.MAILCHIMP_AUDIENCE_ID));

  return JSON.stringify(responseData)
}

async function getListMembersMailchimp(count = 10, page = 1) {
  const responseData = await mailchimp.lists.getListMembersInfo(
    String(process.env.MAILCHIMP_AUDIENCE_ID),
    {
      count: count,
      offset: (page * count) - count, 
    }
  );

  return JSON.stringify(responseData)
}

async function getMemberMailchimp(hash: any) {
  const responseData = await mailchimp.lists.getListMember(
    String(process.env.MAILCHIMP_AUDIENCE_ID),
    String(hash)
  );

  return JSON.stringify(responseData)
}

async function getListMembersMailchimpWithParams(page: any, count: any, all: number, filter: string) {
  console.log(page, count, all, filter)
  try {
    // Si quiere actualizar toda la data cache
    if (all && all == 1) {
      const resultDataAllMembers = await getAllDataMembers()
      dataMembersCache = JSON.parse(resultDataAllMembers);
      console.log("Actualizando cache members")
    }

    // Busqueda por página segun count, por defecto 10
    if (filter && filter != '') {
      const resultDataMembersFiltered = await getDataMembersByFilter(filter)

      return resultDataMembersFiltered

    // Busqueda por página segun count, por defecto 10
    } else {
      const resultDataMembersByPage = await getDataMembersByPage(count, page)

      return resultDataMembersByPage
    }
  } catch (error) {
    console.log(error)

    return error
  }
}

// PRIVATE FUNCTIONS
async function getDataMembersByFilter(filter: string){
  // if (dataMembersCache.members.length == 0) {
  //   console.log("Actualizando cache total de miembros para proximas busquedas")
  //   const dataListClientes = await getListMembersMailchimp(99999999)
  //   dataMembersCache = JSON.parse(dataListClientes);
  // }
  console.log("Filtrando en cache")
  const dataFiltered = filterAndOrderMembersDataCache(filter)

  // Si no encontro vuelvo a buscar y guardo la data
  // if (dataFiltered.members.length == 0) {
  //   console.log("No se encontro el resultado")
  //   // const dataListClientes = await getListMembersMailchimp(99999999)
  //   return dataFiltered;
  // }
  return dataFiltered;
}

async function getAllDataMembers() {
  console.log("Obteniendo string de todos los miembros de mailchimp")
  const dataListClientes = await getListMembersMailchimp(99999999)

  return dataListClientes
}

async function getDataMembersByPage(count: number, page: number) {
  console.log("Obteniendo json " + count + " registros de la pagina " + page + " seleccionada")
  const dataListClientes = await getListMembersMailchimp(
    count, // cantidad datos
    page // pagina
  )

  return JSON.parse(dataListClientes)
}

// TEST OPTIMIZAR BUSQUEDA
// Filtro en array por nombre y apellido y email en la data cache
function filterAndOrderMembersDataCache(filter: string) {
  const filterSplit = filter.split(" ");
  const tempData: any = {members: [], total_items: 0};
  tempData.members = dataMembersCache.members.filter((e: any ) =>
    String(e.email_address.trim().toLowerCase()).includes(filter.trim().toLowerCase()) ||
    filterSplit[0] && String(e.merge_fields.FNAME.trim().toUpperCase()).includes(filterSplit[0].trim().toUpperCase()) ||
    filterSplit[0] && String(e.merge_fields.LNAME.trim().toUpperCase()).includes(filterSplit[0].trim().toUpperCase()) ||
    filterSplit[1] && String(e.merge_fields.FNAME.trim().toUpperCase()).includes(filterSplit[1].trim().toUpperCase()) ||
    filterSplit[1] && String(e.merge_fields.LNAME.trim().toUpperCase()).includes(filterSplit[1].trim().toUpperCase()) ||
    filterSplit[2] && String(e.merge_fields.FNAME.trim().toUpperCase()).includes(filterSplit[2].trim().toUpperCase()) ||
    filterSplit[2] && String(e.merge_fields.LNAME.trim().toUpperCase()).includes(filterSplit[2].trim().toUpperCase())
  ).sort((first: any, second: any) => 0 - (first.full_name > second.full_name ? -1 : 1));
  tempData.total_items = tempData.members.length;

  return tempData;
}
