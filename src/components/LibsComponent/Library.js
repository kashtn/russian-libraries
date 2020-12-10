import {useParams} from 'react-router-dom'

export default function Library(props){

  const {order} = useParams()
  console.log(order);

  return(<> 
    <h3>{order}</h3>
  </>)
}
