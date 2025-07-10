import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch teams for the current user
  useEffect(() => {
    axios.get('http://localhost:5000/api/teams', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setTeams(res.data);
        if (!selectedTeam && res.data.length > 0) setSelectedTeam(res.data[0]);
      });
  }, []);

  return (
    <TeamContext.Provider value={{ teams, selectedTeam, setSelectedTeam }}>
      {children}
    </TeamContext.Provider>
  );
};