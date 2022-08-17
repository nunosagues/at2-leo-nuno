import Head from 'next/head'

import Create from '../component/create'
import Read from '../component/read'

export default function Home() {

  return (
    <>
      <title>Validade de Produtos</title>
      <Head>
        <main className='container'>
        <div className="d-grid gap-2 col-6 mx-auto img-align-center">
          <img src="/imagem/logo.png" alt="" className='center' />
        </div>
        </main>
        <title>Validade dos Produtos</title>
      </Head>
    
      <main className='container'>
      <div className="row">
        <div className="col-lg">
         <Create></Create>
      </div>
      <div className="col-lg">
      <Read></Read>
      </div>
      </div>
    </main>
        </>
  )
}
