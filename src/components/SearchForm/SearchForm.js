import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (!searchQuery) {
      alert('Please input text for serch.');
      return;
    }
    onSubmit(searchQuery.toLowerCase());
    setQuery('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        required
        value={query}
        onChange={handleSearchQueryChange}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
