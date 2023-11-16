import React from 'react'
import { AppContext } from './context/contextApi'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Feed from './components/Feed'
import SearchResult from './components/SearchResult'
import VideoDetails from './components/VideoDetails'
import Channel from './components/Channel'

const App = () => {
  return (
    <AppContext >
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Feed/>}/>
        <Route path="/searchResult/:searchQuery" element={<SearchResult/>}/>
        <Route path='/channel/details/:id' element={<Channel/>}/>
        <Route path="/video/:id" element={<VideoDetails/>}/>
      </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default App