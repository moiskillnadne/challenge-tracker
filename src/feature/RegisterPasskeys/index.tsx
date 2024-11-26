import { browserSupportsWebAuthn, startRegistration } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'

import { authService } from '~/shared/api/auth.service'
import { Button, Typography } from '~/shared/ui'

type Props = {
  label: string
  deviceName: string
}

export const RegisterPasskeys = ({ label, deviceName }: Props) => {
  const verifyChallenge = useMutation({
    mutationFn: authService.verifyRegistration,
    onSuccess: () => {
      console.info('[VerifyChallenge:onSuccess]')
    },
    onError: (err) => {
      console.info(`[VerifyChallenge:onError]: ${JSON.stringify(err)}`)
    },
  })

  const generateChallengeMutation = useMutation({
    mutationFn: authService.registerKeys,
    onSuccess: async (result) => {
      console.info('[GenerateChallenge:onSuccess]')

      const options = structuredClone(result.data)

      try {
        const attResult = await startRegistration({ optionsJSON: options })

        verifyChallenge.mutate(attResult)
      } catch (error: unknown) {
        console.error(error)
      }
    },
    onError: (err) => {
      console.info(`[GenerateChallenge:onError]: ${JSON.stringify(err)}`)
    },
  })

  const createChallenge = async () => {
    if (!browserSupportsWebAuthn()) {
      return console.error('WebAuthn is not supported')
    }

    generateChallengeMutation.mutate({ deviceName })
  }

  return (
    <Button onClick={createChallenge} classNames="bg-transparent border-black">
      <Typography text={label} classNames="font-semibold text-[20px] italic" />
    </Button>
  )
}
