import PtdDesigner from './components/PtdDesigner.vue'
import PtdViewer from './components/PtdViewer.vue'
import DraggableElement from './components/DraggableElement.vue'
import DataSourcePanel from './components/DataSourcePanel.vue'
import SketchRuler from './components/SketchRuler.vue'
import RoyBarCode from './components/PageComponents/RoyBarCode.vue'
import RoyQRCode from './components/PageComponents/RoyQRCode.vue'

// Import main styles
import './style.css'

// Export components
export {
  PtdDesigner,
  PtdViewer,
  DraggableElement,
  DataSourcePanel,
  SketchRuler,
  RoyBarCode,
  RoyQRCode
}

// Export composables
export { useDataSource } from './composables/useDataSource.js'
export { useTemplateManager } from './composables/useTemplateManager.js'

// Export utils
export { generateHTMLContent, downloadHTML } from './utils/htmlExporter.js'

// Default export for convenience
export default {
  PtdDesigner,
  PtdViewer,
  DraggableElement,
  DataSourcePanel,
  SketchRuler,
  RoyBarCode,
  RoyQRCode
}