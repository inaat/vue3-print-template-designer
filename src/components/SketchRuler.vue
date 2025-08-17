<template>
  <div class="sketch-ruler">
    <!-- Horizontal Ruler -->
    <div 
      class="ruler horizontal-ruler"
      :style="{
        width: `${canvasWidth}px`,
        left: `${rulerSize}px`,
        transform: `translateX(${-scrollLeft}px)`
      }"
    >
      <canvas
        ref="horizontalRulerRef"
        :width="canvasWidth"
        :height="rulerSize"
        @mousemove="handleHorizontalRulerMove"
        @mouseleave="hideVerticalGuideLine"
        @click="addVerticalGuideLine"
      ></canvas>
      
      <!-- Vertical Guide Lines -->
      <div
        v-for="line in verticalGuideLines"
        :key="`v-${line}`"
        class="guide-line vertical-guide"
        :style="{ left: `${line}px` }"
        @mousedown="startDragVerticalGuide(line, $event)"
      ></div>
      
      <!-- Temporary Vertical Guide -->
      <div
        v-if="tempVerticalGuide !== null"
        class="guide-line vertical-guide temp"
        :style="{ left: `${tempVerticalGuide}px` }"
      ></div>
    </div>

    <!-- Vertical Ruler -->
    <div 
      class="ruler vertical-ruler"
      :style="{
        height: `${canvasHeight}px`,
        top: `${rulerSize}px`,
        transform: `translateY(${-scrollTop}px)`
      }"
    >
      <canvas
        ref="verticalRulerRef"
        :width="rulerSize"
        :height="canvasHeight"
        @mousemove="handleVerticalRulerMove"
        @mouseleave="hideHorizontalGuideLine"
        @click="addHorizontalGuideLine"
      ></canvas>
      
      <!-- Horizontal Guide Lines -->
      <div
        v-for="line in horizontalGuideLines"
        :key="`h-${line}`"
        class="guide-line horizontal-guide"
        :style="{ top: `${line}px` }"
        @mousedown="startDragHorizontalGuide(line, $event)"
      ></div>
      
      <!-- Temporary Horizontal Guide -->
      <div
        v-if="tempHorizontalGuide !== null"
        class="guide-line horizontal-guide temp"
        :style="{ top: `${tempHorizontalGuide}px` }"
      ></div>
    </div>

    <!-- Corner -->
    <div class="ruler-corner" :style="{ width: `${rulerSize}px`, height: `${rulerSize}px` }">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="clearAllGuides"
        title="Clear all guides"
      >
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'

export default {
  name: 'SketchRuler',
  props: {
    canvasWidth: {
      type: Number,
      default: 800
    },
    canvasHeight: {
      type: Number,
      default: 600
    },
    zoom: {
      type: Number,
      default: 1
    },
    scrollLeft: {
      type: Number,
      default: 0
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: 'px'
    }
  },
  emits: ['guide-lines-changed'],
  setup(props, { emit }) {
    const horizontalRulerRef = ref(null)
    const verticalRulerRef = ref(null)
    
    const rulerSize = ref(20)
    const verticalGuideLines = ref([])
    const horizontalGuideLines = ref([])
    const tempVerticalGuide = ref(null)
    const tempHorizontalGuide = ref(null)
    
    const isDragging = ref(false)
    const dragTarget = ref(null)

    const drawHorizontalRuler = () => {
      const canvas = horizontalRulerRef.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const { canvasWidth, zoom } = props
      
      ctx.clearRect(0, 0, canvasWidth, rulerSize.value)
      ctx.fillStyle = '#f8f9fa'
      ctx.fillRect(0, 0, canvasWidth, rulerSize.value)
      
      ctx.strokeStyle = '#dee2e6'
      ctx.fillStyle = '#495057'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const step = 10 * zoom
      const bigStep = 50 * zoom
      const labelStep = 100 * zoom

      for (let x = 0; x <= canvasWidth; x += step) {
        const isBig = x % bigStep === 0
        const isLabel = x % labelStep === 0
        
        ctx.beginPath()
        ctx.moveTo(x, rulerSize.value)
        ctx.lineTo(x, rulerSize.value - (isBig ? 8 : 4))
        ctx.stroke()

        if (isLabel && x > 0) {
          const value = Math.round(x / zoom)
          ctx.fillText(value.toString(), x, rulerSize.value / 2 - 2)
        }
      }

      // Bottom border
      ctx.beginPath()
      ctx.moveTo(0, rulerSize.value - 0.5)
      ctx.lineTo(canvasWidth, rulerSize.value - 0.5)
      ctx.stroke()
    }

    const drawVerticalRuler = () => {
      const canvas = verticalRulerRef.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const { canvasHeight, zoom } = props
      
      ctx.clearRect(0, 0, rulerSize.value, canvasHeight)
      ctx.fillStyle = '#f8f9fa'
      ctx.fillRect(0, 0, rulerSize.value, canvasHeight)
      
      ctx.strokeStyle = '#dee2e6'
      ctx.fillStyle = '#495057'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const step = 10 * zoom
      const bigStep = 50 * zoom
      const labelStep = 100 * zoom

      for (let y = 0; y <= canvasHeight; y += step) {
        const isBig = y % bigStep === 0
        const isLabel = y % labelStep === 0
        
        ctx.beginPath()
        ctx.moveTo(rulerSize.value, y)
        ctx.lineTo(rulerSize.value - (isBig ? 8 : 4), y)
        ctx.stroke()

        if (isLabel && y > 0) {
          const value = Math.round(y / zoom)
          ctx.save()
          ctx.translate(rulerSize.value / 2 - 2, y)
          ctx.rotate(-Math.PI / 2)
          ctx.fillText(value.toString(), 0, 0)
          ctx.restore()
        }
      }

      // Right border
      ctx.beginPath()
      ctx.moveTo(rulerSize.value - 0.5, 0)
      ctx.lineTo(rulerSize.value - 0.5, canvasHeight)
      ctx.stroke()
    }

    const handleHorizontalRulerMove = (event) => {
      if (isDragging.value) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left + props.scrollLeft
      tempVerticalGuide.value = x
    }

    const handleVerticalRulerMove = (event) => {
      if (isDragging.value) return
      const rect = event.currentTarget.getBoundingClientRect()
      const y = event.clientY - rect.top + props.scrollTop
      tempHorizontalGuide.value = y
    }

    const hideVerticalGuideLine = () => {
      if (!isDragging.value) {
        tempVerticalGuide.value = null
      }
    }

    const hideHorizontalGuideLine = () => {
      if (!isDragging.value) {
        tempHorizontalGuide.value = null
      }
    }

    const addVerticalGuideLine = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left + props.scrollLeft
      
      if (!verticalGuideLines.value.includes(x)) {
        verticalGuideLines.value.push(x)
        emitGuideLines()
      }
      
      tempVerticalGuide.value = null
    }

    const addHorizontalGuideLine = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const y = event.clientY - rect.top + props.scrollTop
      
      if (!horizontalGuideLines.value.includes(y)) {
        horizontalGuideLines.value.push(y)
        emitGuideLines()
      }
      
      tempHorizontalGuide.value = null
    }

    const startDragVerticalGuide = (linePosition, event) => {
      isDragging.value = true
      dragTarget.value = { type: 'vertical', position: linePosition }
      
      const handleMouseMove = (e) => {
        const rect = horizontalRulerRef.value.getBoundingClientRect()
        const newX = e.clientX - rect.left + props.scrollLeft
        
        const index = verticalGuideLines.value.indexOf(linePosition)
        if (index > -1) {
          verticalGuideLines.value[index] = newX
        }
        dragTarget.value.position = newX
      }

      const handleMouseUp = () => {
        isDragging.value = false
        dragTarget.value = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        emitGuideLines()
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      event.preventDefault()
    }

    const startDragHorizontalGuide = (linePosition, event) => {
      isDragging.value = true
      dragTarget.value = { type: 'horizontal', position: linePosition }
      
      const handleMouseMove = (e) => {
        const rect = verticalRulerRef.value.getBoundingClientRect()
        const newY = e.clientY - rect.top + props.scrollTop
        
        const index = horizontalGuideLines.value.indexOf(linePosition)
        if (index > -1) {
          horizontalGuideLines.value[index] = newY
        }
        dragTarget.value.position = newY
      }

      const handleMouseUp = () => {
        isDragging.value = false
        dragTarget.value = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        emitGuideLines()
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      event.preventDefault()
    }

    const clearAllGuides = () => {
      verticalGuideLines.value = []
      horizontalGuideLines.value = []
      emitGuideLines()
    }

    const emitGuideLines = () => {
      emit('guide-lines-changed', {
        vertical: [...verticalGuideLines.value],
        horizontal: [...horizontalGuideLines.value]
      })
    }

    const redrawRulers = () => {
      nextTick(() => {
        drawHorizontalRuler()
        drawVerticalRuler()
      })
    }

    onMounted(() => {
      redrawRulers()
    })

    watch(() => [props.canvasWidth, props.canvasHeight, props.zoom, props.scrollLeft, props.scrollTop], () => {
      redrawRulers()
    })

    return {
      horizontalRulerRef,
      verticalRulerRef,
      rulerSize,
      verticalGuideLines,
      horizontalGuideLines,
      tempVerticalGuide,
      tempHorizontalGuide,
      handleHorizontalRulerMove,
      handleVerticalRulerMove,
      hideVerticalGuideLine,
      hideHorizontalGuideLine,
      addVerticalGuideLine,
      addHorizontalGuideLine,
      startDragVerticalGuide,
      startDragHorizontalGuide,
      clearAllGuides
    }
  }
}
</script>

<style scoped>
.sketch-ruler {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
}

.ruler {
  position: absolute;
  pointer-events: all;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
}

.horizontal-ruler {
  top: 0;
  height: 20px;
  border-bottom: 1px solid #dee2e6;
}

.vertical-ruler {
  left: 0;
  width: 20px;
  border-right: 1px solid #dee2e6;
}

.ruler-corner {
  position: absolute;
  top: 0;
  left: 0;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
}

.ruler-corner .btn {
  padding: 2px 4px;
  font-size: 10px;
}

.guide-line {
  position: absolute;
  pointer-events: all;
  z-index: 1001;
}

.vertical-guide {
  top: 0;
  bottom: 0;
  width: 1px;
  background: #007bff;
  cursor: ew-resize;
}

.horizontal-guide {
  left: 0;
  right: 0;
  height: 1px;
  background: #007bff;
  cursor: ns-resize;
}

.guide-line.temp {
  background: rgba(0, 123, 255, 0.5);
  pointer-events: none;
}

.guide-line:hover {
  background: #0056b3;
  box-shadow: 0 0 2px rgba(0, 123, 255, 0.5);
}

canvas {
  display: block;
  cursor: crosshair;
}
</style>