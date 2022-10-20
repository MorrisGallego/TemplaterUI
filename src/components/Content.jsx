import {useContext} from 'react'

import { Preview } from './Preview.jsx'
import { Form } from './Form.jsx'
import {TemplatesContext} from '../context/TemplatesContext.jsx'

function Content() {
    const { template: { name } } = useContext(TemplatesContext)
    
    if(!!name)
        return <main className='col-span-10 flex'>
            <Form />
            <Preview />
        </main>
    else return <span className='col-span-10 flex justify-center items-center text-6xl text-slate-200'>Choose a template to start</span>
}

export {Content}