<template>
  <div class="viewer-container">
    <div class="viewer-toolbar">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <h5 class="mb-0">Template Preview</h5>
          <div class="btn-group" role="group">
            <button 
              class="btn btn-outline-primary btn-sm"
              @click="refreshPreview"
            >
              <i class="bi bi-arrow-clockwise"></i> Refresh
            </button>
            <button 
              class="btn btn-primary btn-sm"
              @click="exportToPDF"
              :disabled="isExporting"
            >
              <i class="bi bi-file-earmark-pdf"></i>
              {{ isExporting ? 'Exporting...' : 'Export PDF' }}
            </button>
            <button 
              class="btn btn-outline-secondary btn-sm"
              @click="printTemplate"
            >
              <i class="bi bi-printer"></i> Print
            </button>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="zoom-controls">
            <button class="btn btn-sm btn-outline-secondary" @click="zoomOut">
              <i class="bi bi-zoom-out"></i>
            </button>
            <span class="px-2">{{ Math.round(zoom * 100) }}%</span>
            <button class="btn btn-sm btn-outline-secondary" @click="zoomIn">
              <i class="bi bi-zoom-in"></i>
            </button>
          </div>

          <select class="form-select form-select-sm" v-model="previewMode" style="width: auto;">
            <option value="preview">Preview</option>
            <option value="print">Print View</option>
          </select>
        </div>
      </div>
    </div>

    <div class="viewer-canvas">
      <div 
        ref="canvasRef"
        class="canvas"
        :class="[template?.pageSize || 'a4', { 'print-mode': previewMode === 'print' }]"
        :style="{ 
          transform: `scale(${zoom})`,
          transformOrigin: 'top center'
        }"
      >
        <template v-if="template?.elements">
          <div
            v-for="element in template.elements"
            :key="element.id"
            class="viewer-element"
            :style="getElementStyle(element)"
          >
            <div v-if="element.type === 'text' || element.type === 'formatted-text'" 
                 class="text-element"
                 :style="getTextStyle(element)"
                 v-html="element.content">
            </div>
            
            <img v-else-if="element.type === 'image' && element.src"
                 :src="element.src"
                 class="image-element"
                 :style="getImageStyle(element)"
                 @error="handleImageError"
            />
            
            <div v-else-if="element.type === 'image'"
                 class="image-placeholder d-flex align-items-center justify-content-center"
                 :style="getImageStyle(element)">
              <i class="bi bi-image fs-1 text-muted"></i>
            </div>

            <!-- Line Elements -->
            <div v-else-if="element.type === 'line'" class="line-element">
              <div
                class="line-shape"
                :style="{
                  width: '100%',
                  height: `${element.strokeWidth || 2}px`,
                  backgroundColor: element.strokeStyle === 'solid' ? (element.strokeColor || '#000000') : 'transparent',
                  border: element.strokeStyle !== 'solid' ? `${element.strokeWidth || 2}px ${element.strokeStyle || 'solid'} ${element.strokeColor || '#000000'}` : 'none',
                  borderTop: element.strokeStyle !== 'solid' ? `${element.strokeWidth || 2}px ${element.strokeStyle || 'solid'} ${element.strokeColor || '#000000'}` : 'none',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }"
              ></div>
            </div>

            <!-- Rectangle Elements -->
            <div v-else-if="element.type === 'rect'" class="rect-element">
              <div
                class="rect-shape"
                :style="{
                  width: '100%',
                  height: '100%',
                  backgroundColor: element.fillColor || '#ffffff',
                  border: `${element.strokeWidth || 1}px ${element.strokeStyle || 'solid'} ${element.strokeColor || '#000000'}`
                }"
              ></div>
            </div>

            <!-- Circle Elements -->
            <div v-else-if="element.type === 'circle'" class="circle-element">
              <div
                class="circle-shape"
                :style="{
                  width: '100%',
                  height: '100%',
                  backgroundColor: element.fillColor || '#ffffff',
                  border: `${element.strokeWidth || 1}px ${element.strokeStyle || 'solid'} ${element.strokeColor || '#000000'}`,
                  borderRadius: '50%'
                }"
              ></div>
            </div>

            <!-- Table Elements -->
            <div v-else-if="element.type === 'table'" class="table-element">
              <table class="table-shape" :style="getTableStyle(element)">
                <tr v-for="(row, rowIndex) in element.data" :key="rowIndex">
                  <td 
                    v-for="(cell, colIndex) in row" 
                    :key="colIndex"
                    :style="getCellStyle(element)"
                  >
                    {{ cell }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </template>

        <div v-else class="d-flex align-items-center justify-content-center h-100">
          <div class="text-center text-muted">
            <i class="bi bi-file-earmark display-1"></i>
            <p class="mt-3">No template loaded</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isExporting" class="loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Exporting...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'PtdViewer',
  props: {
    template: {
      type: Object,
      default: () => null
    }
  },
  setup(props) {
    const canvasRef = ref(null)
    const zoom = ref(1)
    const previewMode = ref('preview')
    const isExporting = ref(false)

    const pageSizes = {
      a4: { width: 595, height: 842, widthPx: 794, heightPx: 1123 },
      letter: { width: 612, height: 792, widthPx: 816, heightPx: 1056 }
    }

    const currentPageSize = computed(() => {
      return pageSizes[props.template?.pageSize || 'a4']
    })

    const getElementStyle = (element) => ({
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`
    })

    const getTextStyle = (element) => ({
      fontSize: `${element.fontSize}px`,
      color: element.color,
      fontFamily: element.fontFamily || 'inherit',
      lineHeight: '1.2',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      padding: '4px',
      wordWrap: 'break-word',
      overflow: 'hidden',
      direction: element.textDirection || 'ltr',
      textAlign: element.textAlign || (element.textDirection === 'rtl' ? 'right' : 'left'),
      fontWeight: element.fontWeight || 'normal',
      fontStyle: element.fontStyle || 'normal',
      textDecoration: element.textDecoration || 'none',
      whiteSpace: 'pre-wrap'
    })

    const getImageStyle = (element) => ({
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    })

    const getTableStyle = (element) => ({
      width: '100%',
      height: '100%',
      borderCollapse: 'collapse',
      fontSize: `${element.fontSize || 12}px`,
      fontFamily: element.fontFamily || 'inherit',
      direction: element.textDirection || 'ltr'
    })

    const getCellStyle = (element) => ({
      border: `${element.borderWidth || 1}px ${element.borderStyle || 'solid'} ${element.borderColor || '#000000'}`,
      padding: `${element.cellPadding || 5}px`,
      textAlign: element.textDirection === 'rtl' ? 'right' : 'left',
      verticalAlign: 'top',
      direction: element.textDirection || 'ltr'
    })

    const zoomIn = () => {
      zoom.value = Math.min(zoom.value + 0.1, 2)
    }

    const zoomOut = () => {
      zoom.value = Math.max(zoom.value - 0.1, 0.1)
    }

    const refreshPreview = () => {
      nextTick(() => {
        console.log('Preview refreshed')
      })
    }

    const exportToPDF = async () => {
      if (!canvasRef.value || !props.template) return

      isExporting.value = true

      try {
        await nextTick()

        const originalZoom = zoom.value
        zoom.value = 1

        await nextTick()

        // Create a temporary canvas element for perfect PDF export
        const tempDiv = document.createElement('div')
        tempDiv.style.position = 'absolute'
        tempDiv.style.left = '-9999px'
        tempDiv.style.top = '-9999px'
        tempDiv.style.width = currentPageSize.value.widthPx + 'px'
        tempDiv.style.height = currentPageSize.value.heightPx + 'px'
        tempDiv.style.backgroundColor = '#ffffff'
        tempDiv.style.overflow = 'hidden'
        
        // Clone the canvas content
        const canvasClone = canvasRef.value.cloneNode(true)
        canvasClone.style.transform = 'none'
        canvasClone.style.margin = '0'
        canvasClone.style.position = 'relative'
        
        tempDiv.appendChild(canvasClone)
        document.body.appendChild(tempDiv)

        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: currentPageSize.value.widthPx,
          height: currentPageSize.value.heightPx,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0
        })

        // Clean up temporary element
        document.body.removeChild(tempDiv)

        const imgData = canvas.toDataURL('image/png', 1.0)
        
        const pdf = new jsPDF({
          orientation: currentPageSize.value.width > currentPageSize.value.height ? 'landscape' : 'portrait',
          unit: 'pt',
          format: [currentPageSize.value.width, currentPageSize.value.height],
          compress: true
        })

        // Add image with exact positioning (no margins)
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          0, 
          currentPageSize.value.width, 
          currentPageSize.value.height,
          undefined,
          'FAST'
        )

        const fileName = `template_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.pdf`
        pdf.save(fileName)

        zoom.value = originalZoom

      } catch (error) {
        console.error('Error exporting PDF:', error)
        alert('Error exporting PDF. Please try again.')
      } finally {
        isExporting.value = false
      }
    }

    const printTemplate = () => {
      if (!canvasRef.value) return

      const printWindow = window.open('', '_blank')

      // Get all loaded fonts from the parent document
      const fontLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.outerHTML)
        .join('\n')

      // Clone the canvas with deep cloning to preserve all content
      const canvasClone = canvasRef.value.cloneNode(true)

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Print Template</title>
          ${fontLinks}
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&family=Cairo:wght@200;300;400;500;600;700;900&family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
          <style>
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              font-family: Arial, sans-serif;
              width: 100%;
              height: 100%;
            }
            .canvas {
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100% !important;
              height: 100% !important;
              transform: none !important;
              background: white !important;
            }
            .viewer-element {
              position: absolute !important;
              page-break-inside: avoid;
            }
            .text-element {
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              overflow: visible !important;
              display: flex !important;
              align-items: flex-start !important;
            }
            .image-element {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .line-element .line-shape {
              position: absolute !important;
            }
            .rect-element .rect-shape,
            .circle-element .circle-shape {
              width: 100% !important;
              height: 100% !important;
            }
            .table-element table {
              width: 100% !important;
              height: 100% !important;
              border-collapse: collapse !important;
            }
            @page {
              margin: 0;
              size: A4 portrait;
            }
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                overflow: hidden !important;
              }
              .canvas {
                margin: 0 !important;
                transform: none !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                box-shadow: none !important;
                background: white !important;
              }
              .viewer-element {
                position: absolute !important;
                transform: none !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
              }
              .text-element,
              .image-element,
              .line-element,
              .rect-element,
              .circle-element,
              .table-element {
                position: relative !important;
                width: 100% !important;
                height: 100% !important;
                box-sizing: border-box !important;
              }
              .text-element {
                white-space: pre-wrap !important;
                word-wrap: break-word !important;
                overflow: visible !important;
              }
            }
          </style>
        </head>
        <body>
          ${canvasClone.outerHTML}
        </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()

      // Wait longer for fonts to load before printing
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }

    const handleImageError = (event) => {
      console.warn('Image failed to load:', event.target.src)
    }

    return {
      canvasRef,
      zoom,
      previewMode,
      isExporting,
      getElementStyle,
      getTextStyle,
      getImageStyle,
      getTableStyle,
      getCellStyle,
      zoomIn,
      zoomOut,
      refreshPreview,
      exportToPDF,
      printTemplate,
      handleImageError
    }
  }
}
</script>

<style scoped>
.viewer-element {
  pointer-events: none;
}

.text-element {
  white-space: pre-wrap;
}

.image-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
}

.canvas.print-mode {
  box-shadow: none;
  border: 1px solid #dee2e6;
}

@media print {
  .viewer-toolbar {
    display: none !important;
  }
  
  .viewer-canvas {
    padding: 0 !important;
  }
  
  .canvas {
    box-shadow: none !important;
    margin: 0 !important;
    transform: none !important;
  }
}
</style>