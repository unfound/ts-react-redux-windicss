import { useState } from 'react'

export default function Test (): JSX.Element {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>{ count }</div>
            <button type="button" onClick={() => setCount(count + 1)}>click</button>
        </>
    )
}
