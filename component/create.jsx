import Head from 'next/head'
import { useState,useEffect} from 'react'

//importar a config do firebase
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs } from 'firebase/firestore';

//configurar o Firebase do projeto
const contato = collection(database,'contato')

export default function Create() {

  const [produto, setProduto] = useState('')
  const [validade, setValidade] = useState('')

  const cadastrar = ()=>{
    addDoc(contato,
      { produto:produto,
        validade:validade,
      }
      ).then(()=>{
        setProduto('')
        setValidade('')
        window.location.reload()
      })
  }

  return (
    <>
      
      <h3 className='text-center'>CADASTRO</h3>
        <input type="text" name="produto" placeholder='Produto' className='form-control' id="" required onChange={event=>setProduto(event.target.value)} value={produto} />

        <input type="date" name="validade" placeholder='Validade' className='form-control' id="" required onChange={event=>setValidade(event.target.value)} value={validade} />

        <input type="submit" value="SALVAR" onClick={cadastrar} className='form-control btn btn-outline-dark' />

    </>
  )
}
