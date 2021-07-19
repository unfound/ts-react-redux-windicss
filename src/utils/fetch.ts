/* eslint-disable no-param-reassign */
const baseUrl = 'http://localhost:8080'

interface myError extends Error {
    response?: Response
}

interface myOption {
    /**
     * get请求的传参
     */
    params?: Record<string, string | number | undefined>,
    /**
     * A BodyInit object or null to set request's body.
     */
    body?: Record<string, unknown> | BodyInit | null
     /**
      * A string indicating how the request will interact with the browser's cache to set request's cache.
      */
     cache?: RequestCache
     /**
      * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
      */
     credentials?: RequestCredentials
     /**
      * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
      */
     headers?: HeadersInit
     /**
      * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
      */
     integrity?: string
     /**
      * A boolean to set request's keepalive.
      */
     keepalive?: boolean
     /**
      * A string to set request's method.
      */
     method?: string
     /**
      * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
      */
     mode?: RequestMode
     /**
      * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
      */
     redirect?: RequestRedirect
     /**
      * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
      */
     referrer?: string
     /**
      * A referrer policy to set request's referrerPolicy.
      */
     referrerPolicy?: ReferrerPolicy
     /**
      * An AbortSignal to set request's signal.
      */
     signal?: AbortSignal | null
     /**
      * Can only be null. Used to disassociate request from any Window.
      */
     window?: any
}

function checkStatus (response: Response): Response {
    console.log("判断状态码")
    if (response.status >= 200 && response.status < 500) return response

    const error: myError = new Error(response.statusText)
    error.response = response

    throw error
}

function parseJSON<T> (response: Response): Promise<T> {
    console.log("返回body解析")
    return response.json()
}

function handleDefaultOption (url: string, option: myOption = {}): [string, RequestInit] {
    let fullUrl:string = url
    let myOption: RequestInit = {
        keepalive: true,
        method: 'GET',
    }
    // 可以用Object.assign来规避body不兼容问题
    myOption = Object.assign(myOption, option)
    if (option?.method?.toLowerCase() === 'get' && option.params) {
        const queryArray = Object.keys(option.params).map(key => `${key}=${(option.params as Record<string, unknown>)[key]}`)
        const query = queryArray.join('&')

        if (url.includes('?')) {
            fullUrl += `&${query}`
        }
        fullUrl += `?${query}`
    } else if (option?.method?.toLowerCase() === 'post') {
        const defaultHeader = {
            'Content-Type': 'application/json'
        }
        myOption.headers = {...defaultHeader, ...option.headers}
        if ((myOption.headers as Record<string, string>)['Content-Type'] === 'application/json' && option.body != null) {
            myOption.body = JSON.stringify(option.body)
        }
    }

    return [fullUrl, myOption]
}

export default function fetch<T> (url: string, option?: myOption): Promise<T> {
    const [fullUrl, lastOption] = handleDefaultOption(baseUrl + url, option)

    return window.fetch(fullUrl, lastOption)
        .then(checkStatus)
        .then((response) => parseJSON<T>(response))
        .catch(err => {
            console.log(err)
            throw err
        })
}
