
import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { generateImagesApi } from "./services/generateImages.api";


const  store = configureStore({
	reducer: {
		
		[generateImagesApi.reducerPath]: generateImagesApi.reducer,
		
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(generateImagesApi.middleware)
			

			// .concat(rhinoApi.middleware)
			// .concat(authApi.middleware)
			// .concat(userApi.middleware)
			// .concat(adminApi.middleware)
			.concat(),
	devTools: true,
});

setupListeners(store.dispatch);

export default store;