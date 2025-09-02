'use client';

import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";
import client from '../lib/apolloClient';

const GET_TOURNAMENTS = gql`
  query {
    tournaments {
      id
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_TOURNAMENTS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Турниры</h1>
      <ul>
        {data.tournaments.map((t: any) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}