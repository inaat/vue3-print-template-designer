import { Component } from 'vue'

// Component declarations
export declare const PtdDesigner: Component
export declare const PtdViewer: Component
export declare const DraggableElement: Component
export declare const DataSourcePanel: Component
export declare const SketchRuler: Component
export declare const RoyBarCode: Component
export declare const RoyQRCode: Component

// Composables
export declare function useDataSource(): {
  // Define return type based on actual implementation
  [key: string]: any
}

export declare function useTemplateManager(): {
  // Define return type based on actual implementation
  [key: string]: any
}

// Utils
export declare function generateHTMLContent(template: any): string
export declare function downloadHTML(htmlContent: string): boolean

// Default export
declare const _default: {
  PtdDesigner: Component
  PtdViewer: Component
  DraggableElement: Component
  DataSourcePanel: Component
  SketchRuler: Component
  RoyBarCode: Component
  RoyQRCode: Component
}

export default _default