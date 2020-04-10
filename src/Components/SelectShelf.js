import React, { Component } from "react";

class SelectShelf extends Component {
  render() {
    const { bookShelf, handleChangeShelf } = this.props;

    return (
      <select
        value={bookShelf ? bookShelf : "none"}
        onChange={handleChangeShelf}
      >
        <option value="move" disabled key="move">
          Move to...
        </option>
        <option key="currentlyReading" value="currentlyReading">
          Currently Reading
        </option>
        <option key="wantToRead" value="wantToRead">
          Want to Read
        </option>
        <option key="read" value="read">
          Read
        </option>
        <option key="none" value="none">
          None
        </option>
      </select>
    );
  }
}

export default SelectShelf;
