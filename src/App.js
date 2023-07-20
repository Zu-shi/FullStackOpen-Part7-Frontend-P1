import { useState } from 'react'
import {
  BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './useField'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;`



// What do these all do?

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/anecdotes" style={padding}>anecdotes</Link>
      <Link to="/create_new" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>

  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link><br />
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(an => an.id === Number(id))
  return (
    <div>
      {anecdote.content}
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const navigate = useNavigate()
  const contentType = useField('content')
  const authorType = useField('author')
  const infoType = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(contentType)
    props.addNew({
      content: contentType.value,
      author: authorType.value,
      info: infoType.value,
      votes: 0
    })
    navigate('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <Input />
          <input name='content' type={contentType.type} value={contentType.value} onChange={contentType.onChange} />
        </div>
        <div>
          author
          <Input />
          <input name='author' type={authorType.type} value={authorType.value} onChange={authorType.onChange} />
        </div>
        <div>
          url for more info
          <Input />
          <input name='info' type={infoType.type} value={infoType.value} onChange={infoType.onChange} />
        </div>
        <button onClick={(e) => { e.preventDefault(); infoType.reset(); authorType.reset(); contentType.reset() }}>reset</button>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Added new anecdote ${anecdote.content}`)
    setTimeout(() => { setNotification(``) }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>{notification}</div>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
      </div>

      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />}></Route>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path="/create_new" element={<CreateNew addNew={addNew} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <br />
      <Footer />
    </Router>
  )
}

export default App
