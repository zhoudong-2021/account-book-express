import React from 'react'
import { MyContext } from './MyContext'

const withContext = (Component) => {
  return (props) => (
    <MyContext.Consumer>
      {({ state, actions }) => {
        return <Component {...props} data={state} actions={actions} />
      }}
    </MyContext.Consumer>
  )
}

export default withContext