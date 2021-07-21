import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AnyAction, Dispatch, Action } from "redux"

const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'
const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

function selectSubreddit (subreddit: string) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

function invalidateSubreddit (subreddit: string) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts (subreddit: string) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts (subreddit: string, json: Record<string, string | number>[]) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json,
        receivedAt: Date.now()
    }
}

type dispatchType = (action: Record<string, unknown> | ((dispatch: dispatchType) => unknown)) => unknown

function fetchPosts (subreddit: string): ThunkAction<Promise<void>, Record<string, unknown>, void, AnyAction> {
    return (dispatch: ThunkDispatch<Record<string, unknown>, void, AnyAction>): Promise<void> => {
        dispatch(requestPosts(subreddit))
        return fetch(`http://localhost:8080/${subreddit}`)
        .then(response => response.json())
        .then(json => {
            dispatch(receivePosts(subreddit, json))
        })
    }
}

interface PostState {
    isFetching: boolean,
    didInvalidate: boolean,
    items: Array<unknown>,
    lastUpdated?: number
}

interface myObj {
    [key: string]: unknown
}

function shouldFetchPosts (state: Record<string, any>, subreddit: string) {
    const post: PostState = state.postsBySubreddit[subreddit]
    if (!post) {
        return true
    }
    if (post.isFetching) {
        return false
    }
    return post.didInvalidate
}

export function fetchPostsIfNeeded (subreddit: string) {
    return (dispatch: ThunkDispatch<Record<string, unknown>, void, AnyAction>, getState: () => Record<string, any>): void => {
        console.log('fetch', getState())
        if (shouldFetchPosts(getState(), subreddit)) {
            dispatch(fetchPosts(subreddit))
        }
    }
}

function selectedSubreddit (state = 'reactjs', action: Record<string, unknown>) {
    switch (action.type) {
        case SELECT_SUBREDDIT: return action.subreddit
        default: return state
    }
}

function posts (
    state: PostState = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action: Record<string, unknown>
): PostState {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true,
            }
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
                items: (action.posts as Array<unknown>),
                lastUpdated: (action.receivedAt as number)
            }
        default: return state
    }
}

export function postsBySubreddit (state: myObj = {}, action: myObj): myObj {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state,
                [action.subreddit as string]: posts((state[(action.subreddit) as string]) as PostState, action)
            }
        default: return state
    }
}
