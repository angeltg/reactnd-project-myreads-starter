import React from "react";
import ListBooks from "./ListBooks";

const Shelf = props => {
  const { shelfTitle, books, handleChangeBookToShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <ListBooks
        books={books}
        handleChangeBookToShelf={handleChangeBookToShelf}
      />
    </div>
  );
};

export default Shelf;
