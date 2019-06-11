import React from 'react'
import PropTypes from 'prop-types'

import CardsSurveyChildProgressBar from './progress-bar'

const classes = {
  results: 'c-survey-result',
  list: 'mb-5 pt-5 pb-5',
  itemContainer: 'flex justify-between mb-5',
  item: 'c-survey-result__item primary-font',
}

const CardsSurveyChildResult = ({ choices = [] }) => {
  const totalVotes = choices.reduce(
    (prev, current) => prev + (current.votes || 0),
    0
  )

  const getHighestValue = (array = []) => {
    return array.map(item => item.votes).sort((a, b) => b - a)[0]
  }

  const highestValue = getHighestValue(choices)

  return (
    <ul className={classes.results}>
      {choices.map(result => {
        const isBiggestValue = result.votes === highestValue
        const textHighightClass = isBiggestValue ? 'active' : ''
        return (
          <li key={`survey-${result.option}`} className={classes.list}>
            <div className={classes.itemContainer}>
              <span className={`${classes.item} ${textHighightClass}`}>
                {result.option}
              </span>
              <span
                className={`${
                  classes.item
                } ${textHighightClass}`}>{`${Math.round(
                (result.votes / totalVotes) * 100
              )}%`}</span>
            </div>
            <CardsSurveyChildProgressBar
              percentage={(result.votes / totalVotes) * 100}
              isHighlight={isBiggestValue}
            />
          </li>
        )
      })}
    </ul>
  )
}

CardsSurveyChildResult.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
}

export default CardsSurveyChildResult
