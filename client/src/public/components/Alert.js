import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({alerts}) => {
    return (
         <div>
            { alerts && alerts.length > 0 && alerts.map((alert, index) => (
                <div key={index} className={ `alert alert-${alert.type}`} >
                    { alert.message }
                </div>
            ))}
        </div>
    )
}

Alert.propTypes = {

}

export default Alert
