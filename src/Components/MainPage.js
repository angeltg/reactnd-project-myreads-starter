import React, { Component } from "react";
import { Link } from "react-router-dom";

import Shelf from "./Shelf";

class MainPage extends Component {
  render() {
    const { shelves, handleChangeBookToShelf, filterBooksByShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => {
              return (
                <Shelf
                  key={shelf.code}
                  shelfTitle={shelf.title}
                  shelfCode={shelf.code}
                  books={filterBooksByShelf(shelf.code)}
                  handleChangeBookToShelf={handleChangeBookToShelf}
                />
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
