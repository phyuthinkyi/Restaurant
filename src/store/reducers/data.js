const initialState = ""
const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DATA':
      return action.data

    case 'REMOVE_DATA':
      return ""

    default:
      return state
  }
}

export default DataReducer

///UI => Actions (define type and carry data) => Reducer (according to action type, Process => return) =>
/// combineReducer (create Root Reducer) => Store => UI


