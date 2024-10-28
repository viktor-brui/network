import store from "../store";
import can from "../../helpers/can";

export default function checkRoles({next, to, from}) {
    const requireRole = to.meta.roles

    if (!from.name) {
        store.dispatch('auth/currentUser').then(() => {
            const enter = can(requireRole)

            if (enter) {
                return next('/')
            }
            return next()
        })
    }
    else {
        const enter = can(requireRole)

        if (enter) {
            return next()
        }
        return next('/')
    }
}
