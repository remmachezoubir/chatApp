import { useState, useEffect } from 'react'
import "./index.css"
import axios from "axios"
import Loading from './Loading'
import { FaTelegramPlane } from "react-icons/fa"
function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string |null>("")
  const [loading, setLoading] = useState(false)
  const handleInput = (e: React.MouseEvent) => {
    e.preventDefault()
    if (input) {
    setOutput(null)
    handleRequest(input)
    setInput('')
  }else{

      setOutput("please enter a text ")
    }
  }

  const handleRequest= async (input:any)=>{
    setLoading(true)    
    try {
  
      const response =await axios.post('https://chat-app-qzpa.onrender.com' , {input})
      const bot = await response.data.bot
      setOutput(`${bot}`)
      console.log(bot);
      
    setLoading(false)   
      
    } catch (error) {
      console.log(error);
      setOutput(`Error try again later `)
      
    }
    
    
    
  }

  return (
    <div className=' bg-black w-screen text-white  h-screen p-2 overflow-hidden flex flex-col'>
      <h1 className='text-white self-center  shadow-indigo-500 text-xl font-bold border-b-4 rounded-md'>BASSEM</h1>
      <div className=' h-full px-4 p-1 mt-4 overflow-scroll border-2 rounded-lg text-lg font-semibold  bg-black'>
        {output? output :loading ? <Loading /> : "enter new text ... "  } 
      </div>
      <div className=' h-48 p-2 rounded-lg flex gap-2 ' >
        <textarea   value={input} name={"text"} cols={30} onChange={(e) => setInput(e.target.value)} rows={5} className=' font-semibold focus:border-indigo-600 focus:border-2 text-black rounded-xl p-2 text-lg w-72'>

        </textarea>
        <button onClick={(e) => handleInput(e)}><FaTelegramPlane className=' fill-white' size={40} /></button>
      </div>
    </div>
  )
}

export default App
