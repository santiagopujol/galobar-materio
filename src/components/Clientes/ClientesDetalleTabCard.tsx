// import customStyles from '../../styles/custom.module.css';
// import moment from 'moment';
// import { FaBirthdayCake } from 'react-icons/fa';
// import { BsPhone } from 'react-icons/bs';
// import { RiVipLine } from 'react-icons/ri';
// import { AiOutlineMail } from 'react-icons/ai'

// const ClientesDetalleTabCard = ({ dataCliente }) => {
//   const {
//     merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
//     email_address,
//     vip,
//     last_changed,
//   } = dataCliente;

//   return (
//     <>
//       <div className="shadow-md border-r-1 pb-1 shadow-slate-600/50 rounded mt-3">
//         <table className="responsive w-full text-left ">
//           {/* 
//             <thead className={"text-base " + customStyles.bg_primary_app + " " + customStyles.col_secondary_app}>
//               <tr>
//                   <th scope="col" className={`px-4 py-2 text-md w-fit flex flex-row align-middle items-center ${customStyles.font_app_content}`}>
//                       <Image src={imageInfo} alt="notebook" width={25} height={25} />
//                       <span className="pl-3">Información</span>
//                   </th>
//               </tr>
//             </thead> 
//           */}
//           <tbody>
//             {/* <tr className="border-b border-gray-300"> */}
//               {/* <td className="px-3 py-3 font-bold rounded inline-flex items-center"> */}
//                 {/* <div className="relative w-10 h-10 mr-4 mb-2 overflow-hidden rounded-full ">
//                   <svg
//                     className={'absolute w-12 h-12 -left-1 ' + customStyles.col_primary_app}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </div> */}
//                 {/* <div className={'text-left ' + customStyles.font_app_content}>
//                   <b className="text-gray-900">
//                     {FNAME.toUpperCase()} {LNAME.toUpperCase()}
//                   </b> */}
//                   {/* <p className="text-gray-500 text-sm"> {email_address}</p> */}
                
//               {/* </td> */}
//             {/* </tr> */}
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-3 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <AiOutlineMail /><span>Email</span>
//                 </p>
//                 <p className="text-gray-900">
//                   <p className="text-gray-500 font-bold">{email_address != '' ? email_address : '-'}</p>
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-3 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <BsPhone /><span>Teléfono</span>
//                 </p>
//                 <p className="text-gray-900">
//                   <p className="text-gray-500">{PHONE != '' ? PHONE : '-'}</p>
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <FaBirthdayCake />
//                   <span>Cumpleaños</span>
//                 </p>
//                 <p className="text-gray-500">{BIRTHDAY != '' ? BIRTHDAY : '-'}</p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">
//                   <RiVipLine /> <span>Vip:</span>
//                 </p>
//                 <p className={"font-bold " + (!vip ? 'text-green-500' : 'text-red-500')}>{!vip ? 'Si' : 'No'}</p>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`pl-7 rounded pt-2 pb-2 inline-block w-auto ${customStyles.font_app_content}`}
//               >
//                 <p className="flex gap-1 items-center font-bold align-middle">Ult. Modificación</p>
//                 <p className="text-gray-500">
//                   {last_changed != null && moment(Date.parse(last_changed)).format('DD/MM/YYYY')}
//                 </p>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default ClientesDetalleTabCard;
