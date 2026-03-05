import { useState, useEffect, useCallback } from 'react'
import restrictedModeStore from '../restrictedMode.store.js'

export const useTwoFactorRestrictedMode = () => {
    const [isRestrictedState, setIsRestrictedState] = useState(
        restrictedModeStore.isRestricted()
    )

    useEffect(() => {
        const subscription = restrictedModeStore.subscribe((restricted) => {
            setIsRestrictedState(restricted)
        })
        return () => subscription.unsubscribe()
    }, [])

    const clearRestrictedMode = useCallback(() => {
        restrictedModeStore.clearRestrictedMode()
    }, [])

    const filterRestrictedSections = useCallback(
        (sections) => {
            if (!isRestrictedState) {
                return sections
            }
            const allowedSectionsInRestricted = ['profile', 'twoFactor']
            return sections.filter((section) =>
                allowedSectionsInRestricted.includes(section.key)
            )
        },
        [isRestrictedState]
    )

    return {
        isRestricted: isRestrictedState,
        clearRestrictedMode,
        filterRestrictedSections,
    }
}
