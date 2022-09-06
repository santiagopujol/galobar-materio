import { useEffect } from 'react';
import moment from 'moment';
import PremiosForm from '../../components/Premios/PremiosForm';
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast,
  updateStateHeader } from 'src/@core/utils/common';

import { useSettings } from 'src/@core/hooks/useSettings'

const NewPremioPage = () => {

  const setting = useSettings();

	const instancePremio = {
		id: 0,
		nombre: '',
		puntos: '',
		descripcion: '',
    fechaAbm: moment(Date.now()).format("yyyy-MM-DD"),
		imageUrl: '',
	}

	useEffect(() => {
    updateStateHeader(setting, true, '' , "/premios" )

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
	return (
		<>
      <PremiosForm dataPremio={instancePremio} edit={false} />
		</>
	);
};

export default NewPremioPage


