import {createContext, useEffect, useState} from 'react'

const TemplatesContext = createContext({})

const BASE_PATH = 'http://localhost:8080'

function TemplatesConnector({children}) {
    const [templates, setTemplates] = useState([])
    const [template, setTemplate] = useState({})

    useEffect(() => {
         loadTemplates()
    }, [])

    const loadTemplates = async () => {
        const response = await fetch(`${BASE_PATH}/templates`)
        const json = await response.json()

        setTemplates(json)
    }
    const selectTemplate = async templateName => {
        const [data, preview] = await Promise.all([
            fetch(`${BASE_PATH}/templates/${templateName}`),
            fetch(`${BASE_PATH}/templates/${templateName}/preview`)
        ])

        setTemplate({
            ...await data.json(),
            name: templateName,
            preview: URL.createObjectURL(await preview.blob()).toString()
        })
    }
    const deleteTemplate = async templateName => {
        await fetch(`${BASE_PATH}/templates/${templateName}`, { method: 'DELETE' })

        await loadTemplates()
    }
    const uploadTemplate = async file => {
        const data = new FormData()
        data.append('file', file)
        await fetch(`${BASE_PATH}/templates`, { method: 'POST', body: data})
        await loadTemplates()
    }
    const generate = async (data, fileNameTemplate = '') => {
        const response = await fetch(`${BASE_PATH}/generator/${template.name}?fileNamePattern=${encodeURIComponent(fileNameTemplate)}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        const blob = await response.blob()
        const headers = response.headers

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', headers.get('content-disposition').replace('attachment; filename=', '').trim())
        link.setAttribute('target', '_blank')
        link.click()

        URL.revokeObjectURL(link.href)
    }

    const value = {
        template,
        templates,
        selectTemplate,
        deleteTemplate,
        uploadTemplate,
        generate
    }

    return <TemplatesContext.Provider value = { value }>
        {children}
    </TemplatesContext.Provider>
}

export { TemplatesContext, TemplatesConnector }