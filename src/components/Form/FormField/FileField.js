import React from "react";

class FileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  onChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.file);
      }
    });
  };
  render() {
    const { className = "" } = this.props;
    return (
      <form onSubmit={this.onFormSubmit}>
        <input className={className} type="file" onChange={this.onChange} />
      </form>
    );
  }
}

export default FileField;
