import store from "../js/store";

export default (roles) => {
    const userRoles = store.getters['auth/userDetails'].roles

    let enter = false

    if (!userRoles || !roles) {
        return enter
    }

    if (!Array.isArray(roles)) {
        enter = userRoles.includes(roles)
    } else {
        roles.forEach(role => {
            if (userRoles.includes(role)) {
                enter = true
            }
        })
    }
    return enter
}
