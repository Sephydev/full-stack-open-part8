import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const BirthYearForm = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Person not found");
    }
  }, [result.data, setError]);

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option value={author.name} key={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
