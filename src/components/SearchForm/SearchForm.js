import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query) {
      alert('Please input text for serch.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        required
        value={query}
        onChange={handleSearchQueryChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
