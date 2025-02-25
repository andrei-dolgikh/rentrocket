'use client'
import axios, { type CreateAxiosDefaults } from 'axios'
import { toast } from 'sonner'
import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import Router from 'next/router'

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const options: CreateAxiosDefaults = {
	baseURL: backendUrl,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		} else if (error?.response?.status === 400) {
			const errorMessage = error?.response?.data?.message?.[0]
			toast.error(errorMessage)
		  }
		  else if (error?.response?.status === 500) {
			const errorMessage = error?.response?.data?.message
			toast.error(errorMessage)
		  }
		  else if (error?.response?.status === 404) {
			toast.error("Ошибка действия.")
		  }
		  else if (error?.response?.status === 429) {
			toast.error("Cлишком много запросов, попробуйте позже.")
		  }
		  else if (error?.response?.status === 401) {
			toast.error("Ошибка авторизации.")
		  }
		  else if (error?.response?.status === 403) {
			toast.error("Доступ запрещен.")
			Router.back()
		  }


	}
)

export { axiosClassic, axiosWithAuth }
