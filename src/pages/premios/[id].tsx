import { useEffect } from 'react';
import moment from 'moment';
import PremiosForm from '../../components/Premios/PremiosForm';
import { updateStateLoading,
  updateStateModalConfirm,
  updateStateNotificationToast,
  updateStateHeader } from 'src/@core/utils/common';

import { PremiosService } from 'src/services/PremiosService';

import { useSettings } from 'src/@core/hooks/useSettings'


const EditPremioItemPage = ({ dataPremio }: { dataPremio: any }) => {

  const setting = useSettings();

	useEffect(() => {
    updateStateHeader(setting, true, dataPremio.nombre , "/premios" )

		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<>
      <PremiosForm dataPremio={dataPremio} edit={true} />
		</>
	);
};

export default EditPremioItemPage


