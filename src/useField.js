import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type, // why return type when its already an input? seems bad.
    value,
    onChange
  }
}

// modules can have several named exports
//export const useAnotherHook = () => {}