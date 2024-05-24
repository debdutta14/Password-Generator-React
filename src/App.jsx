import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAdd,setNumberAdd] = useState(false);
  const [charAdd,setCharAdd] = useState(false);
  const [password,setPassword] = useState("");

  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAdd) str+="0123456789";
    if(charAdd) str+="@#%&~!/^";

    for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random() * str.length +1);
        pass+=str.charAt(char);
    }
    setPassword(pass);

  },[length,numberAdd,charAdd,setPassword]);

  //useRef hook
  const passwordRef=useRef(null,)
  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{passwordGenerator()},
  [length,numberAdd,charAdd,passwordGenerator])
  return (
    <>
      <h1 className='text-white w-full max-w-md mx-auto text-center mt-6'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md my-8  rounded-lg text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password}
          placeholder='password'
          className='outline-none py-1 px-3 w-full my-4 rounded-lg mx-2'
          readOnly
          ref={passwordRef}
          />
          <button 
          className='bg-blue-700 text-white outline-none px-3 py-0.5  shrink-0'
          onClick={copyPasswordToClipBoard}
          >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2 mx-2 pb-2'>
          <div className='flex gap-x-1 item-center '>
              <input 
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className='flex gap-x-1 item-center'>
            <input 
            type="checkbox" 
            defaultChecked={numberAdd}
            id='numberInput'
            onChange={(e)=>{
              setNumberAdd(prev=> !prev);
            }}
            />
            <label>Number</label>
          </div>

          <div className='flex gap-x-1 item-center'>
            <input 
            type="checkbox" 
            defaultChecked={charAdd}
            id='charInput'
            onChange={(e)=>{
              setCharAdd(prev=> !prev);
            }}
            />
            <label>Special Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
