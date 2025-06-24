import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const books = result.data.allBooks;

  const filteredBooks = filter
    ? books.filter((b) => b.genres.includes(filter))
    : books;

  // get an array of unique genre
  const genres = books
    .map((b) => b.genres)
    .flat()
    .filter((value, index, arr) => index === arr.indexOf(value));

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => handleFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => handleFilter(null)}>All books</button>
    </div>
  );
};

export default Books;
