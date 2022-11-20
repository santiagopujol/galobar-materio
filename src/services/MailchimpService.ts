import {ClientesService} from './ClientesService';

import cacheData from "memory-cache";

// import mailchimp from '@mailchimp/mailchimp_marketing';
const mailchimp = require("@mailchimp/mailchimp_marketing");

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

async function getListMembersMailchimpWithParams(page: any, count: any, update: number, filter: string) {
  console.log(page, count, update, filter)
  try {

    // Si el usuario envia update, actualiza toda la data en firebase
    if (update && update == 1) {
      console.log("Limpiando la cache")
      cacheData.clear();
      const dataMembersJson = await getAllDataMembersMailchimp()
      await addUpdateMembersFirebaseDB(dataMembersJson);
    }

    // Busqueda por filtro dinamico
    if (filter && filter != '') {
      const resultDataMembersFiltered = await ClientesService.getClientesByFilter(filter)

      return resultDataMembersFiltered
        && {
          members: resultDataMembersFiltered,
          totalItems: resultDataMembersFiltered.length,
        }
        || []

      // Sino viene filter busco por página segun count, por defecto 10
    } else {
      if (cacheData.get("mailchimp_" + page)) {
        return cacheData.get("mailchimp_" + page);
      } else {
        const resultDataMembersByPage = await getDataMembersByPage(count, page)
        cacheData.put('mailchimp_' + page, resultDataMembersByPage, 86400000);

        return resultDataMembersByPage
      }
    }

  } catch (error) {
    console.log(error)

    return error
  }
}

// Private Functions
async function getAllDataMembersMailchimp() {
  console.log("Obteniendo string de todos los miembros de mailchimp")
  const resultDataAllMembers = await getListMembersMailchimp(9999999)

  const allData = JSON.parse(resultDataAllMembers);
  console.log("todos los miembros:", allData.members.length);
  cacheData.put("member_length", allData.members.length);
  return JSON.parse(resultDataAllMembers);
}

async function addUpdateMembersFirebaseDB(dataMembersJson: any) {
  console.log("Actualizando members en firebase")
  dataMembersJson.members.forEach((element: any) => {
    delete element._links
    ClientesService.saveCliente(element)
  });
}

async function getDataMembersByPage(count: number, page: number) {
  console.log("Obteniendo de Mailchimp json " + count + " registros de la pagina " + page + " seleccionada")
  const dataListClientes = await getListMembersMailchimp(
    count, // cantidad datos
    page // pagina
  )

  return JSON.parse(dataListClientes)
}

