import Store from 'd2-ui/lib/store/Store.js'

class RestrictedModeStore extends Store {
    constructor() {
        super()
        this.state = false
    }

    setRestrictedMode(value) {
        this.setState(value === true)
    }

    isRestricted() {
        return this.state === true
    }

    clearRestrictedMode() {
        this.setRestrictedMode(false)
    }
}

const restrictedModeStore = new RestrictedModeStore()

export default restrictedModeStore
