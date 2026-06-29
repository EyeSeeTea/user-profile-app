import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'
import TwoFactorSmsCodeButton from './TwoFactorSmsCodeButton.jsx'

const enroll2FAViaSMSMutationDefinition = {
    type: 'create',
    resource: '/2fa/disable ',
    data: {},
}
const TwoFactorSmsDisableInstructions = () => {
    const [turnOff2FAViaSMS, turnOff2FAViaSMSMutation] = useDataMutation(
        enroll2FAViaSMSMutationDefinition
    )

    return (
        <>
            <ol className={styles.orderedList}>
                <li>
                    <TwoFactorSmsCodeButton
                        onClick={turnOff2FAViaSMS}
                        loading={turnOff2FAViaSMSMutation.loading}
                        success={
                            turnOff2FAViaSMSMutation.error &&
                            turnOff2FAViaSMSMutation.error.details
                                ?.httpStatusCode === 409
                        }
                        error={
                            turnOff2FAViaSMSMutation.error?.details
                                ?.httpStatusCode !== 409 &&
                            turnOff2FAViaSMSMutation.error?.message
                        }
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

export default TwoFactorSmsDisableInstructions
