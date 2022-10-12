import Router from 'next/router';

// const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const UserService = {
	login,
	checkUser,
	logout,

	// register,
	// getAll,
	// getById,
};

function checkUser(setting: any) {
	const value = localStorage.getItem("user");
	const user = !!value ? JSON.parse(value) : undefined;

	if (user == undefined) {
		logout();
	} else {
    setting.saveSettings({...setting.settings, userState: user})
  }

	return user;
};

function login(values: any, adminUsersAccessTemp: any) {

	//Buscar en firebase
  const user = adminUsersAccessTemp.find(
    (user: any) =>
      user.email == values.email &&
      user.password == values.password)

	// publish user to subscribers and store in local storage to stay logged in between page refreshes
	if (user != null) {
		localStorage.setItem('user', JSON.stringify(user));

		return user;
	} else {
		return null;
	}

	//Buscar por api
	// return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
	//     .then(user => {
	//         // publish user to subscribers and store in local storage to stay logged in between page refreshes
	//         userSubject.next(user);
	//         localStorage.setItem('user', JSON.stringify(user));

	//         return user;
	//     });
}

function logout() {
	// remove user from local storage, publish null to user subscribers and redirect to login page
	localStorage.removeItem('user');
	Router.push('/login');
}

// function register(user) {
// 	// return fetchWrapper.post(`${baseUrl}/register`, user);
// }

// function getAll() {
// 	// return fetchWrapper.get(baseUrl);
// }

// function getById(id) {
// 	// return fetchWrapper.get(`${baseUrl}/${id}`);
// }

