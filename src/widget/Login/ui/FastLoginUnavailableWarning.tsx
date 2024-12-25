import { Typography } from '~/shared/ui'

export const FastLoginUnavailableWarning = () => {
  return (
    <div className="w-[315px] border-1 border-black bg-white rounded-20 py-12 px-24 text-center">
      <Typography
        text="Oops.. Fast login unavailable"
        classNames="font-black text-M text-red mb-16"
      />
      <Typography
        text="Set up Fast Login in your account settings after logging in with a code."
        classNames="font-medium text-M text-black"
      />
    </div>
  )
}
