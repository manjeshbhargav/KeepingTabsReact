import React from 'react';
import './index.less';

export default class TabsFilter extends React.Component {
  //
  // Type checking properties.
  //
  static propTypes = {
    onUpdate: React.PropTypes.func.isRequired
  };
  //
  // Store reference to input element.
  //
  refer (input) {
    this.kwdin = input;
  }
  //
  // KeyUp handler.
  //
  keyup () {
    setTimeout((() => {
      // Call the update handler for this component.
      this.props.onUpdate(this.kwdin.value);
    }).bind(this), 50);
  }
  //
  // Render function.
  //
  render () {
    return (
      <input type="text"
        placeholder="Find tabs"
        ref={::this.refer}
        onKeyUp={::this.keyup}
        autofocus
      />
    );
  }
}
