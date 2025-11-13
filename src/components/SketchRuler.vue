<template>
  <div class="sketch-ruler">
    <!-- Horizontal Ruler -->
    <div 
      class="ruler horizontal-ruler"
      :style="{
        left: `${rulerSize}px`,
        transform: `translateX(${-scrollLeft}px)`
      }"
    >
      <canvas
        ref="horizontalRulerRef"
        :width="fullContainerWidth"
        :height="rulerSize"
        @mousemove="handleHorizontalRulerMove"
        @mouseleave="hideVerticalGuideLine"
        @mousedown="startDragFromHorizontalRuler"
      ></canvas>
      
      <!-- Vertical Guide Lines -->
      <div
        v-for="line in verticalGuideLines"
        :key="`v-${line}`"
        class="guide-line vertical-guide canvas-spanning"
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
        top: `${rulerSize}px`,
        transform: `translateY(${-scrollTop}px)`
      }"
    >
      <canvas
        ref="verticalRulerRef"
        :width="rulerSize"
        :height="fullContainerHeight"
        @mousemove="handleVerticalRulerMove"
        @mouseleave="hideHorizontalGuideLine"
        @mousedown="startDragFromVerticalRuler"
      ></canvas>
      
      <!-- Horizontal Guide Lines -->
      <div
        v-for="line in horizontalGuideLines"
        :key="`h-${line}`"
        class="guide-line horizontal-guide canvas-spanning"
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
        :title="t('clearAllGuides')"
      >
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { translations } from '../translations.js'

export default {
  name: 'SketchRuler',
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    canvasWidth: {
      type: Number,
      default: 1800
    },
    canvasHeight: {
      type: Number,
      default: 1800
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
    // Get translation function
    const t = computed(() => {
      return (key) => {
        return translations[props.locale]?.[key] || translations.en[key] || key
      }
    })

    const horizontalRulerRef = ref(null)
    const verticalRulerRef = ref(null)
    
    const rulerSize = ref(20)
    const verticalGuideLines = ref([])
    const horizontalGuideLines = ref([])
    const tempVerticalGuide = ref(null)
    const tempHorizontalGuide = ref(null)
    
    const isDragging = ref(false)
    const dragTarget = ref(null)
    
    // Use the actual canvas dimensions passed from parent
    const fullContainerWidth = computed(() => {
      return props.canvasWidth || 1200
    })
    
    const fullContainerHeight = computed(() => {
      return props.canvasHeight || 800
    })

    const drawHorizontalRuler = () => {
      const canvas = horizontalRulerRef.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const { canvasWidth, zoom } = props
      const fullWidth = fullContainerWidth.value
      
      // Debug logging
      console.log('Horizontal Ruler - Canvas Width:', canvasWidth, 'Full Width:', fullWidth, 'Canvas.width:', canvas.width)
      
      ctx.clearRect(0, 0, fullWidth, rulerSize.value)
      ctx.fillStyle = '#f8f9fa'
      ctx.fillRect(0, 0, fullWidth, rulerSize.value)
      
      ctx.strokeStyle = '#dee2e6'
      ctx.fillStyle = '#495057'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const step = 10 * zoom
      const bigStep = 50 * zoom
      const labelStep = 100 * zoom

      for (let x = 0; x <= fullWidth; x += step) {
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
      ctx.lineTo(fullWidth, rulerSize.value - 0.5)
      ctx.stroke()
    }

    const drawVerticalRuler = () => {
      const canvas = verticalRulerRef.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const { canvasHeight, zoom } = props
      const fullHeight = fullContainerHeight.value
      
      // Debug logging
      console.log('Vertical Ruler - Canvas Height:', canvasHeight, 'Full Height:', fullHeight, 'Canvas.height:', canvas.height)
      
      ctx.clearRect(0, 0, rulerSize.value, fullHeight)
      ctx.fillStyle = '#f8f9fa'
      ctx.fillRect(0, 0, rulerSize.value, fullHeight)
      
      ctx.strokeStyle = '#dee2e6'
      ctx.fillStyle = '#495057'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const step = 10 * zoom
      const bigStep = 50 * zoom
      const labelStep = 100 * zoom

      for (let y = 0; y <= fullHeight; y += step) {
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
      ctx.lineTo(rulerSize.value - 0.5, fullHeight)
      ctx.stroke()
    }

    const handleHorizontalRulerMove = (event) => {
      if (isDragging.value) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left + props.scrollLeft
      tempVerticalGuide.value = x
    }

    const startDragFromHorizontalRuler = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const startX = event.clientX - rect.left + props.scrollLeft
      
      isDragging.value = true
      tempVerticalGuide.value = startX
      
      const handleMouseMove = (e) => {
        const rect = horizontalRulerRef.value?.getBoundingClientRect()
        if (!rect) return
        
        const newX = e.clientX - rect.left + props.scrollLeft
        tempVerticalGuide.value = Math.max(0, Math.min(newX, props.canvasWidth))
      }

      const handleMouseUp = (e) => {
        const rect = horizontalRulerRef.value?.getBoundingClientRect()
        if (rect) {
          const finalX = e.clientX - rect.left + props.scrollLeft
          const clampedX = Math.max(0, Math.min(finalX, props.canvasWidth))
          
          // Only add guide if it's within canvas bounds and doesn't already exist
          if (clampedX >= 0 && clampedX <= props.canvasWidth && !verticalGuideLines.value.includes(clampedX)) {
            verticalGuideLines.value.push(clampedX)
            emitGuideLines()
          }
        }
        
        isDragging.value = false
        tempVerticalGuide.value = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      event.preventDefault()
    }

    const handleVerticalRulerMove = (event) => {
      if (isDragging.value) return
      const rect = event.currentTarget.getBoundingClientRect()
      const y = event.clientY - rect.top + props.scrollTop
      tempHorizontalGuide.value = y
    }

    const startDragFromVerticalRuler = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const startY = event.clientY - rect.top + props.scrollTop
      
      isDragging.value = true
      tempHorizontalGuide.value = startY
      
      const handleMouseMove = (e) => {
        const rect = verticalRulerRef.value?.getBoundingClientRect()
        if (!rect) return
        
        const newY = e.clientY - rect.top + props.scrollTop
        tempHorizontalGuide.value = Math.max(0, Math.min(newY, props.canvasHeight))
      }

      const handleMouseUp = (e) => {
        const rect = verticalRulerRef.value?.getBoundingClientRect()
        if (rect) {
          const finalY = e.clientY - rect.top + props.scrollTop
          const clampedY = Math.max(0, Math.min(finalY, props.canvasHeight))
          
          // Only add guide if it's within canvas bounds and doesn't already exist
          if (clampedY >= 0 && clampedY <= props.canvasHeight && !horizontalGuideLines.value.includes(clampedY)) {
            horizontalGuideLines.value.push(clampedY)
            emitGuideLines()
          }
        }
        
        isDragging.value = false
        tempHorizontalGuide.value = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      event.preventDefault()
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
      
      const originalIndex = verticalGuideLines.value.indexOf(linePosition)
      
      const handleMouseMove = (e) => {
        const rect = horizontalRulerRef.value?.getBoundingClientRect()
        if (!rect) return
        
        const newX = e.clientX - rect.left + props.scrollLeft
        
        const index = verticalGuideLines.value.indexOf(dragTarget.value.position)
        if (index > -1) {
          verticalGuideLines.value[index] = newX
          dragTarget.value.position = newX
        }
      }

      const handleMouseUp = (e) => {
        const rect = horizontalRulerRef.value?.getBoundingClientRect()
        if (rect) {
          const finalX = e.clientX - rect.left + props.scrollLeft
          const rulerRect = horizontalRulerRef.value.getBoundingClientRect()
          const mouseY = e.clientY
          
          // Check if dragged back to ruler (within ruler bounds)
          if (mouseY >= rulerRect.top && mouseY <= rulerRect.bottom) {
            // Remove the guide
            const index = verticalGuideLines.value.indexOf(dragTarget.value.position)
            if (index > -1) {
              verticalGuideLines.value.splice(index, 1)
            }
          } else if (finalX < 0 || finalX > props.canvasWidth) {
            // Remove if dragged outside canvas bounds
            const index = verticalGuideLines.value.indexOf(dragTarget.value.position)
            if (index > -1) {
              verticalGuideLines.value.splice(index, 1)
            }
          }
        }
        
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
      
      const originalIndex = horizontalGuideLines.value.indexOf(linePosition)
      
      const handleMouseMove = (e) => {
        const rect = verticalRulerRef.value?.getBoundingClientRect()
        if (!rect) return
        
        const newY = e.clientY - rect.top + props.scrollTop
        
        const index = horizontalGuideLines.value.indexOf(dragTarget.value.position)
        if (index > -1) {
          horizontalGuideLines.value[index] = newY
          dragTarget.value.position = newY
        }
      }

      const handleMouseUp = (e) => {
        const rect = verticalRulerRef.value?.getBoundingClientRect()
        if (rect) {
          const finalY = e.clientY - rect.top + props.scrollTop
          const rulerRect = verticalRulerRef.value.getBoundingClientRect()
          const mouseX = e.clientX
          
          // Check if dragged back to ruler (within ruler bounds)
          if (mouseX >= rulerRect.left && mouseX <= rulerRect.right) {
            // Remove the guide
            const index = horizontalGuideLines.value.indexOf(dragTarget.value.position)
            if (index > -1) {
              horizontalGuideLines.value.splice(index, 1)
            }
          } else if (finalY < 0 || finalY > props.canvasHeight) {
            // Remove if dragged outside canvas bounds
            const index = horizontalGuideLines.value.indexOf(dragTarget.value.position)
            if (index > -1) {
              horizontalGuideLines.value.splice(index, 1)
            }
          }
        }
        
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
      t,
      horizontalRulerRef,
      verticalRulerRef,
      rulerSize,
      verticalGuideLines,
      horizontalGuideLines,
      tempVerticalGuide,
      tempHorizontalGuide,
      fullContainerWidth,
      fullContainerHeight,
      handleHorizontalRulerMove,
      handleVerticalRulerMove,
      hideVerticalGuideLine,
      hideHorizontalGuideLine,
      startDragFromHorizontalRuler,
      startDragFromVerticalRuler,
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
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #dee2e6;
}

.vertical-ruler {
  left: 0;
  width: 20px;
  height: 100%;
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
  transition: all 0.15s ease;
}

.vertical-guide {
  top: 0;
  bottom: 0;
  width: 1px;
  background: #00d4ff;
  cursor: ew-resize;
  box-shadow: 0 0 1px rgba(0, 212, 255, 0.6);
}

.vertical-guide.canvas-spanning {
  top: 0;
  height: 100vh;
  width: 3px;
  background: linear-gradient(to right, transparent, #00d4ff, transparent);
  box-shadow: 0 0 2px rgba(0, 212, 255, 0.8);
}

.horizontal-guide {
  left: 0;
  right: 0;
  height: 1px;
  background: #00d4ff;
  cursor: ns-resize;
  box-shadow: 0 0 1px rgba(0, 212, 255, 0.6);
}

.horizontal-guide.canvas-spanning {
  left: 0;
  width: 100vw;
  height: 3px;
  background: linear-gradient(to bottom, transparent, #00d4ff, transparent);
  box-shadow: 0 0 2px rgba(0, 212, 255, 0.8);
}

.guide-line.temp {
  background: rgba(0, 212, 255, 0.7);
  pointer-events: none;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.guide-line:hover {
  background: #ff4081;
  box-shadow: 0 0 3px rgba(255, 64, 129, 0.8);
  transform: scale(1.5);
}

.guide-line.canvas-spanning:hover {
  background: #ff4081 !important;
  box-shadow: 0 0 4px rgba(255, 64, 129, 0.9) !important;
  transform: scale(1.2);
}

.vertical-guide.canvas-spanning:hover {
  background: linear-gradient(to right, transparent, #ff4081, transparent) !important;
}

.horizontal-guide.canvas-spanning:hover {
  background: linear-gradient(to bottom, transparent, #ff4081, transparent) !important;
}

@keyframes pulse {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

/* Make rulers more interactive */
canvas {
  display: block;
  cursor: crosshair;
  transition: background-color 0.2s ease;
}

.horizontal-ruler canvas:hover {
  cursor: crosshair;
  background-color: rgba(0, 212, 255, 0.1);
}

.vertical-ruler canvas:hover {
  cursor: crosshair;
  background-color: rgba(0, 212, 255, 0.1);
}
</style>