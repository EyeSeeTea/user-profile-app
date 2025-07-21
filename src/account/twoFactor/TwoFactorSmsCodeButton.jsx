import i18n from '@dhis2/d2-i18n'
import { Button, IconCheckmark16, IconErrorFilled24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import userProfileStore from '../../profile/profile.store.js'
import styles from './TwoFactorEnableInstructions.module.css'

const TwoFactorSmsCodeButton = ({ onClick, error, loading, success }) => {
    const phoneNumber = userProfileStore.state.phoneNumber
    return (
        <span className={styles.stepWithAction}>
            {i18n.t(
                'Send authentication code to your phone number: {{phoneNumber}}',
                {
                    phoneNumber: phoneNumber,
                    nsSeparator: '-:-',
                }
            )}
            {success ? (
                <>
                    <span className={styles.successMessage}>
                        <IconCheckmark16 color={'#1a5e20'} />{' '}
                        {i18n.t('Authentication code sent')}
                    </span>
                    <span className={styles.sendNewCodeInstructions}>
                        {i18n.t(
                            "If you didn't receive the code, check if you have SMS service enabled."
                        ) + ' '}
                        <span
                            className={styles.sendNewCodeButton}
                            onClick={onClick}
                        >
                            {i18n.t('Send a new code')}
                        </span>
                    </span>
                </>
            ) : (
                <>
                    <span className={styles.buttonWithIcon}>
                        <Button onClick={onClick} secondary loading={loading}>
                            {i18n.t('Send authentication code')}
                        </Button>
                        {error && <IconErrorFilled24 color={'#d3302f'} />}
                    </span>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </>
            )}
        </span>
    )
}

TwoFactorSmsCodeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
}

export default TwoFactorSmsCodeButton
