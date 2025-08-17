<template>
  <div
    class="draggable-element"
    :class="{ selected }"
    :style="elementStyle"
    @mousedown="startDrag"
    @click.stop="$emit('select', element)"
  >
    <!-- Text and Formatted Text Elements -->
    <div v-if="element.type === 'text' || element.type === 'formatted-text'" class="text-element-container">
      <textarea
        v-if="selected"
        class="text-element"
        :style="textStyle"
        v-model="element.content"
        @input="$emit('update')"
        @mousedown.stop
        @click.stop
      ></textarea>
      <div
        v-else
        class="text-element"
        :style="textStyle"
        v-html="element.content"
      ></div>
    </div>

    <!-- Image Elements -->
    <div v-else-if="element.type === 'image'" class="image-element-container">
      <img
        v-if="element.src"
        :src="element.src"
        class="image-element"
        :style="imageStyle"
        @dragstart.prevent
      />
      <div
        v-else
        class="image-placeholder d-flex align-items-center justify-content-center"
        :style="imageStyle"
      >
        <i class="bi bi-image fs-1 text-muted"></i>
      </div>
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
    <div v-else-if="element.type === 'table'" class="table-element" @click.stop>
      <table class="table-shape" :style="tableStyle">
        <tr v-for="(row, rowIndex) in element.data" :key="rowIndex">
          <td 
            v-for="(cell, colIndex) in row" 
            :key="colIndex"
            v-show="!isCellHidden(rowIndex, colIndex)"
            :style="getCellStyleWithMerge(rowIndex, colIndex)"
            :colspan="getCellColspan(rowIndex, colIndex)"
            :rowspan="getCellRowspan(rowIndex, colIndex)"
            class="table-cell"
            :class="{
              'merged-cell': isCellMerged(rowIndex, colIndex)
            }"
            @click.stop="$emit('cell-select', rowIndex, colIndex)"
          >
            {{ cell }}
          </td>
        </tr>
      </table>
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
import { computed } from 'vue'

export default {
  name: 'DraggableElement',
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
  emits: ['select', 'update', 'delete', 'cell-select'],
  setup(props, { emit }) {
    const elementStyle = computed(() => ({
      left: `${props.element.x}px`,
      top: `${props.element.y}px`,
      width: `${props.element.width}px`,
      height: `${props.element.height}px`,
      zIndex: props.selected ? 1000 : 1
    }))

    const textStyle = computed(() => ({
      fontSize: `${props.element.fontSize || 14}px`,
      color: props.element.color || '#000000',
      fontWeight: props.element.fontWeight || 'normal',
      fontStyle: props.element.fontStyle || 'normal',
      textDecoration: props.element.textDecoration || 'none',
      width: '100%',
      height: '100%',
      fontFamily: props.element.fontFamily || 'inherit',
      lineHeight: '1.2',
      padding: '4px',
      direction: props.element.textDirection || 'ltr',
      textAlign: props.element.textDirection === 'rtl' ? 'right' : 'left'
    }))

    const imageStyle = computed(() => ({
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }))

    const tableStyle = computed(() => ({
      width: '100%',
      height: '100%',
      borderCollapse: 'collapse',
      fontSize: `${props.element.fontSize || 12}px`,
      backgroundColor: props.element.backgroundColor || '#ffffff',
      color: props.element.textColor || '#000000',
      fontFamily: props.element.fontFamily || 'inherit',
      direction: props.element.textDirection || 'ltr'
    }))

    const cellStyle = computed(() => ({
      border: `${props.element.borderWidth || 1}px ${props.element.borderStyle || 'solid'} ${props.element.borderColor || '#000000'}`,
      padding: `${props.element.cellPadding || 5}px`,
      textAlign: props.element.textDirection === 'rtl' ? 'right' : (props.element.textAlign || 'left'),
      verticalAlign: props.element.verticalAlign || 'top',
      backgroundColor: 'inherit',
      color: 'inherit',
      fontSize: 'inherit',
      direction: props.element.textDirection || 'ltr'
    }))

    const getCellStyleWithMerge = (row, col) => {
      const baseStyle = cellStyle.value
      const mergeStyle = {}
      
      if (isCellMerged(row, col)) {
        mergeStyle.backgroundColor = '#e8f5e8'
        mergeStyle.borderColor = '#28a745'
        mergeStyle.borderWidth = '2px'
      }
      
      return { ...baseStyle, ...mergeStyle }
    }

    const isCellMerged = (row, col) => {
      if (!props.element.mergedCells) return false
      const key = `${row},${col}`
      const mergeData = props.element.mergedCells[key]
      return mergeData && (mergeData.colspan > 1 || mergeData.rowspan > 1)
    }

    const isCellHidden = (row, col) => {
      if (!props.element.mergedCells) return false
      
      // Check if this cell is covered by another merged cell
      for (const [mergedKey, mergeData] of Object.entries(props.element.mergedCells)) {
        const [mergedRow, mergedCol] = mergedKey.split(',').map(Number)
        const { colspan = 1, rowspan = 1 } = mergeData
        
        if (mergedRow !== row || mergedCol !== col) {
          // Check if current cell is within the merged range
          if (row >= mergedRow && row < mergedRow + rowspan &&
              col >= mergedCol && col < mergedCol + colspan) {
            return true
          }
        }
      }
      return false
    }

    const getCellColspan = (row, col) => {
      if (!props.element.mergedCells) return 1
      const key = `${row},${col}`
      return props.element.mergedCells[key]?.colspan || 1
    }

    const getCellRowspan = (row, col) => {
      if (!props.element.mergedCells) return 1
      const key = `${row},${col}`
      return props.element.mergedCells[key]?.rowspan || 1
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

      if (newWidth >= 20 && newHeight >= 20) {
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
    }

    return {
      elementStyle,
      textStyle,
      imageStyle,
      tableStyle,
      cellStyle,
      getCellStyleWithMerge,
      isCellMerged,
      isCellHidden,
      getCellColspan,
      getCellRowspan,
      startDrag,
      startResize
    }
  }
}
</script>

<style scoped>
.text-element-container,
.image-element-container,
.line-element,
.rect-element,
.circle-element,
.table-element {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  width: 100%;
  height: 100%;
}

.text-element {
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
}

.line-element {
  position: relative;
}

.rect-element,
.circle-element {
  box-sizing: border-box;
}

.table-shape {
  font-family: inherit;
  width: 100%;
  height: 100%;
}

.table-shape td {
  overflow: hidden;
  word-wrap: break-word;
  max-width: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.table-shape td:hover {
  background-color: #f8f9fa !important;
}

.table-cell.merged-cell {
  background-color: #e8f5e8 !important;
  border-color: #28a745 !important;
  border-width: 2px !important;
}
</style>