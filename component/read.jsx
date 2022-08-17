import { useState,useEffect} from 'react'
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
const contato = collection(database,'contato')
export default function Read() {
  const [contatoLista,setContatoLista] = useState([])
  const read = ()=>{
  getDocs(query(contato,orderBy("produto")))
    .then((data)=>{
      setContatoLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }
  useEffect(()=>{
    read()
  },[])
  // Função do botão excluir
  const deleteBtn = (id)=>{
    const documento = doc(database,"contato",id)
    deleteDoc(documento)
    .then(()=>{
    read()
    })
  }
// Rotina de Update início
// Mostrar o contato selecionado
const [ID, setID]=useState(null)
const [contatoUnico,setContatoUnico]=useState({})
const [mostrar,setMostrar] = useState(false)
const [produto,setProduto] = useState("")
const [validade,setValidade] = useState("")

const show = async(id)=>{
  setID(id)
  if(ID!=null){
    const contatoSimples = doc(database,"contato",ID)
    const resultado = await getDoc(contatoSimples)
    setContatoUnico({...resultado.data(),id:resultado.id})
    setProduto(contatoUnico.produto)
    setValidade(contatoUnico.validade)
    //setMostrar(true)
  }
  
}
useEffect(()=>{
  show()
},[ID])
const bt_cancelar = ()=>{
  setMostrar(false)
  setProduto("")
  setValidade("")
  setID(null)
}
const bt_alterar = (id)=>{
  const contatoShow = doc(database,"contato",id)
  updateDoc(contatoShow,{
    produto: produto, validade: validade
  }).then(()=>{
    setProduto("")
    setValidade("")
    setID(null)
    read()
    setMostrar(false)
  })
}
/*const bt_ordenarProduto = (id)=>{
  const contatoShow = doc(database,"contato",id)
  getDocs(query(contato,orderBy("produto")))
  updateDoc(contatoShow,{
    produto: produto, validade: validade
  })
}
const bt_ordenarValidade = (id)=>{
  const contatoShow = doc(database,"contato",id)
  getDocs(query(contato,orderBy("validade")))
  updateDoc(contatoShow,{
    produto: produto, validade: validade
  })
}*/

const bt_filtro = (id)=>{
  const contatoShow = doc(database,"contato",id)
  getDocs(query(contato,orderBy("produto", "validade")))
  updateDoc(contatoShow,{
    produto: produto, validade: validade
  })
}

// Rotina de Update fim
  return (
    <>
    {mostrar ?(
      <div>
        <h3 className="text-center">ALTERAR</h3>
        <input type="text" name="produto" placeholder='Produto' className='form-control' id="" required onChange={event=>setProduto(event.target.value)} value={produto} />
        <input type="date" name="validade" placeholder='Validade' className='form-control' id="" required onChange={event=>setValidade(event.target.value)} value={validade} />
       
        <input type="button" value="CANCELAR" className="form-control btn btn-outline-danger" onClick={bt_cancelar} />
        <input type="submit" value="SALVAR" className='form-control btn btn-outline-dark' onClick={()=>bt_alterar(contatoUnico.id)} />
      </div>
    ):(
      <></>
    )}


        <h3 className='text-center'>PRODUTOS</h3>
        {contatoLista.map((lista)=>{
          return(
            <><div className='card'>
              <div className="card-header bg-dark text-light">{lista.produto}</div>
              <div className='card-body'>
              <p className='card-subtitle'>Validade: {lista.validade}</p>
              </div>

              <div className='card-footer text-center'>
              <div className="input-group">
              <input type="button" className='btn-outline-warning form-control' value="Alterar" onClick={()=>show(lista.id)} />
              <input type="button" className='btn-outline-danger form-control' value="Descartar" onClick={()=>deleteBtn(lista.id)} />
              <input type="button" className='btn-outline-success form-control' value="Consumido" onClick={()=>deleteBtn(lista.id)} />
              <input type="button" className='btn-outline-danger form-control' value="Excluir" onClick={()=>deleteBtn(lista.id)} />
              </div>
              </div>
            </div>
            </>
          )
        })}

    </>
  )
}