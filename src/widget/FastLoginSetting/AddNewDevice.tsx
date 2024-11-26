import { useState } from 'react'

import { browserSupportsWebAuthn, startRegistration } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'

import { useCustomTranslation } from '~/feature/translation'
import { authService } from '~/shared/api/auth.service.ts'
import { useToast } from '~/shared/hooks'
import { Button, Typography } from '~/shared/ui'

export const AddNewDevice = () => {
  const { t } = useCustomTranslation()

  const {} = useToast()

  const [device, setDeviceName] = useState<string>('')

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

    generateChallengeMutation.mutate({ deviceName: device })
  }

  const isLoading = generateChallengeMutation.isPending || verifyChallenge.isPending

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-3">
        <input
          type="text"
          name="deviceName"
          id="deviceName"
          placeholder="Device Name"
          autoComplete="DeviceName"
          className="bg-transparent focus:outline-none duration-300 h-[40px] placeholder-black/50 border-b-2 border-black hover:border-black/20 focus:border-black/50 w-[300px]"
          onChange={(e) => setDeviceName(e.target.value)}
        />

        <div className="w-[300px] h-[45px]">
          <Button
            onClick={createChallenge}
            classNames="bg-transparent border-black"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            <Typography text={t('createFastLogin')} classNames="font-semibold text-[20px] italic" />
          </Button>
        </div>
      </div>
    </div>
  )
}
