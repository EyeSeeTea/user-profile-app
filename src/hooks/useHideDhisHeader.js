import { useEffect } from 'react'

const STYLE_ELEMENT_ID = 'hide-dhis2-header'

/**
 * Hides the DHIS2 header by injecting a style element into the document head.
 * @param {boolean} shouldRestrict
 */
export const useHideDhisHeader = (shouldRestrict) => {
    useEffect(() => {
        if (shouldRestrict) {
            // In DHIS 2.43+ the app runs inside an iframe; inject the style
            // into the parent document when accessible (same-origin), otherwise
            // fall back to the current document.
            let targetDocument = document
            try {
                if (window.parent !== window && window.parent.document) {
                    targetDocument = window.parent.document
                }
            } catch {
                // Cross-origin parent — stay with the current document
            }

            const style = targetDocument.createElement('style')
            style.id = STYLE_ELEMENT_ID
            // header selector is too broad but it's the only header in the page
            style.textContent = `
                header {
                    display: none !important;
                }
            `
            targetDocument.head.appendChild(style)

            return () => {
                const styleEl = targetDocument.getElementById(STYLE_ELEMENT_ID)
                if (styleEl) {
                    styleEl.remove()
                }
            }
        }
    }, [shouldRestrict])
}
