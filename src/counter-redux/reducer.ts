export function changeCount (count = 0, action: { type?: string }): number {
    switch (action.type) {
        case 'INCREMENT': return count + 1
        case 'DECREMENT': return count - 1
        default: return count
    }
}

interface user {
    author: string,
    id: number,
    title: string
}

export function testInfo (user: user = { author: '', id: 1, title: '' }, action: { type?: string, payload?: user}): user {
    switch (action.type) {
        case 'CHANGE_USER': return {...user, ...action.payload}
        default: return user
    }
}
