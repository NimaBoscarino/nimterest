import { useEffect } from 'react'

const useDebounce = (cb, value, delay) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            cb(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value])
}

export default useDebounce