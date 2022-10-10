import { useEffect } from 'react';
import moment from 'moment';
import MotivosVisitaForm from '../../components/MotivosVisita/MotivosVisitaForm';
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast,
  updateStateHeader } from 'src/@core/utils/common';

import { useSettings } from 'src/@core/hooks/useSettings'

const NewMotivoVisitaPage = () => {

  const setting = useSettings();

	const instance = {
		id: 0,
		nombre: '',
		puntos: '',
		descripcion: '',
    fechaAbm: moment(Date.now()).format("yyyy-MM-DD"),
		imageUrl: '',
	}

	useEffect(() => {
    updateStateHeader(setting, true, '' , "/motivos_visita" )

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
	return (
		<>
      <MotivosVisitaForm data={instance} edit={false} />
		</>
	);
};

export default NewMotivoVisitaPage


