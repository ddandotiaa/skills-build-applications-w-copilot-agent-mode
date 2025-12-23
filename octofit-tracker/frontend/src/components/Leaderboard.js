import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Leaderboard</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">No data available</td>
                  </tr>
                ) : (
                  leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      <th scope="row">{idx + 1}</th>
                      <td>{leader.name || leader.username || leader.email || 'N/A'}</td>
                      <td>{leader.score || leader.points || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
