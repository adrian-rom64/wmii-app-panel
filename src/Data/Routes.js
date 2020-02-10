import Index from '../Views/index'
import Show from '../Views/Show'
import New from '../Views/New'
import Edit from '../Views/Edit'

export default [
  {path: '/ads', exact: true, component: Index},
  {path: '/ads/new', exact: true, component: New},
  {path: '/ads/:id', exact: true, component: Show},
  {path: '/ads/:id/edit', exact: true, component: Edit}
]