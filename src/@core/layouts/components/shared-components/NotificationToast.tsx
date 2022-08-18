import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useSettings } from 'src/@core/hooks/useSettings';

const NotificationToast = () => {

  const setting = useSettings();
  const { settings, saveSettings } = setting
  const { notificationState } = settings
	const { type, open, message, timeOut } = notificationState

	useEffect(() => {
		if (open) dispatchToast()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationState])

	const dispatchToast = () => {
		switch (type) {
			case "success":
				toast.success(message, {
					autoClose: timeOut
				});
				break;
			case "warning":
				toast.warning(message, {
					autoClose: timeOut
				});
				break;
			case "error":
				toast.error(message, {
					autoClose: timeOut
				});
				break;
			case "info":
				toast.info(message, {
					autoClose: timeOut
				});
				break;
		}
		notificationState.open = false;
    saveSettings({ ...settings, notificationState })
	}

	return (
		<>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
			/>
		</>
	)
}

export default NotificationToast
