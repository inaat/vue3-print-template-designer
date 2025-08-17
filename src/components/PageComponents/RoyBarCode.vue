<template>
  <div
    class="roy-barcode"
    :style="elementStyle"
    @mousedown="startDrag"
    @click.stop="$emit('select', element)"
  >
    <div class="barcode-container">
      <canvas ref="barcodeCanvas" class="barcode-canvas"></canvas>
      <div v-if="element.showText" class="barcode-text">
        {{ element.value }}
      </div>
    </div>

    <template v-if="selected">
      <div
        class="resize-handle nw"
        @mousedown.stop="startResize('nw')"
      ></div>
      <div
        class="resize-handle ne"
        @mousedown.stop="startResize('ne')"
      ></div>
      <div
        class="resize-handle sw"
        @mousedown.stop="startResize('sw')"
      ></div>
      <div
        class="resize-handle se"
        @mousedown.stop="startResize('se')"
      ></div>
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import JsBarcode from 'jsbarcode'

export default {
  name: 'RoyBarCode',
  props: {
    element: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'update', 'delete'],
  setup(props, { emit }) {
    const barcodeCanvas = ref(null)

    const elementStyle = computed(() => ({
      position: 'absolute',
      left: `${props.element.x}px`,
      top: `${props.element.y}px`,
      width: `${props.element.width}px`,
      height: `${props.element.height}px`,
      border: props.selected ? '2px solid #007bff' : '2px dashed transparent',
      zIndex: props.selected ? 1000 : 1
    }))

    const generateBarcode = () => {
      nextTick(() => {
        if (!barcodeCanvas.value) return

        try {
          JsBarcode(barcodeCanvas.value, props.element.value || 'Sample123', {
            format: props.element.format || 'CODE128',
            width: props.element.lineWidth || 2,
            height: props.element.height - (props.element.showText ? 20 : 0) - 4,
            displayValue: false,
            background: props.element.backgroundColor || '#ffffff',
            lineColor: props.element.lineColor || '#000000',
            margin: 2
          })
        } catch (error) {
          console.warn('Invalid barcode value:', props.element.value)
          // Generate a fallback barcode
          try {
            JsBarcode(barcodeCanvas.value, '123456789', {
              format: 'CODE128',
              width: 2,
              height: props.element.height - (props.element.showText ? 20 : 0) - 4,
              displayValue: false,
              background: '#ffffff',
              lineColor: '#000000',
              margin: 2
            })
          } catch (fallbackError) {
            console.error('Failed to generate fallback barcode:', fallbackError)
          }
        }
      })
    }

    let isDragging = false
    let isResizing = false
    let resizeDirection = ''
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0
    let startWidth = 0
    let startHeight = 0

    const startDrag = (event) => {
      if (event.target.classList.contains('resize-handle')) return
      
      isDragging = true
      startX = event.clientX
      startY = event.clientY
      startLeft = props.element.x
      startTop = props.element.y

      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', endDrag)
      event.preventDefault()
    }

    const drag = (event) => {
      if (!isDragging) return

      const deltaX = event.clientX - startX
      const deltaY = event.clientY - startY

      props.element.x = Math.max(0, startLeft + deltaX)
      props.element.y = Math.max(0, startTop + deltaY)

      emit('update')
    }

    const endDrag = () => {
      isDragging = false
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', endDrag)
    }

    const startResize = (direction) => {
      isResizing = true
      resizeDirection = direction
      startX = event.clientX
      startY = event.clientY
      startLeft = props.element.x
      startTop = props.element.y
      startWidth = props.element.width
      startHeight = props.element.height

      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', endResize)
      event.preventDefault()
    }

    const resize = (event) => {
      if (!isResizing) return

      const deltaX = event.clientX - startX
      const deltaY = event.clientY - startY

      let newX = startLeft
      let newY = startTop
      let newWidth = startWidth
      let newHeight = startHeight

      if (resizeDirection.includes('n')) {
        newY = startTop + deltaY
        newHeight = startHeight - deltaY
      }
      if (resizeDirection.includes('s')) {
        newHeight = startHeight + deltaY
      }
      if (resizeDirection.includes('w')) {
        newX = startLeft + deltaX
        newWidth = startWidth - deltaX
      }
      if (resizeDirection.includes('e')) {
        newWidth = startWidth + deltaX
      }

      if (newWidth >= 50 && newHeight >= 30) {
        props.element.x = Math.max(0, newX)
        props.element.y = Math.max(0, newY)
        props.element.width = newWidth
        props.element.height = newHeight
        emit('update')
      }
    }

    const endResize = () => {
      isResizing = false
      resizeDirection = ''
      document.removeEventListener('mousemove', resize)
      document.removeEventListener('mouseup', endResize)
      generateBarcode()
    }

    onMounted(() => {
      generateBarcode()
    })

    watch(
      () => [
        props.element.value,
        props.element.format,
        props.element.lineWidth,
        props.element.lineColor,
        props.element.backgroundColor,
        props.element.width,
        props.element.height,
        props.element.showText
      ],
      () => {
        generateBarcode()
      },
      { deep: true }
    )

    return {
      barcodeCanvas,
      elementStyle,
      startDrag,
      startResize
    }
  }
}
</script>

<style scoped>
.roy-barcode {
  cursor: move;
  user-select: none;
  background: white;
}

.barcode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.barcode-canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.barcode-text {
  font-family: monospace;
  font-size: 12px;
  text-align: center;
  margin-top: 2px;
  color: #000;
}

.resize-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #007bff;
  border: 1px solid white;
  border-radius: 50%;
}

.resize-handle.nw { top: -4px; left: -4px; cursor: nw-resize; }
.resize-handle.ne { top: -4px; right: -4px; cursor: ne-resize; }
.resize-handle.sw { bottom: -4px; left: -4px; cursor: sw-resize; }
.resize-handle.se { bottom: -4px; right: -4px; cursor: se-resize; }
</style>