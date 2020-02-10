import Index from '../Views/index'
import Show from '../Views/Show'
import New from '../Views/New'

export default [
  {path: '/ads', exact: true, component: Index},
  {path: '/ads/new', exact: true, component: New},
  {path: '/ads/:id', exact: true, component: Show}
]