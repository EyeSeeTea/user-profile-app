import { useEffect } from 'react'

const STYLE_ELEMENT_ID = 'hide-dhis2-header'

/**
 * Hides the DHIS2 header by injecting a style element into the document head.
 * @param {boolean} shouldRestrict
 */
export const useHideDhisHeader = (shouldRestrict) => {
    useEffect(() => {
        if (shouldRestrict) {
            const style = document.createElement('style')
            style.id = STYLE_ELEMENT_ID
            // header selector is too broad but it's the only header in the page
            style.textContent = `
                header {
                    display: none !important;
                }
            `
            document.head.appendChild(style)

            return () => {
                const styleEl = document.getElementById(STYLE_ELEMENT_ID)
                if (styleEl) {
                    styleEl.remove()
                }
            }
        }
    }, [shouldRestrict])
}
