/**
 * User: soalin
 * Date: 2020/10/29
 * Time: 21:03
 * Desc:
 */
import { onUnmounted } from 'vue'

function useDOMCreate (nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
