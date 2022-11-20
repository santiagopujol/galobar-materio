// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'

import ClienteMesHome from 'src/components/Home/ClienteMesHome'
import EstadisticasHome from 'src/components/Home/EstadisticasHome'

import { useEffect, useState } from 'react';
import { UserService } from 'src/services'
import { useSettings } from 'src/@core/hooks/useSettings'
import { updateStateLoading } from 'src/@core/utils/common'

import { ClientesService } from 'src/services/ClientesService';
import { FirebaseClient } from 'src/services/helpers/FirebaseClient'

const Dashboard = () => {

  const setting = useSettings();
  const { settings, saveSettings } = setting

  const [dataClienteMes, setDataClienteMes] = useState(null);
  const [totalCrecimientoMes, setTotalCrecimientoMes] = useState('X');
  const [totalDataClientes, setTotalDataClientes] = useState(200);
  const [totalDataOperaciones, setTotalDataOperaciones] = useState(100);
  const [totalDataPremiosCanje, setTotalDataPremiosCanje] = useState(300);

  const getDataCountClientes = async () => {
    return await ClientesService.getCountClientes().then((result: any) => {
      return result
    });
  };

  const getDataCountOperaciones = async () => {
    return await FirebaseClient.getCountOperaciones().then((result: any) => {
      return result
    });
  };

  const getDataCountPremiosCanje = async () => {
    return await FirebaseClient.getCountPremiosCanje().then((result: any) => {
      return result
    });
  };

  const getDataClientes = async () => {
    return await ClientesService.getAllClientes().then((result: any) => {
      return result
    });
  };

  const getClienteMes = async (dataClientes: any) => {
    FirebaseClient.getOperaciones().then((operaciones: any) => {
      // Agrupar clientes con operaciones
      const clientesConOperaciones = [...new Set(operaciones.map((item: any) => item.clientId))];
      const arrayRankingTemp: any = [];

      clientesConOperaciones.forEach((clienteConOpId: any) => {
        let totPuntos = 0;
        let cantOperaciones = 0;
        let cantPremiosCanjeados = 0
        let ultimaOperacion = ""

        operaciones.forEach((op: any) => {
          if (clienteConOpId == op.clientId) {
            totPuntos = totPuntos + (op.puntos > 0 ? Number(op.puntos) : 0);
            cantOperaciones = cantOperaciones + 1
            cantPremiosCanjeados = (op.motivoVisitaId == "lYei1m0Xot7daKfdAraA") /* canje premio */ ? cantPremiosCanjeados + 1 : cantPremiosCanjeados

            if (ultimaOperacion == "" || (op.fechaOperacion > ultimaOperacion)) {
              ultimaOperacion = op.fechaOperacion
            }
          }
        })

        // temporal porque trabaja con toda la data de clientes innecesario
        const infoCliente = dataClientes.find((el: any) => el.id == clienteConOpId )
        const letra1 = infoCliente.merge_fields.FNAME.toUpperCase().substring(0, 1) + infoCliente.merge_fields.LNAME.toUpperCase().substring(0, 1)
        const letra2 = infoCliente.full_name.toUpperCase().substring(0, 1)
        const nombre1 = infoCliente.merge_fields.FNAME.toUpperCase() + " " + infoCliente.merge_fields.LNAME.toUpperCase()
        const nombre2 = infoCliente.full_name.toUpperCase()
        const letra3 = infoCliente.email_address.toLowerCase().substring(0, 1)
        // fin temporal

        arrayRankingTemp.push({
          letra: letra1 || letra2 || letra3,
          email: infoCliente.email_address,
          fullName: nombre1 || nombre2,
          clientId: clienteConOpId,
          ultimaOperacion: ultimaOperacion,
          total_puntos_acumulados: totPuntos,
          total_operaciones: cantOperaciones,
          total_premios_canjeados: cantPremiosCanjeados
        })
      })

      const max = arrayRankingTemp.reduce(function(prev: { total_puntos_acumulados: number }, current: { total_puntos_acumulados: number }) {
        return (prev.total_puntos_acumulados > current.total_puntos_acumulados) ? prev : current
      })
      setDataClienteMes(max)
    });
  };

  useEffect(() => {
    UserService.checkUser(setting);
    updateStateLoading(setting, true)

    const asyncUseEffect = async () => {
      const dataCountClientes = await getDataCountClientes()
      setTotalDataClientes(dataCountClientes)

      const dataCountOperaciones = await getDataCountOperaciones()
      setTotalDataOperaciones(dataCountOperaciones)

      const dataCountPremiosCanje = await getDataCountPremiosCanje()
      setTotalDataPremiosCanje(dataCountPremiosCanje)

      // temporal se pasa toda la data cliente
      const dataClientes = await getDataClientes()
      const clienteMes = await getClienteMes(dataClientes)
      setDataClienteMes(dataClientes)

      updateStateLoading(setting, false)
    }
    asyncUseEffect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ClienteMesHome
            cliente={dataClienteMes}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <EstadisticasHome
            porcCrecimiento={totalCrecimientoMes}
            operaciones={totalDataOperaciones}
            clientes={totalDataClientes}
            premiosCanjeados={totalDataPremiosCanje}
          />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
