import React, { useState, useEffect } from 'react';
import './App.css';
import filterImg from './filter.jpg';

export default function App() {
  const [user, setUser] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // State to track sort order
  const [selectedFilter, setSelectedFilter] = useState(''); // State to track selected filter
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to track filter menu open/close

  const userData = async () => {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    const res = await result.json();
    setUser(res);
  }

  useEffect(() => {
    userData();
  }, [])

  // Function to sort user data based on field
  const sortUsers = (field) => {
    const sortedUsers = [...user].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });

    // Toggle sort order if the same field is clicked again
    if (sortOrder === field) {
      setSortOrder('');
      setUser(sortedUsers.reverse());
    } else {
      setSortOrder(field);
      setUser(sortedUsers);
    }

    // Update selected filter
    setSelectedFilter(field);
    setIsFilterOpen(false);
  }

  return (
    <div className='container'>
      <div className='main'>
        <h1>All User</h1>
        <div>
          <img
            src={filterImg}
            alt="filter img"
            className='filter-icon'
            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter menu
          />
        
          {isFilterOpen && (
            <div className="filter-menu">
              <div onClick={() => sortUsers('name')} className='filter-name'>Sort by Name</div>
              <div onClick={() => sortUsers('username')} className='filter-name'>Sort by Username</div>
              <div onClick={() => sortUsers('email')} className='filter-name'>Sort by Email</div>
              <div onClick={() => sortUsers('phone')} className='filter-name'>Sort by Phone</div>
            </div>
          )}
        </div>
      </div>
      
      {selectedFilter && (
        <div className="selected-filter">
         Selected Filter By :  <span className='display-options'>{selectedFilter}</span> 
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {user.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.username}</td>
              <td>{result.email}</td>
              <td>{result.phone}</td>
              <td>{result.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
