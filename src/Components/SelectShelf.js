import React, { Component } from "react";

class SelectShelf extends Component {
  render() {
    const { bookShelf, handleChangeShelf } = this.props;

    return (
      <select value={bookShelf} onChange={handleChangeShelf}>
        <option value="move" disabled key="move">
          Move to...
        </option>
        <option key="currentlyReading1" value="currentlyReading">
          Currently Reading
        </option>
        <option key="wantToRead1" value="wantToRead">
          Want to Read
        </option>
        <option key="read1" value="read">
          Read
        </option>
        <option key="none1" value="none">
          None
        </option>
      </select>
    );
  }
}

export default SelectShelf;
