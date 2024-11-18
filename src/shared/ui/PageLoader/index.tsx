export const PageLoader = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-[50px] h-[50px]">
        <div
          className={`w-full h-full rounded-full border-4 border-transparent animate-spin border-t-white`}
        />
      </div>
    </div>
  )
}
