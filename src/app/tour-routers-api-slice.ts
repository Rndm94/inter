import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type TourRouteType = {
  id: number
  title: string
  //Representing minutes
  duration: number
  pictures: {
    public_id: string
    version: number
    signature: string
    width: number
    height: number
    format: string
    resource_type: "image" | "video" | "raw" | "auto"
    created_at: string
    tags: Array<string>
    pages: number
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    access_mode: string
    original_filename: string
    moderation: Array<string>
    access_control: Array<string>
    context: object //won't change since it's response, we need to discuss documentation team about it before implementing.
    metadata: object //won't change since it's response, we need to discuss documentation team about it before implementing.
    colors?: [string, number][]
  }[]
  available_times: string[]
  createdAt?: string
  updatedAt?: string
}

type AllTourRoutes = { totalCount: number; data: TourRouteType[] }

export const tourRoutesApiSlice = createApi({
  reducerPath: "tourRoutesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_PUBLIC_BACK_ENDPOINT}/tour-routes`,
  }),
  endpoints: builder => ({
    getTourRouteById: builder.query<TourRouteType, string>({
      query: id => `find/${id}`,
    }),
    getAllTourRoutes: builder.query<AllTourRoutes, number>({
      query: page => `find?page=${page}`,
    }),
  }),
})

export const { useGetTourRouteByIdQuery, useGetAllTourRoutesQuery } =
  tourRoutesApiSlice
