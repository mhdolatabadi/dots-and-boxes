import PropTypes from 'prop-types'

import MuiButton from '@material-ui/core/Button'
import useStyle from './button.style'
import { uiColorsTypes } from '../../setup/theme/palette'

export default function Button({
  children,
  className,
  backgroundColor,
  ...props
}) {
  const classes = useStyle({ backgroundColor })

  return (
    <div className={className}>
      <MuiButton
        disableElevation
        variant="contained"
        className={classes.button}
        {...props}
      >
        {children}
      </MuiButton>
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  backgroundColor: PropTypes.oneOf(uiColorsTypes),
}
Button.defaultProps = {
  children: null,
  className: null,
  backgroundColor: 'secondaryBlue',
}
