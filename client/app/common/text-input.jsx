import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value || ''
    };
  }
  componentDidMount() {
    this.edit.focus();
    this.edit.select();
  }
  handleSubmit = (event) => {
    if (event.which === 13) {
      const value = event.target.value.trim();
      this.props.onSave(value);
      if (this.props.create) {
        this.setState({ value: '' });
      }
    }
  }
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
  }
  handleBlur = (event) => {
    const value = event.target.value.trim();
    if (!this.props.create) {
      this.props.onSave(value);
    }
  }
  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        ref={(edit) => { this.edit = edit; }}
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyUp={this.handleSubmit}
      />
    );
  }
}

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  create: false
};

TextInput.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  create: PropTypes.bool,
  placeholder: PropTypes.string
};

export default TextInput;
