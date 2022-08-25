import { render } from 'preact'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { App } from './app'
import { Dog } from './dog'
import './index.css'

render(<BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}>
            <Route path="dog" element={<Dog />} />
            <Route path="*" element={null} />
        </Route>
    </Routes>
</BrowserRouter>, document.getElementById('app') as HTMLElement)
