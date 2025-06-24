import { useQuery } from "@apollo/client";

import { ME, ALL_BOOKS } from "../queries";

const Recommendation = ({ show }) => {
  const resultUser = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  const user = resultUser.data.me;
  const books = resultBooks.data.allBooks;
  const filteredBooks = books.filter((b) =>
    b.genres.includes(user.favoriteGenre)
  );

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendation;
