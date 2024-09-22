import { toast } from "react-toastify"
import { axiosInstance, toastError } from "../utils/requests"
import { createAppSlice } from "./createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

type UserType = {
  id: number
  name: string
  email: string
  type: "super-admin" | "client"
  phone?: string
  avatar?: string
}

export interface UserSliceState {
  user: UserType | null
  status: "idle" | "loading"
}

const initialState: UserSliceState = {
  status: "idle",
  user: null,
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (credentials: {
        email: string
        password: string
        rememberMe: boolean
      }) => {
        const results = await axiosInstance.post<UserType>(
          "/auth/login",
          credentials,
        )
        return results.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        rejected: (state, { error }) => {
          state.status = "idle"
        },
        fulfilled: (state, { payload }) => {
          state.user = payload
          state.status = "idle"
        },
      },
    ),
    getUserInfo: create.asyncThunk(
      async () => {
        const results = await axiosInstance.get<UserType>("/auth/login")
        return results.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        rejected: (state, { error }) => {
          state.status = "idle"
        },
        fulfilled: (state, { payload }) => {
          state.user = payload
          state.status = "idle"
        },
      },
    ),
    logoutUser: create.asyncThunk(
      async () => {
        const results = await axiosInstance.get<UserType>("/auth/logout")
        return results.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        rejected: (state, { error }) => {
          state.status = "idle"
        },
        fulfilled: state => {
          state.user = null
          state.status = "idle"
        },
      },
    ),
    updateMyselfUser: create.asyncThunk(
      async (
        values: {
          name: string
          email: string
          phone: string | undefined
        },
        { getState },
      ) => {
        const currentState = getState() as { user: { user: UserType } }
        const currentUser = currentState.user.user
        if (
          values.email === currentUser.email &&
          values.name === currentUser.name &&
          (values.phone === currentUser.phone ||
            (!values.phone && !currentUser.phone))
        ) {
          toast.info("No se ha introducido ningún cambio")
          return null
        } else {
          await axiosInstance.patch("/users/myself", values)
          return values
        }
      },
      {
        rejected: (state, { error }) => {
          state.status = "idle"
          const { status } = toastError(error)
          if (status === 419) {
            state.user = null
          }
        },
        fulfilled: (
          state,
          {
            payload,
          }: PayloadAction<{
            name: string
            email: string
            phone: string | undefined
          } | null>,
        ) => {
          if (state.user && payload) {
            state.user = { ...state.user, ...payload }
            toast.success("Cambios en el perfil guardados")
          }
        },
      },
    ),
  }),
  selectors: {
    selectUser: state => state,
  },
})

export const { loginUser, getUserInfo, logoutUser, updateMyselfUser } =
  userSlice.actions
export const { selectUser } = userSlice.selectors
