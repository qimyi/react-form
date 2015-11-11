import React from 'react';
import invariant from 'invariant';
import classNames from 'classnames';

import Text from '../fields/Text';
import Select from './../fields/Select';
import RadioGroup from '../fields/RadioGroup';

export default class Control extends React.Component {

  componentWillMount() {

  }

  render() {
    let {valid, label, help, children: component, message, touched, ...props} = this.props;

    invariant(
      React.Children.count(component) === 1,
      'A control must have a single input.'
    );

    let controlClasses = classNames('control', {
      'control--valid': valid && touched,
      'control--invalid': !valid && touched
    });

    //noinspection Eslint
    let controlInputClasses = classNames('control__input', {
      'control__input--shrink': component && (component.type === RadioGroup || component.type === Select)
    });

    let controlAlertClasses = classNames('control__alert', 'v2-icon', 'v2-icon--smallest', {
      'v2-icon--tick': valid && touched,
      'v2-icon--warning-inverse': !valid && touched,
      'control__alert--outside': component && (component.type === RadioGroup || component.type === Select),
    });

    return <div className={controlClasses}>

      <label className="control__label label">
        {label}
      </label>

      {help ?
        <span className="control__help">{help}</span> :
        null
      }

      <div className={controlInputClasses}>
        {component ?
          React.cloneElement(component, props) :
          null
        }
        {component && touched ?
          <i className={controlAlertClasses}></i> :
          null
        }
      </div>

      {message ?
        <div className="control__message">{message}</div> :
        null
      }

    </div>;
  }

}

Control.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  valid: React.PropTypes.bool,
  message: React.PropTypes.string
};

Control.defaultProps = {
  name: '',
  label: '',
  valid: false,
  message: null
};