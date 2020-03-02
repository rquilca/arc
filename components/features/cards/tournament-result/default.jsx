import React from 'react'
// import PropTypes from 'prop-types'
// import { useContent } from 'fusion:content'

// children
import CardListResult from './_children/card-list-result'
import AddTournamentResult from './_children/add-tournament-result'

const classes = {
  tournamentResult: 'tournament-result flex justify-between',
}

const data = {
  leagueNme: 'Champions',
  listMatchResults1: [
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'Bandera Home Team',
      awayTeamFlag: 'Bandera Away Team',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: 'Played',
    },
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'Bandera Home Team',
      awayTeamFlag: 'Bandera Away Team',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: 'pasado',
    },
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'Bandera Home Team',
      awayTeamFlag: 'Bandera Away Team',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: 'pasado',
    },
  ],
  listMatchResults2: [
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'asd/asd',
      awayTeamFlag: 'asd/asd',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: 'Played',
    },
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'asd/asd',
      awayTeamFlag: 'asd/asd',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: '',
    },
    {
      homeTeamShortName: 'Napoli',
      awayTeamShortName: 'Barcelona',
      homeTeamScore: 1,
      awayTeamScore: 1,
      homeTeamFlag: 'asd/asd',
      awayTeamFlag: 'asd/asd',
      matchTime: '6:00 am',
      matchDate: '11/04',
      matchStatus: '',
    },
  ],
}
const TournamentResult = () => {
  const { leagueNme, listMatchResults1, listMatchResults } = data
  const cardOneParams = {
    firstCard: true,
    leagueNme,
    listMatchResults: listMatchResults1,
  }

  const cardTwoParams = {
    firstCard: false,
    leagueNme,
    listMatchResults,
  }
  return (
    <div className={classes.tournamentResult}>
      <CardListResult {...cardOneParams} />
      <CardListResult {...cardTwoParams} />
      <AddTournamentResult />
    </div>
  )
}

TournamentResult.label = 'Resultado de torneo'
TournamentResult.static = true
export default TournamentResult
