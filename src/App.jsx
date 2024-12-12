import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  const [length ,setLength] =useState(8);
  const [numberAllowed ,setNumberAllowed] =useState(false);
  const [charAllowed, setCharAllowed] =useState(false);
  const [password ,setPassword]=useState("");
  const passRef =useRef(null);

  const copyPssword=()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]"

    for(let i=1;i<=length;i++)
    {
      let index =Math.floor(Math.random() * str.length+1)
      pass += str.charAt(index)
    }

    setPassword(pass)
  } ,[length,numberAllowed,charAllowed,setPassword])



  useEffect(()=>{
    passwordGenerator();
    
  } ,[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full rounded-lg max-w-md mx-auto shadow-md p-4 m-4 text-orange-600 bg-gray-700'>
        text
        <div className='flex shadow rounded-lg overflow-hidden mb-4 p-5 bg-slate-600'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 rounded-lg'
          placeholder='password'
          readOnly
          ref={passRef}
          ></input>
          <button
          onClick={copyPssword}
          className='text-orange-500 p-2 bg-gray-800 rounded-md'> COPY</button>
         
        </div>
        <div className='flex text-sm gap-x-2 items-center '>
            <div className='flex items-center gap-x-1'>
              <input
              type='range'
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              ></input>
              <label className='text-white font-bold'> {length}</label>
            </div>


            <div className='flex items-center gap-x-1 pl-1'>
              <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={
                ()=>{
                  setNumberAllowed((prev)=>!prev)
                }
              }
              >
              </input>
              <label className='text-white font-bold '>Number</label>
            </div>

            <div className='flex items-center gap-x-1 pl-1'>
              <input
              type='checkbox'
              defaultChecked={charAllowed}
              id="charInput"
              onChange={
                ()=>{
                  setCharAllowed((prev)=>!prev)
                }
              }
              >
              </input>
              <label className='text-white font-bold '>Character</label>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App
