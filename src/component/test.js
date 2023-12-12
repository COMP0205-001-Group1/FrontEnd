import React from "react"
import axios from "axios"

const App = () => {

    const [data, setData] = useState(null)
    const onClick = async()=> {
      try{
        await axios.get('https://jsonplaceholder.typicode.com/todos/1')
          .then(response=>{
            console.log(response.data)
            setData(response)
          })     
      }catch(e){
        console.log(e)
        alert('Error데이터를 불러올 수 없습니다')
      }
    }
  
    return (
      <div className='AppBox'>
        <button onClick={onClick}>불러오기</button>
        {data && <textarea value={JSON.stringify(data)} readOnly={true}/>}
      </div>
    )
  }