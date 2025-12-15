const storage = {
    get (key, defaultValue = null) {
        const raw = sessionStorage.getItem(key)

        if (raw === null) return defaultValue

        try {
            return JSON.parse(raw)
        } catch {
            return defaultValue
        }
    },
    set (key, value, stringify = false) {
        if (stringify) {
            sessionStorage.setItem(key, JSON.stringify(value))
        } else {
            sessionStorage.setItem(key, value)
        }
    },
    delete (key) {
        sessionStorage.removeItem(key)
    }
}

export default storage
