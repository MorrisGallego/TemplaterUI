import {useContext} from 'react'

import {TemplatesContext} from '../context/TemplatesContext.jsx'

function Preview() {
    const {template: {preview}} = useContext(TemplatesContext)

    return <figure className = 'flex flex-col flex-1'>
        <figcaption className = 'bg-slate-900 px-4 py-2 font-semibold text-sm text-slate-100'>
            Template preview
        </figcaption>
        <picture className ='p-4 bg-slate-400 shadow-inner shadow-slate-600'>
            <img alt = 'Template preview' className = 'w-full' src = {preview}/>
        </picture>
    </figure>
}

export { Preview }