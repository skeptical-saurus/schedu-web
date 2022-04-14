export function getCookieValue(cookies:String, key:String) {
    cookies = `; ${cookies}`
    let parts = cookies.split(`; ${key}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
}