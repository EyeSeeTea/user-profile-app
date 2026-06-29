import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'
import TwoFactorSmsCodeButton from './TwoFactorSmsCodeButton.jsx'

const enroll2FAViaSMSMutationDefinition = {
    type: 'create',
    resource: '/2fa/enrollSMS2FA ',
    data: {},
}

const TwoFactorSmsEnableInstructions = () => {
    const [enroll2FAViaSMS, enroll2FAViaSMSMutation] = useDataMutation(
        enroll2FAViaSMSMutationDefinition
    )

    return (
        <>
            <ol className={styles.orderedList}>
                <li>
                    <TwoFactorSmsCodeButton
                        onClick={enroll2FAViaSMS}
                        error={enroll2FAViaSMSMutation.error?.message}
                        loading={enroll2FAViaSMSMutation.loading}
                        success={enroll2FAViaSMSMutation.data}
                    />
                </li>
                <li>
                    {i18n.t(
                        'Enter the 6 digit authentication code from the SMS.'
                    )}
                </li>
            </ol>
        </>
    )
}

export default TwoFactorSmsEnableInstructions
