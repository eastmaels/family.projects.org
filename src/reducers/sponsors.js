import * as Actions from '../actions/constants';
import * as R from 'ramda';

const sponsors = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_CONTRIBUTIONS_SUCCESS: {
      const contributions = state;
      const newContributions = action.response.results;
      return [
        ...contributions,
        ...newContributions.filter(contribution => !R.find(R.propEq('id', contribution.id))(contributions)),
      ];
    }
    case Actions.VERIFY_CONTRIBUTION_SUCCESS:
    case Actions.UPDATE_CONTRIBUTION_SUCCESS:
    case Actions.GET_CONTRIBUTION_SUCCESS: {
      const contribution = action.response;
      const contributions = state;

      if (!R.find(R.propEq('id', contribution.id))(contributions)) {
        return [
          ...contributions,
          contribution
        ];
      }

      return contributions.map(stateContribution => {
        if (stateContribution.id === contribution.id) {
          return contribution;
        }
        return stateContribution;
      })
    }
    case Actions.CREATE_CONTRIBUTION_SUCCESS: {
      const contribution = action.response;
      const contributions = state;

      return [
        ...contributions,
        contribution
      ];
    }
    case Actions.SET_CONTRIBUTIONS: {
      const contributions = action.payload;
      return contributions;
    }
    default: {
      return state;
    }
  }
};

export default sponsors;
