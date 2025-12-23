import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Workouts</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No data available</td>
                  </tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <th scope="row">{idx + 1}</th>
                      <td>{workout.name || workout.workout || 'N/A'}</td>
                      <td>{workout.duration || 'N/A'}</td>
                      <td>{workout.date || workout.created_at || 'N/A'}</td>
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

export default Workouts;
