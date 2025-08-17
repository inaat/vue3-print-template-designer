<template>
  <div class="data-source-panel">
    <!-- Placeholders Content -->
    <div class="placeholders-content">
        <div class="placeholder-categories">
          <div
            v-for="category in placeholders"
            :key="category.name"
            class="category-section"
          >
            <div
              class="category-header"
              @click="toggleCategory(category.name)"
            >
              <i
                class="bi"
                :class="expandedCategories.includes(category.name) ? 'bi-chevron-down' : 'bi-chevron-right'"
              ></i>
              {{ category.name }}
            </div>

            <div
              v-if="expandedCategories.includes(category.name)"
              class="category-items"
            >
              <div
                v-for="item in category.items"
                :key="item.content"
                class="placeholder-item"
                draggable="true"
                @dragstart="handlePlaceholderDragStart($event, item)"
                @click="addPlaceholderElement(item)"
              >
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-label">{{ item.label }}</span>
                <span v-if="item.type === 'placeholder'" class="item-value">{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholders: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-element'])

const expandedCategories = ref(['👨‍💼 Staff Details', '⚡ Quick Labels'])

    const toggleCategory = (categoryName) => {
      const index = expandedCategories.value.indexOf(categoryName)
      if (index > -1) {
        expandedCategories.value.splice(index, 1)
      } else {
        expandedCategories.value.push(categoryName)
      }
    }

    const handlePlaceholderDragStart = (event, item) => {
      event.dataTransfer.setData('application/json', JSON.stringify(item))
    }

    const addPlaceholderElement = (item) => {
      console.log('Adding placeholder element:', item)
      
      let elementData

      switch (item.type) {
        case 'placeholder':
        case 'text':
          elementData = {
            type: 'text',
            content: item.content,
            fontSize: 14,
            color: '#000000',
            fontWeight: item.type === 'placeholder' ? 'normal' : 'bold'
          }
          break

        case 'formatted-text':
          elementData = {
            type: 'formatted-text',
            content: item.content,
            format: item.format,
            fontSize: getFormattedTextSize(item.format),
            color: '#000000',
            fontWeight: ['h1', 'h2', 'h3', 'h4', 'h5', 'bold'].includes(item.format) ? 'bold' : 'normal',
            fontStyle: item.format === 'italic' ? 'italic' : 'normal',
            textDecoration: item.format === 'underline' ? 'underline' : 'none'
          }
          break

        case 'image':
        case 'image-placeholder':
          elementData = {
            type: 'image',
            content: item.content,
            src: item.content && item.content.startsWith('{{') ? null : 'https://via.placeholder.com/150x100'
          }
          break

        default:
          elementData = {
            type: 'text',
            content: item.content,
            fontSize: 14,
            color: '#000000'
          }
      }

      console.log('Emitting element data:', elementData)
      emit('add-element', elementData)
    }

    const getFormattedTextSize = (format) => {
      const sizes = {
        h1: 32,
        h2: 28,
        h3: 24,
        h4: 20,
        h5: 16,
        p: 14,
        bold: 14,
        italic: 14,
        underline: 14
      }
      return sizes[format] || 14
    }

</script>

<style scoped>
.data-source-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.placeholders-content {
  height: 100%;
  overflow-y: auto;
}

.category-section {
  margin-bottom: 0.5rem;
}

.category-header {
  font-size: 12px;
  font-weight: 600;
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-header:hover {
  background: #e9ecef;
}

.category-items {
  border: 1px solid #dee2e6;
  border-top: none;
}

.placeholder-item {
  padding: 0.5rem;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 11px;
}

.placeholder-item:hover {
  background: #f8f9fa;
}

.placeholder-item:active {
  background: #e9ecef;
}

.item-icon {
  font-size: 14px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.item-label {
  flex: 1;
  font-weight: 500;
}

.item-value {
  font-family: monospace;
  font-size: 10px;
  color: #6c757d;
  background: #f8f9fa;
  padding: 2px 4px;
  border-radius: 2px;
}

</style>