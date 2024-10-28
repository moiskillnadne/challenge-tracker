type ModalButtonProps = {
  label: string
  onClick: () => void
  color: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode

  leftButton?: ModalButtonProps
  rightButton?: ModalButtonProps
}

export const Modal = ({ isOpen, onClose, title, children, leftButton, rightButton }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 transform transition-all duration-300">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[28px] text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="flex justify-end mt-[12px] gap-[12px]">
          {leftButton && (
            <button
              onClick={leftButton.onClick}
              className={`px-4 py-2 text-${leftButton.color}/75 rounded hover:text-${leftButton.color} transition`}
            >
              {leftButton.label}
            </button>
          )}

          {rightButton && (
            <button
              onClick={rightButton.onClick}
              className={`px-4 py-2 text-${rightButton.color}/75 rounded hover:text-${rightButton.color} transition ml-2`}
            >
              {rightButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
