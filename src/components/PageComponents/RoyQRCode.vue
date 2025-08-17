<template>
  <div
    class="roy-qrcode"
    :style="elementStyle"
    @mousedown="startDrag"
    @click.stop="$emit('select', element)"
  >
    <div class="qrcode-container">
      <canvas ref="qrcodeCanvas" class="qrcode-canvas"></canvas>
      <div v-if="element.showText" class="qrcode-text">
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
import QRCode from 'qrcode'

export default {
  name: 'RoyQRCode',
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
    const qrcodeCanvas = ref(null)

    const elementStyle = computed(() => ({
      position: 'absolute',
      left: `${props.element.x}px`,
      top: `${props.element.y}px`,
      width: `${props.element.width}px`,
      height: `${props.element.height}px`,
      border: props.selected ? '2px solid #007bff' : '2px dashed transparent',
      zIndex: props.selected ? 1000 : 1
    }))

    const generateQRCode = () => {
      nextTick(() => {
        if (!qrcodeCanvas.value) return

        const size = Math.min(
          props.element.width - 4, 
          props.element.height - (props.element.showText ? 20 : 0) - 4
        )

        const options = {
          width: size,
          height: size,
          margin: props.element.margin || 1,
          color: {
            dark: props.element.foregroundColor || '#000000',
            light: props.element.backgroundColor || '#ffffff'
          },
          errorCorrectionLevel: props.element.errorCorrectionLevel || 'M'
        }

        QRCode.toCanvas(
          qrcodeCanvas.value, 
          props.element.value || 'Sample QR Code', 
          options
        ).catch(error => {
          console.warn('Failed to generate QR code:', error)
          // Generate fallback QR code
          QRCode.toCanvas(
            qrcodeCanvas.value, 
            'Error generating QR code', 
            { ...options, width: size, height: size }
          ).catch(fallbackError => {
            console.error('Failed to generate fallback QR code:', fallbackError)
          })
        })
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

      if (newWidth >= 50 && newHeight >= 50) {
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
      generateQRCode()
    }

    onMounted(() => {
      generateQRCode()
    })

    watch(
      () => [
        props.element.value,
        props.element.foregroundColor,
        props.element.backgroundColor,
        props.element.errorCorrectionLevel,
        props.element.margin,
        props.element.width,
        props.element.height,
        props.element.showText
      ],
      () => {
        generateQRCode()
      },
      { deep: true }
    )

    return {
      qrcodeCanvas,
      elementStyle,
      startDrag,
      startResize
    }
  }
}
</script>

<style scoped>
.roy-qrcode {
  cursor: move;
  user-select: none;
  background: white;
}

.qrcode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.qrcode-canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.qrcode-text {
  font-family: monospace;
  font-size: 10px;
  text-align: center;
  margin-top: 2px;
  color: #000;
  word-break: break-all;
  padding: 0 2px;
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