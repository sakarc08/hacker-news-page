import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({errors: alerts}) => {
    return (
         <div>
            { alerts && alerts.length > 0 && alerts.map((alert, index) => (
                <div key={index} className='alert alert-danger'>
                    { alert.message }
                </div>
            ))}
        </div>
    )
}

Alert.propTypes = {

}

export default Alert
