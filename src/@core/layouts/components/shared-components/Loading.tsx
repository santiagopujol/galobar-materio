
import { Box, LinearProgress } from "@mui/material";
import React from "react"
import { useSettings } from "src/@core/hooks/useSettings";

const Loading = () => {

  const setting = useSettings();
  const { settings } = setting
  const { loadingState } = settings

  if (loadingState === true) {
		return (
      <>
        <Box sx={{ 
            height: '100%',
            position: 'fixed',
            width: '100%',
            bgcolor: '#9C9FA4',
            zIndex: 4,
            top: 0,
            left:0,
            opacity:'0.30',
          }}>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left:0,
          width: '100%',
          zIndex: 4,
        }}>
          <LinearProgress />
        </Box>
      </>
    )
  } else {
    return null
  }
}

export default Loading



/* 
  LOADING CARGANDO POR TIMEOUT
*/

// import { Box, LinearProgress } from "@mui/material";
// import React, { useState } from "react"
// import { useEffect } from 'react';
// import { useSettings } from "src/@core/hooks/useSettings";

// // Componente
// const Loading = () => {

//   const setting = useSettings();
//   const { settings } = setting
//   const { loadingState } = settings

//   const MIN = 0
//   const MAX = 100

//   const [valuePorc, setValuePorc] = useState(0);
//   const normalise = (value: any) => ((value - MIN) * 100) / (MAX - MIN);

// 	useEffect(() => {
//     if (!loadingState === true) {
//       const timeOutInterval = 50;
//         for (let index = 1; index < 11; index++) {
//           console.log(valuePorc)
//           setTimeout(() => {
//               setValuePorc(index * 10)
//           }, (timeOutInterval * index));
//         }
//     } else {
//       setValuePorc(0)
//     }

// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [loadingState]);

//   if (loadingState === true) {
// 		return (
//       <>
//         <Box sx={{ 
//             height: '100%',
//             position: 'fixed',
//             width: '100%',
//             bgcolor: '#9C9FA4',
//             zIndex: 2,
//             top: 0,
//             left:0,
//             opacity:'0.30',
//           }}>
//         </Box>

//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           position: 'fixed',
//           top: 0,
//           left:0,
//           width: '100%',
//           zIndex: 2,
//         }}>
//           <LinearProgress variant="determinate" value={normalise(valuePorc)} />
//         </Box>
//       </>
//     );
//   } else {
//     return null
//   }
// }

// export default Loading
