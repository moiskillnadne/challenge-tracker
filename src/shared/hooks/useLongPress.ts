import { useRef, useState } from 'react'

export const useLongPress = () => {
  const [action, setAction] = useState<string | undefined>()

  const timerRef = useRef<number | undefined>()
  const isLongPress = useRef<boolean | undefined>()

  function startPressTimer() {
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      setAction('longpress')
    }, 500)
  }

  function handleOnClick() {
    console.log('handleOnClick')
    if (isLongPress.current) {
      console.log('Is long press - not continuing.')
      return
    }
    setAction('click')
  }

  function handleOnMouseDown() {
    console.log('handleOnMouseDown')
    startPressTimer()
  }

  function handleOnMouseUp() {
    console.log('handleOnMouseUp')
    clearTimeout(timerRef.current)
  }

  function handleOnTouchStart() {
    console.log('handleOnTouchStart')
    startPressTimer()
  }

  function handleOnTouchEnd() {
    if (action === 'longpress') return
    console.log('handleOnTouchEnd')
    clearTimeout(timerRef.current)
  }

  return {
    action,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  }
}
