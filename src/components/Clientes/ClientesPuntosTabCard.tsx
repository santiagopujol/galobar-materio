// import { useEffect, useState } from 'react';
// import customStyles from '../../styles/custom.module.css';
// import { useAppContext } from '../../utils/context';
// import { FirebaseClient } from '../../services/helpers/FirebaseClient';
// import { BsPlusLg } from 'react-icons/bs';

// const ClientesPuntosTabCard = ({ dataCliente }) => {
//   const [dataPuntosCliente, setDataPuntosCliente] = useState(null);
//   const [dataOperacionesByCliente, setDataOperacionesByCliente] = useState([]);

//   const { setLoadingState } = useAppContext();

//   const {
//     merge_fields: { FNAME, LNAME, PHONE, BIRTHDAY },
//     email_address,
//     vip,
//     last_changed,
//   } = dataCliente;

//   const getPuntosCliente = async () => {
//     await FirebaseClient.getPuntosByClienteFirestore(dataCliente.id).then((result) => {
//       console.log('Resultados', result);
//       setDataPuntosCliente(result[0]);
//     });
//     setLoadingState(false);

//     // return JSON.stringify(dataOperaciones)
//   };

//   const getDataOperaciones = () => {
//     FirebaseClient.getOperacionesByClienteFirestore(dataCliente.id).then((result) => {
//       // console.log(result);
//       // setDataOperacionesByCliente(result);
//     });
//     // return JSON.stringify(dataOperaciones)
//   };

//   useEffect(() => {
//     getPuntosCliente();
//     getDataOperaciones();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <div className="shadow-md border-r-1 shadow-slate-600/50 rounded mt-3 ">
//         <table className="responsive w-full text-left">
//           <tbody>
//             <tr className="border-b border-gray-300">
//               <td className="px-3 py-3 font-bold rounded inline-flex items-center">
//                 <div className="relative w-10 h-10 mr-4 mb-2 overflow-hidden rounded-full ">
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
//                 </div>
//                 <div className={'text-left ' + customStyles.font_app_content}>
//                   <b className="text-gray-900">
//                     {FNAME.toUpperCase()} {LNAME.toUpperCase()}
//                   </b>
//                   <p className="text-gray-500 text-sm"> {email_address}</p>
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td
//                 className={`mx-auto w-full px-4 py-4 rounded grid grid-cols-1 align-middle h-full
//                 items-center ${customStyles.font_app_content}`}
//               >
//                 <ul className="w-full text-sm font-medium">
//                   <li>
//                     <div
//                       className={`flex justify-between flex-row text-center items-center w-full py-0 tracking-wide 
//                       rounded-sm `}
//                     >
//                       <p
//                         className="text-white justify-center mx-auto shadow-xl hover:text-emerald-400 transition-colors ease-linear
//                        font-bold text-2xl rounded-full  px-8 py-4 h-fit bg-emerald-500 "
//                       >
//                         {dataPuntosCliente != null ? dataPuntosCliente.total_puntos : ''}
//                         <span
//                           className={`text-xl w-auto pl-1  font-bold text-gray-900 uppercase  ${customStyles.font_app_content}`}
//                         >
//                           Puntos disponibles
//                         </span>
//                       </p>
//                     </div>
//                   </li>
//                   <li className="py-4">
//                     <div className="flex justify-center gap-9 items-center bg-slate-200 p-4 rounded-sm">
//                       <label
//                         htmlFor="list-radio-license"
//                         className={`text-base w-fit text-gray-900  ${customStyles.font_app_content}`}
//                       >
//                         Cargar monto:
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="5000"
//                         className="w-16 text-lg py-1 text-emerald-500 text-center rounded-lg"
//                       />
//                       <button
//                         className={` px-2 py-2 bg-emerald-500 text-slate-800 shadow-md shadow-slate-600/50 
//                         hover:opacity-80 focus:ring-2 focus:outline-none focus:ring-indigo-900 font-medium rounded-full 
//                         text-sm`}
//                       >
//                         <i>
//                           {' '}
//                           <BsPlusLg />
//                         </i>
//                       </button>
//                     </div>
//                   </li>
//                 </ul>
//                 <ul>
//                   <div
//                     className="overflow-y-scroll shadow-md sm:rounded-lg h-40
//                     "
//                   >
//                     <table className="w-full text-sm text-center border border-gray-200">
//                       <thead
//                         className="text-xs uppercase text-slate-700 bg-slate-200 sticky top-0 h-10
//                         "
//                       >
//                         <tr>
//                           <th scope="col" className="py-3 px-2 ">
//                             Puntos
//                           </th>
//                           <th scope="col" className="py-3 px-2 ">
//                             Operacion
//                           </th>
//                           <th scope="col" className="py-3 px-2 ">
//                             Fecha
//                           </th>
//                           <th scope="col" className="py-3 px-2">
//                             Hora
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr
//                           className="border-b border-gray-100 hover:bg-gray-200 
//                           transition-colors ease-linear"
//                         >
//                           <th
//                             scope="row"
//                             className="py-4 px-6 text-red-500 whitespace-nowrap font-normal "
//                           >
//                             1000
//                           </th>
//                           <td className="py-4 px-2 text-red-500 ">Canje</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">14:33</td>
//                         </tr>
//                         <tr className="border-b border-gray-100  hover:bg-gray-200 transition-colors ease-linear">
//                           <th scope="row" className="py-4 px-6 text-emerald-400 whitespace-nowrap ">
//                             2800
//                           </th>
//                           <td className="py-4 px-2 text-emerald-400 ">Carga</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">19:42</td>
//                         </tr>
//                         <tr className="border-b border-gray-100 hover:bg-gray-200 transition-colors ease-linear">
//                           <th
//                             scope="row"
//                             className="py-4 px-6 text-red-500 whitespace-nowrap 
//                                "
//                           >
//                             1000
//                           </th>
//                           <td className="py-4 px-2 text-red-500 ">Canje</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">14:33</td>
//                         </tr>
//                         <tr className="border-b border-gray-100  hover:bg-gray-200 transition-colors ease-linear">
//                           <th scope="row" className="py-4 px-6  text-emerald-400 whitespace-nowrap">
//                             2800
//                           </th>
//                           <td className="py-4 px-2 text-emerald-400">Carga</td>
//                           <td className="py-4 px-2 text-slate-800">10/10/2022</td>
//                           <td className="py-4 px-2 text-slate-800">19:42</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ClientesPuntosTabCard;
