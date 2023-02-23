import './App.css'
import {  Route, Routes } from 'react-router-dom'
import routes from './pages/index'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect, useInactiveListener } from './web3/useMetaConnect'
import React from 'react'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 5000
  return library
}
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Routes>
        {routes.map((data, index) => (
          <Route
            onUpdate={() => window.scrollTo(0, 0)}
            exact={true}
            path={data.path}
            element={data.component}
            key={index}
          />
        ))}
      </Routes>
    </Web3ReactProvider>
  )
}

export default App
