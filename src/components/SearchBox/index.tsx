import { api } from '@/store/culero.api';
import { selectUserSearchResult } from '@/store/status';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface SearchResult {
  _id: number;
  username: string;
  picture: string;
}

export const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [getUserBySearch] = api.useGetUserBySearchMutation();
  // const [results, setResults] = useState<SearchResult[]>([{
  //   id: 1,
  //   name: "asdfas"
  // }]);
  const searchResult = useSelector(selectUserSearchResult);
  const searchHandler = async() => {
    await getUserBySearch({
      search_key: searchTerm
    })
  }
  useEffect(() => {
    searchHandler()
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResult?.length > 0 && (
        <ul>
          {searchResult?.map((result: SearchResult) => (
            <li key={result._id} className='flex justify-between z-50 border-2 border-collapse' onClick={() => { /* handle selection */ }}>
              <img src={result.picture}/>
              {result.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
