import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const tags = ["Images"];


export const generateImagesApi = createApi({
	reducerPath: "generateImagesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/",
		prepareHeaders: (headers, { getState }) => {
			return headers;
		},
	}),
	tagTypes: tags,
	endpoints: (builder) => ({
		generateImages: builder.mutation({
			query: (body: { prompt: string }) => ({
				url: `/GenerateImages`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGenerateImagesMutation } = generateImagesApi;

export type ApiResult = Promise<ReturnType<typeof generateImagesApi.reducer>>;