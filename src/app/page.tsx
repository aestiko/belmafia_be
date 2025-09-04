'use client'

import type { OperationVariables } from '@apollo/client'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import client from '../lib/apolloClient'

interface Tournament {
	id: string
	name: string
}

interface GetTournamentsData {
	tournaments: Tournament[]
}

// Запрос
const GET_TOURNAMENTS = gql`
	query GetTournaments {
		tournaments {
			id
			name
		}
	}
`

export default function Home() {
	// useQuery.Result вместо QueryResult
	const {
		data,
		loading,
		error,
	}: useQuery.Result<GetTournamentsData, OperationVariables> =
		useQuery<GetTournamentsData>(GET_TOURNAMENTS, { client })

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return (
		<div>
			<h1>Турниры</h1>
			<ul>
				{(data?.tournaments ?? []).map(tournament => (
					<li key={(tournament as Tournament).id}>
						{(tournament as Tournament).name}
					</li>
				))}
			</ul>
		</div>
	)
}
