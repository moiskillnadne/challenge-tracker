import { useCallback } from 'react'

import { toast } from 'react-toastify'

type PromiseToastProps = {
  pending: string
  success: string
  error: string
}

export const useToast = () => {
  const showInfoToast = useCallback((message: string) => {
    return toast.info(message)
  }, [])

  const showSuccessToast = useCallback((message: string) => {
    return toast.success(message)
  }, [])

  const showErrorToast = useCallback((message: string) => {
    return toast.error(message)
  }, [])

  const showWarningToast = useCallback((message: string) => {
    return toast.warning(message)
  }, [])

  const showPromiseToast = useCallback(
    (promise: Promise<unknown>, promiseParams: PromiseToastProps) => {
      return toast.promise(promise, promiseParams)
    },
    [],
  )

  const dismissAllToasts = useCallback(() => {
    return toast.dismiss()
  }, [])

  const dismissToast = useCallback((toastId: string) => {
    return toast.dismiss(toastId)
  }, [])

  return {
    showToast: toast,
    showInfoToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showPromiseToast,
    dismissAllToasts,
    dismissToast,
  }
}
