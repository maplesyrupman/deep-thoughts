import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import NoMatch from './pages/NoMatch'
import SingleThought from './pages/SingleThought'
import Profile from './pages/Profile'
import Cookies from 'js-cookie';


const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({})
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          {/* <Header /> */}
          <div className='container'>
            <Routes>
              <Route path='/' element={<Header />} >
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile'>
                  <Route path=':username' element={<Profile />} />
                  <Route path='' element={<Profile />} />
                </Route>
                <Route path='/thought/:thoughtId' element={<SingleThought />} />

                <Route element={<NoMatch />} />
              </Route>
            </Routes>
            <Outlet />
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
