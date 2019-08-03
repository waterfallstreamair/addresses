import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import './index.css'

const QUERY_USERS = gql`
  query {
    items { input, output }
  }
`

const App = () => {
  const [items, setItems] = useState(null)
  const [selected, setSelected] = useState(null)
  
  const handleClick = event => {
  	setSelected(items.find(e => e.input === event.target.value))
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Addresses</h1>
        <Query query={QUERY_USERS}>
          {props => {
            console.log(props)
            const { data, loading, error, refetch } = props
            if (loading) {
              return <div>Loading</div>
            }
            if (error) {
              return <div>An unexpected error occurred</div>
            }
            if (data && data.items) {
              setItems(data.items)
            }
            if (!items) {
              return <div>Loading</div>
            }
            return (
              <div>
                  <select onClick={handleClick}>
                    {items.map(e => 
                      <option value={e.input} key={e.input}>{e.input}</option>
                    )}
                  </select>
                  <h2>{selected && selected.output}</h2>
              </div>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

export default App
