import { Sidebar } from './components/Sidebar.jsx'
import { Content } from './components/Content.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { TemplatesConnector } from './context/TemplatesContext.jsx'

function App() {
    return <TemplatesConnector>
        <Header />
        <div className = 'flex-1 grid grid-cols-12 bg-white shadow-lg shadow-slate-300 rounded overflow-hidden'>
            <Sidebar />
            <Content />
        </div>
        <Footer />
    </TemplatesConnector>
}

export default App
