import { useState } from 'react'

export function useForceUpdate (): ()=>void {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)

    return increment
}
