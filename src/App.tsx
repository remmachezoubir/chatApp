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
    setOutput(null)
    handleRequest(input)
    setInput('')
  //   if (input) {
  // }else{

  //     setOutput("please enter a text ")
  //   }
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
    <div className='flex justify-center xl:px-40 pt-1 px-4'>
      <div className='w-full  bg-slate-400 text-lg font-semibold lg:h-[32rem] h-[28rem]  overflow-y-scroll rounded-lg shadow-md shadow-violet-800  md:p-4 p-1'>
        {output? output :loading ? <Loading /> : "enter new text ... "  } 
      </div>
      <div className='fixed flex sm:flex-nowrap flex-wrap justify-around md:gap-3 bottom-4  w-full xl:px-40' >
        <textarea value={input} name={"text"} cols={30} onChange={(e) => setInput(e.target.value)} rows={5} className=' shadow-md  shadow-violet-800 p-2 outline-none border-4 focus:border-indigo-700 sm:w-full w-64 bg-slate-300 resize-none rounded-md  '>

        </textarea>
        <button onClick={(e) => handleInput(e)}><FaTelegramPlane size={40} /></button>
      </div>
    </div>
  )
}

export default App
