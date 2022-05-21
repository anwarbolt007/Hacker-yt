import { format } from 'date-fns';
import {useState,useEffect} from 'react';


function App(){
  const [items,setItems]=useState([])
  const [query,setQuery]=useState("Sports")
  const [text,setText]=useState("")
  const [largeTitle,setLargeTitle]=useState([])
  const [isLoading,setIsLoading]=useState(true)

useEffect(() => {
  setIsLoading(true)
const fetchArticles = async () => {
  const url = `https://hn.algolia.com/api/v1/search?query=${query}`
  const res = await fetch(url)
  const data =await res.json()
  setItems(data.hits)
  setLargeTitle(data.hits[0])
}
fetchArticles()
setIsLoading(false)
},[query])

const handleSubmit = (e) => {
  e.preventDefault()
  if(!text){
    console.log("Input is empty")
  }else{
    setQuery(text)
    setText("")
    console.log(text)
        console.log(query)
  }
}

  return (
  <>
  <main>
  <section className="section">
    <form onSubmit={handleSubmit}>
      <input type="text"
       name="text" 
       id="text" 
       value={text}
       onChange={(e) => setText(e.target.value)}
       placeholder="serach for something..." />
        <button
        type="submit"
        onClick={handleSubmit}
        >Search</button>
      </form>

      {isLoading ? ( <div className="spinner"></div> ) :
   (<>
   
    <article className="title">
      <h1>{largeTitle.title}</h1>
      <a href={largeTitle.url} target="_blank" rel="noreferrer">Read Full Article</a>
      </article>
      <p className="category">Category : <span>{query}</span></p>
      <article className="cards">
      {items.map(({author,title,created_at,points,objectID}) =>
      (
        <div key={objectID}>
          <h2>{title}</h2>
          <ul>
            <li>By {author}</li>
            <li>{points}</li>
            </ul>
           <p>{format(new Date(created_at),"dd MMMM yyyy")}</p>

          </div>
      ))}
      </article>
      </>
   )}
    </section>
    </main>
  </>
  )
}
export default App


