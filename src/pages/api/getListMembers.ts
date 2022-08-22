import type { NextApiRequest, NextApiResponse } from 'next';
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
  req: NextApiRequest,
  res: NextApiResponse<any> // ClientType
) {
  // Validate User Logged
  // Validate Params XSS
  try {
    const { page = 1, count = 10, all = "0", filter = '' } = req.query != null && req.query
    const dataClientes = await MailchimpService.getListMembersMailchimpWithParams(page, count, all, filter);
    return res.status(200).json(dataClientes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message || error.toString() });
  }
}