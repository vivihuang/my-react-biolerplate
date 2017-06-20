import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  data: {},
  total: 0
})

export default function activeRequestsReducer(state = initialState, action = null) {
  if (action.meta && (action.meta.API_ACTION || action.meta.PROMISE_START)) {
    const API_ACTION = action.meta.API_ACTION
    const calculate = (calculateState) => {
      const total = calculateState.get('data').reduce((prev, item) => prev + item, 0)
      return calculateState.set('total', total)
    }
    const { API_REQUEST_START, endpoint, method } = API_ACTION
    const key = `${method}-${endpoint}`
    if (action.meta.PROMISE_START) {
      const count = state.getIn(['data', key]) || 1
      return calculate(state.setIn(['data', key], count - 1))
    } else if (API_REQUEST_START) {
      const count = state.getIn(['data', key]) || 0
      return calculate(state.setIn(['data', key], count + 1))
    }
  }
  return state
}
