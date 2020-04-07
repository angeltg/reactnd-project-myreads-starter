import React, { Component } from "react";
import ListBooks from "./ListBooks";

class Shelf extends Component {
  listBooks = () => {};

  render() {
    const { shelfTitle, books, handleChangeBookToShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <ListBooks
          books={books}
          handleChangeBookToShelf={handleChangeBookToShelf}
        />
      </div>
    );
  }
}

export default Shelf;
