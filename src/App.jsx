import { useEffect, useState } from "react"
import './styles/style.scss'
import { FaDice, FaSearch } from 'react-icons/fa'

export default function App() {

  const [search, setSearch] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  const buscaPalavra = async () => {
    
    const req = await fetch(`https://api.adviceslip.com/advice/search/${search}`)
    const dados = await req.json()
    if(dados.slips){
      setError(false)
      setData(dados.slips[Math.floor(Math.random() * dados.slips.length)])
    }else{
      setError(true)
    }
  }

  const buscaId = async () => {
    let numberRandom = Math.floor(Math.random() * 224)
    const req = await fetch(`https://api.adviceslip.com/advice/${numberRandom}`)
    const dados = await req.json()
    
    setData(dados.slip)
  }

  return (
    <div>
      <div className={'container'}>
        <div className={'card'}>
          <div className={'container-card'}>
            <div className={'header'}>
              <div className={'dice'} onClick={buscaId}>
                <FaDice color={"#FFF"}/>
              </div>
              <div className={'search'}>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search by keyword"/>
                <button onClick={buscaPalavra}><FaSearch color={"#FFF"}/></button>
              </div>
            </div>
            <div className={data.advice ? 'advice' : 'hidden'}>
              <p>{error ? "Oops, looks like we don't have advice with that keyword..." : data.advice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

