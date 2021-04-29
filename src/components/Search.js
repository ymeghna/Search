import React, { useEffect, useState } from 'react';
import api from '../api';

const Search = () => {
  const [text, setText] = useState('');
  const [listOfNames, setListOfNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingName, setLoadingName] = useState(false);

  const fetchData = async (value) => {
    setLoading(true);
    api
      .getList(value)
      .then((res) => {
        setListOfNames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchResults = async (value) => {
    setLoadingName(true);
    api
      .getList(value)
      .then((res) => {
        setName(res.data.results[0].name);
        setLoadingName(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingName(false);
      });
  };

  useEffect(() => {
    if (text.length > 1) {
      fetchData(text);
    } else {
      setListOfNames([]);
    }
  }, [text]);

  useEffect(() => {
    if (searchTerm.length) {
      fetchResults(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="search">
      <input
        className="search-box"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="dropdown">
        {loading
          ? 'loading'
          : listOfNames.map((item, index) => {
            return (
              <div key={index} className="dropdown-item" onClick={() => setSearchTerm(item.name)}>
                  {item.name}
                </div>
              );
            })}
      </div>
      {listOfNames.length > 0 && <div className="count">{listOfNames.length} Results Found</div>}
      {loadingName
        ? 'loading name'
        : name && (
            <div className="page">
              <h2>Searched name</h2>
              {name}
            </div>
          )}
    </div>
  );
};

export default Search;
