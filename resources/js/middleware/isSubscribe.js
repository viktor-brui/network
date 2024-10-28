export default function ({next, store}) {
    if (!store.getters.auth.isSubscribe) {
        return next ('dashboard')
    }
    return next()
}
