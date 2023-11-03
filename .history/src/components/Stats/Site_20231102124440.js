import React, { useState, useCallback, useEffect } from 'react';

import Table from './Table';
import initialData from '../../data/stats/site';

const Stats = () => {
  const [data, setResponseData] = useState(initialData);

  const fetchData = useCallback(async () => {
    // Replace the repository URL with the user's URL
    const res = await fetch('https://api.github.com/users/khoubraneX'); // Replace 'USERNAME' with the GitHub username you want to fetch data for
    const resData = await res.json();
    setResponseData(
      initialData.map((field) => ({
        ...field,
        // update value if value was returned by the call to GitHub
        value: Object.keys(resData).includes(field.key)
          ? resData[field.key]
          : field.value,
      })),
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h3>Some stats about the GitHub user</h3>
      <Table data={data} />
    </div>
  );
};

export default Stats;
