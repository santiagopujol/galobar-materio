// import type { NextApiRequest, NextApiResponse } from 'next';
import { MailchimpService } from '../../services/MailchimpService'

/* GetListMembers
  Obtener registros de mailchimp
  path: /api/getListMembers
  params
    page int
    count int
    all string
    filter string
*/
export default async function handler(
  req: any, //NextApiRequest
  res: any // NextApiResponse<ClientType>
) {
  // Validate User Logged
  // Validate Params XSS
  try {
    const { page = 1, count = 10, update = "0", filter = '' } = req.query != null && req.query
    const dataClientes = await MailchimpService.getListMembersMailchimpWithParams(page, count, update, filter);

    return res.status(200).json(dataClientes)
  } catch (error: any) {
    console.log(error)
    
    return res.status(500).json({ error: error.message || error.toString() });
  }
}