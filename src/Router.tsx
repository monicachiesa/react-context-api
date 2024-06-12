import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History/index.tsx'
import { Default } from './layouts/Default/index'
import { Home } from './pages/Home/index.tsx'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}
