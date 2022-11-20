import { useEffect } from 'react';
import moment from 'moment';
import MotivosVisitaForm from '../../components/MotivosVisita/MotivosVisitaForm';
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast,
  updateStateHeader } from 'src/@core/utils/common';

import { MotivosVisitaService } from 'src/services/MotivosVisitaService';

import { useSettings } from 'src/@core/hooks/useSettings'


const MotivosVisitaItemPage = ({ data }: { data: any }) => {

  const setting = useSettings();

	useEffect(() => {
    updateStateHeader(setting, true, data.nombre , "/motivos_visita" )

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<>
      <MotivosVisitaForm data={data} edit={true} />
		</>
	);
};

export default MotivosVisitaItemPage


