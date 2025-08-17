<template>
  <div class="designer-container">
    <div class="toolbar">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <h5 class="mb-0">Print Template Designer</h5>
          <div class="btn-group" role="group">
            <button 
              type="button" 
              class="btn btn-outline-primary btn-sm"
              @click="addElement('text')"
            >
              <i class="bi bi-type"></i> Text
            </button>
            <button 
              type="button" 
              class="btn btn-outline-primary btn-sm"
              @click="addElement('image')"
            >
              <i class="bi bi-image"></i> Image
            </button>
            <label class="btn btn-outline-success btn-sm" for="imageUpload">
              <i class="bi bi-upload"></i> Upload Image
            </label>
            <input 
              type="file" 
              id="imageUpload" 
              accept="image/*" 
              @change="handleImageUpload"
              style="display: none;"
            >
            <button 
              type="button" 
              class="btn btn-outline-success btn-sm"
              @click="testAddElement"
            >
              <i class="bi bi-plus"></i> Test ({{ elements.length }})
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
          
          <div class="form-check">
            <input 
              class="form-check-input" 
              type="checkbox" 
              id="gridToggle"
              v-model="showGrid"
            >
            <label class="form-check-label" for="gridToggle">
              Grid
            </label>
          </div>
          
          <select class="form-select form-select-sm" v-model="pageSize" style="width: auto;">
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </div>
      </div>
    </div>

    <div class="canvas-area">
      <div class="sidebar">
        <!-- Sidebar Tabs -->
        <ul class="nav nav-tabs sidebar-tabs">
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: sidebarTab === 'elements' }"
              @click="setSidebarTab('elements')"
              type="button"
              title="Elements"
            >
              <i class="bi bi-collection"></i>
              <span class="tab-label">Elements</span>
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: sidebarTab === 'data' }"
              @click="setSidebarTab('data')"
              type="button"
              title="Data Sources"
            >
              <i class="bi bi-database"></i>
              <span class="tab-label">Data</span>
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: sidebarTab === 'properties' }"
              @click="setSidebarTab('properties')"
              type="button"
              title="Properties"
            >
              <i class="bi bi-sliders"></i>
              <span class="tab-label">Properties</span>
            </button>
          </li>
        </ul>

        <!-- Elements Tab -->
        <div v-if="sidebarTab === 'elements'" class="sidebar-content p-3">
          <h6>Basic Elements</h6>
          <div class="component-library">
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'text', content: 'Sample Text', fontSize: 16, color: '#000000' })"
              @click="addElementFromData({ type: 'text', content: 'Sample Text', fontSize: 16, color: '#000000' })"
            >
              <i class="bi bi-type me-2"></i>
              Text Field
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'image', src: 'https://via.placeholder.com/150x100' })"
              @click="addElementFromData({ type: 'image', src: 'https://via.placeholder.com/150x100' })"
            >
              <i class="bi bi-image me-2"></i>
              Image Field
            </div>
            <label class="component-item" for="sidebarImageUpload" style="cursor: pointer;">
              <i class="bi bi-upload me-2"></i>
              Upload Image
            </label>
            <input 
              type="file" 
              id="sidebarImageUpload" 
              accept="image/*" 
              @change="handleImageUpload"
              style="display: none;"
            >
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'line', strokeColor: '#000000', strokeWidth: 2, strokeStyle: 'solid' })"
              @click="addElementFromData({ type: 'line', strokeColor: '#000000', strokeWidth: 2, strokeStyle: 'solid' })"
            >
              <i class="bi bi-slash-lg me-2"></i>
              Line
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'rect', fillColor: '#ffffff', strokeColor: '#000000', strokeWidth: 1, strokeStyle: 'solid' })"
              @click="addElementFromData({ type: 'rect', fillColor: '#ffffff', strokeColor: '#000000', strokeWidth: 1, strokeStyle: 'solid' })"
            >
              <i class="bi bi-square me-2"></i>
              Rectangle
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'circle', fillColor: '#ffffff', strokeColor: '#000000', strokeWidth: 1, strokeStyle: 'solid' })"
              @click="addElementFromData({ type: 'circle', fillColor: '#ffffff', strokeColor: '#000000', strokeWidth: 1, strokeStyle: 'solid' })"
            >
              <i class="bi bi-circle me-2"></i>
              Circle
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'table', rows: 3, cols: 3, borderStyle: 'solid', data: [['Cell 1', 'Cell 2', 'Cell 3'], ['Cell 4', 'Cell 5', 'Cell 6'], ['Cell 7', 'Cell 8', 'Cell 9']] })"
              @click="addElementFromData({ type: 'table', rows: 3, cols: 3, borderStyle: 'solid', data: [['Cell 1', 'Cell 2', 'Cell 3'], ['Cell 4', 'Cell 5', 'Cell 6'], ['Cell 7', 'Cell 8', 'Cell 9']] })"
            >
              <i class="bi bi-table me-2"></i>
              Table
            </div>
          </div>

          <h6 class="mt-4">✨ Text Styles</h6>
          <div class="component-library">
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Main Title', format: 'h1', fontSize: 32, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Main Title', format: 'h1', fontSize: 32, fontWeight: 'bold' })"
            >
              <span class="item-icon">H1</span>
              Heading 1 (H1)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Section Title', format: 'h2', fontSize: 28, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Section Title', format: 'h2', fontSize: 28, fontWeight: 'bold' })"
            >
              <span class="item-icon">H2</span>
              Heading 2 (H2)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Subsection Title', format: 'h3', fontSize: 24, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Subsection Title', format: 'h3', fontSize: 24, fontWeight: 'bold' })"
            >
              <span class="item-icon">H3</span>
              Heading 3 (H3)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Minor Heading', format: 'h4', fontSize: 20, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Minor Heading', format: 'h4', fontSize: 20, fontWeight: 'bold' })"
            >
              <span class="item-icon">H4</span>
              Heading 4 (H4)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Small Heading', format: 'h5', fontSize: 16, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Small Heading', format: 'h5', fontSize: 16, fontWeight: 'bold' })"
            >
              <span class="item-icon">H5</span>
              Heading 5 (H5)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Regular paragraph text', format: 'p', fontSize: 14, fontWeight: 'normal' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Regular paragraph text', format: 'p', fontSize: 14, fontWeight: 'normal' })"
            >
              <span class="item-icon">P</span>
              Paragraph (P)
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Important Note', format: 'bold', fontSize: 14, fontWeight: 'bold' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Important Note', format: 'bold', fontSize: 14, fontWeight: 'bold' })"
            >
              <span class="item-icon">B</span>
              Bold Text
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Emphasized text', format: 'italic', fontSize: 14, fontStyle: 'italic' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Emphasized text', format: 'italic', fontSize: 14, fontStyle: 'italic' })"
            >
              <span class="item-icon">I</span>
              Italic Text
            </div>
            <div 
              class="component-item"
              draggable="true"
              @dragstart="handleElementDragStart($event, { type: 'formatted-text', content: 'Underlined text', format: 'underline', fontSize: 14, textDecoration: 'underline' })"
              @click="addElementFromData({ type: 'formatted-text', content: 'Underlined text', format: 'underline', fontSize: 14, textDecoration: 'underline' })"
            >
              <span class="item-icon">U</span>
              Underlined Text
            </div>
          </div>
        </div>

        <!-- Data Source Tab -->
        <div v-if="sidebarTab === 'data'" class="sidebar-content">
          <data-source-panel :placeholders="placeholders" @add-element="addDataElement" />
        </div>


        <!-- Properties Tab -->
        <div v-if="sidebarTab === 'properties'" class="sidebar-content p-3">
          <div v-if="selectedElement" class="properties-panel">
            <h6>Properties</h6>
            
            <div class="mb-3">
              <label class="form-label">Position</label>
              <div class="row g-2">
                <div class="col">
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    placeholder="X"
                    v-model.number="selectedElement.x"
                    @input="updateElement"
                  >
                </div>
                <div class="col">
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    placeholder="Y"
                    v-model.number="selectedElement.y"
                    @input="updateElement"
                  >
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Size</label>
              <div class="row g-2">
                <div class="col">
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    placeholder="Width"
                    v-model.number="selectedElement.width"
                    @input="updateElement"
                  >
                </div>
                <div class="col">
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    placeholder="Height"
                    v-model.number="selectedElement.height"
                    @input="updateElement"
                  >
                </div>
              </div>
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Text Content</label>
              <textarea 
                class="form-control form-control-sm" 
                rows="3"
                v-model="selectedElement.content"
                @input="updateElement"
              ></textarea>
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Font Size</label>
              <input 
                type="number" 
                class="form-control form-control-sm" 
                v-model.number="selectedElement.fontSize"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Font Weight</label>
              <select 
                class="form-select form-select-sm"
                v-model="selectedElement.fontWeight"
                @change="updateElement"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Light</option>
              </select>
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Color</label>
              <input 
                type="color" 
                class="form-control form-control-color form-control-sm" 
                v-model="selectedElement.color"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Text Direction</label>
              <select 
                class="form-select form-select-sm"
                v-model="selectedElement.textDirection"
                @change="updateElement"
              >
                <option value="ltr">Left to Right (LTR)</option>
                <option value="rtl">Right to Left (RTL)</option>
              </select>
            </div>

            <div v-if="selectedElement.type === 'text' || selectedElement.type === 'formatted-text'" class="mb-3">
              <label class="form-label">Font Family</label>
              <select 
                class="form-select form-select-sm"
                v-model="selectedElement.fontFamily"
                @change="updateElement"
              >
                <option value="inherit">Default</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Helvetica Neue', sans-serif">Helvetica</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="Lato, sans-serif">Lato</option>
                <option value="Montserrat, sans-serif">Montserrat</option>
                <option value="Tahoma, sans-serif">Tahoma</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="'Segoe UI', sans-serif">Segoe UI</option>
                <optgroup label="Arabic Fonts">
                  <option value="Tajawal, sans-serif">Tajawal</option>
                  <option value="Cairo, sans-serif">Cairo</option>
                  <option value="'Noto Sans Arabic', sans-serif">Noto Sans Arabic</option>
                  <option value="'IBM Plex Sans Arabic', sans-serif">IBM Plex Sans Arabic</option>
                  <option value="Amiri, serif">Amiri</option>
                </optgroup>
              </select>
            </div>

            <div v-if="selectedElement.type === 'image'" class="mb-3">
              <label class="form-label">Image</label>
              <input 
                type="file" 
                class="form-control form-control-sm" 
                accept="image/*"
                @change="handleImageUpload"
              >
            </div>

            <div v-if="selectedElement.type === 'line'" class="mb-3">
              <label class="form-label">Line Color</label>
              <input 
                type="color" 
                class="form-control form-control-color form-control-sm" 
                v-model="selectedElement.strokeColor"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'line'" class="mb-3">
              <label class="form-label">Line Width</label>
              <input 
                type="number" 
                class="form-control form-control-sm" 
                min="1"
                v-model.number="selectedElement.strokeWidth"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'line'" class="mb-3">
              <label class="form-label">Line Style</label>
              <select 
                class="form-select form-select-sm"
                v-model="selectedElement.strokeStyle"
                @change="updateElement"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>

            <div v-if="selectedElement.type === 'rect' || selectedElement.type === 'circle'" class="mb-3">
              <label class="form-label">Fill Color</label>
              <input 
                type="color" 
                class="form-control form-control-color form-control-sm" 
                v-model="selectedElement.fillColor"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'rect' || selectedElement.type === 'circle'" class="mb-3">
              <label class="form-label">Border Color</label>
              <input 
                type="color" 
                class="form-control form-control-color form-control-sm" 
                v-model="selectedElement.strokeColor"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'rect' || selectedElement.type === 'circle'" class="mb-3">
              <label class="form-label">Border Width</label>
              <input 
                type="number" 
                class="form-control form-control-sm" 
                min="0"
                v-model.number="selectedElement.strokeWidth"
                @input="updateElement"
              >
            </div>

            <div v-if="selectedElement.type === 'rect' || selectedElement.type === 'circle'" class="mb-3">
              <label class="form-label">Border Style</label>
              <select 
                class="form-select form-select-sm"
                v-model="selectedElement.strokeStyle"
                @change="updateElement"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>

            <!-- Table Properties -->
            <div v-if="selectedElement.type === 'table'">
              <h6 class="mb-3">Table Structure</h6>
              
              <div class="mb-3">
                <label class="form-label">Rows: {{ selectedElement.rows }}</label>
                <div class="btn-group w-100" role="group">
                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    @click="removeTableRow"
                    :disabled="selectedElement.rows <= 1"
                  >
                    <i class="bi bi-dash"></i> Remove Row
                  </button>
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="addTableRow"
                  >
                    <i class="bi bi-plus"></i> Add Row
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Columns: {{ selectedElement.cols }}</label>
                <div class="btn-group w-100" role="group">
                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    @click="removeTableColumn"
                    :disabled="selectedElement.cols <= 1"
                  >
                    <i class="bi bi-dash"></i> Remove Column
                  </button>
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="addTableColumn"
                  >
                    <i class="bi bi-plus"></i> Add Column
                  </button>
                </div>
              </div>

              <h6 class="mb-3">Table Styling</h6>
              
              <div class="mb-3">
                <label class="form-label">Border Color</label>
                <input 
                  type="color" 
                  class="form-control form-control-color form-control-sm" 
                  v-model="selectedElement.borderColor"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Border Width</label>
                <input 
                  type="number" 
                  class="form-control form-control-sm" 
                  min="0"
                  v-model.number="selectedElement.borderWidth"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Border Style</label>
                <select 
                  class="form-select form-select-sm"
                  v-model="selectedElement.borderStyle"
                  @change="updateElement"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Cell Padding</label>
                <input 
                  type="number" 
                  class="form-control form-control-sm" 
                  min="0"
                  v-model.number="selectedElement.cellPadding"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Background Color</label>
                <input 
                  type="color" 
                  class="form-control form-control-color form-control-sm" 
                  v-model="selectedElement.backgroundColor"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Text Color</label>
                <input 
                  type="color" 
                  class="form-control form-control-color form-control-sm" 
                  v-model="selectedElement.textColor"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Font Size</label>
                <input 
                  type="number" 
                  class="form-control form-control-sm" 
                  min="8"
                  max="72"
                  v-model.number="selectedElement.fontSize"
                  @input="updateElement"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Text Alignment</label>
                <select 
                  class="form-select form-select-sm"
                  v-model="selectedElement.textAlign"
                  @change="updateElement"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Text Direction</label>
                <select 
                  class="form-select form-select-sm"
                  v-model="selectedElement.textDirection"
                  @change="updateElement"
                >
                  <option value="ltr">Left to Right (LTR)</option>
                  <option value="rtl">Right to Left (RTL)</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Font Family</label>
                <select 
                  class="form-select form-select-sm"
                  v-model="selectedElement.fontFamily"
                  @change="updateElement"
                >
                  <option value="inherit">Default</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Helvetica Neue', sans-serif">Helvetica</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="Lato, sans-serif">Lato</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                  <option value="Tahoma, sans-serif">Tahoma</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="'Segoe UI', sans-serif">Segoe UI</option>
                  <optgroup label="Arabic Fonts">
                    <option value="Tajawal, sans-serif">Tajawal</option>
                    <option value="Cairo, sans-serif">Cairo</option>
                    <option value="'Noto Sans Arabic', sans-serif">Noto Sans Arabic</option>
                    <option value="'IBM Plex Sans Arabic', sans-serif">IBM Plex Sans Arabic</option>
                    <option value="Amiri, serif">Amiri</option>
                  </optgroup>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Vertical Alignment</label>
                <select 
                  class="form-select form-select-sm"
                  v-model="selectedElement.verticalAlign"
                  @change="updateElement"
                >
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>

              <h6 class="mb-3">Table Data & Cell Merge</h6>
              
              <div class="table-editor mb-3">
                <div 
                  v-for="(row, rowIndex) in selectedElement.data" 
                  :key="rowIndex"
                  class="table-row mb-1"
                >
                  <div class="d-flex gap-1">
                    <div
                      v-for="(_, colIndex) in row"
                      :key="colIndex"
                      v-show="!isCellHidden(rowIndex, colIndex)"
                      class="cell-container"
                      :class="{
                        'selected-cell': selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex,
                        'merged-cell': isCellMerged(rowIndex, colIndex)
                      }"
                      @click="selectCell(rowIndex, colIndex)"
                    >
                      <input
                        type="text"
                        class="form-control form-control-sm cell-input"
                        v-model="selectedElement.data[rowIndex][colIndex]"
                        @input="updateElement"
                        @click.stop
                        :placeholder="`R${rowIndex + 1}C${colIndex + 1}`"
                        :style="{
                          gridColumn: `span ${getCellColspan(rowIndex, colIndex)}`,
                          gridRow: `span ${getCellRowspan(rowIndex, colIndex)}`
                        }"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cell Merge Controls -->
              <div v-if="selectedCell" class="mb-3">
                <div class="alert alert-info py-2">
                  <small><strong>Selected:</strong> Row {{ selectedCell.row + 1 }}, Column {{ selectedCell.col + 1 }}</small>
                </div>
                
                <div class="btn-group w-100 mb-2" role="group">
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="mergeCellRight"
                    :disabled="!canMergeRight()"
                    title="Merge with right cell"
                  >
                    <i class="bi bi-arrow-right"></i> Merge Right
                  </button>
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="mergeCellDown"
                    :disabled="!canMergeDown()"
                    title="Merge with cell below"
                  >
                    <i class="bi bi-arrow-down"></i> Merge Down
                  </button>
                </div>
                
                <div class="btn-group w-100 mb-2" role="group">
                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    @click="unmergeCells"
                    :disabled="!isCellMerged(selectedCell.row, selectedCell.col)"
                    title="Unmerge cell"
                  >
                    <i class="bi bi-scissors"></i> Unmerge
                  </button>
                  <button 
                    class="btn btn-outline-secondary btn-sm"
                    @click="clearSelectedCell"
                    title="Clear selection"
                  >
                    <i class="bi bi-x"></i> Clear Selection
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <div class="btn-group w-100" role="group">
                  <button 
                    class="btn btn-outline-info btn-sm"
                    @click="fillTableWithSampleData"
                  >
                    <i class="bi bi-table"></i> Sample Data
                  </button>
                  <button 
                    class="btn btn-outline-warning btn-sm"
                    @click="clearTableData"
                  >
                    <i class="bi bi-eraser"></i> Clear All
                  </button>
                </div>
              </div>
            </div>

            <button 
              class="btn btn-danger btn-sm w-100" 
              @click="deleteElement"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
          
          <div v-else class="text-center text-muted">
            <i class="bi bi-cursor display-4"></i>
            <p class="mt-2">Select an element to view properties</p>
          </div>
        </div>
      </div>

      <div class="canvas-container" :class="{ 'show-grid': showGrid }">
        <!-- Debug info -->
        <div class="debug-info">
          <div>Elements: {{ elements.length }}</div>
          <div v-if="elements.length > 0">
            Last element: {{ elements[elements.length - 1]?.type }} at ({{ elements[elements.length - 1]?.x }}, {{ elements[elements.length - 1]?.y }})
          </div>
        </div>
        
        <div 
          class="canvas"
          :class="pageSize"
          :style="{ transform: `scale(${zoom})` }"
          @drop="handleDrop"
          @dragover.prevent
          @click="selectElement(null)"
        >
          <draggable-element
            v-for="element in elements"
            :key="element.id"
            :element="element"
            :selected="selectedElement?.id === element.id"
            @select="selectElement"
            @update="updateElement"
            @delete="deleteElementById"
            @cell-select="handleCellSelect"
          />
          
          <!-- Debug element list -->
          <div v-if="elements.length === 0" class="no-elements-message">
            No elements on canvas. Try dragging from Elements or Data tabs.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DraggableElement from './DraggableElement.vue'
import DataSourcePanel from './DataSourcePanel.vue'

const props = defineProps({
  placeholders: {
    type: Array,
    default: () => []
  },
  loadTemplate: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['template-updated'])

const elements = ref([])
const selectedElement = ref(null)
const zoom = ref(1)
const showGrid = ref(true)
const pageSize = ref('a4')
const sidebarTab = ref('elements')
const selectedCell = ref(null)

let elementIdCounter = 1

// Function to emit template updates
const emitTemplateUpdate = () => {
  emit('template-updated', {
    elements: elements.value,
    pageSize: pageSize.value
  })
}

// Function to load template data
const loadTemplateData = (template) => {
  console.log('Loading template data:', template)
  console.log('Template elements:', template.elements)
  
  if (template.elements && template.elements.length > 0) {
    elements.value = JSON.parse(JSON.stringify(template.elements))
    pageSize.value = template.pageSize || 'a4'
    selectedElement.value = null
    selectedCell.value = null
    elementIdCounter = Math.max(...elements.value.map(el => el.id), 0) + 1
    
    console.log('Elements loaded:', elements.value.length)
    emitTemplateUpdate()
  } else {
    console.log('No elements in template or template is empty')
  }
}

// Watch for loadTemplate prop changes
watch(() => props.loadTemplate, (newTemplate) => {
  console.log('Template prop changed:', newTemplate)
  if (newTemplate) {
    loadTemplateData(newTemplate)
  }
}, { deep: true, immediate: true })


    const addElement = (type) => {
      console.log('addElement called with type:', type)
      
      const baseElement = {
        id: elementIdCounter++,
        type,
        x: 50,
        y: 50
      }

      let newElement
      
      switch (type) {
        case 'text':
          newElement = {
            ...baseElement,
            width: 200,
            height: 40,
            content: 'Sample Text',
            fontSize: 16,
            color: '#000000',
            fontWeight: 'normal',
            textDirection: 'ltr',
            fontFamily: 'inherit'
          }
          break
          
        case 'image':
          newElement = {
            ...baseElement,
            width: 150,
            height: 100,
            src: 'https://via.placeholder.com/150x100'
          }
          break
          
        case 'line':
          newElement = {
            ...baseElement,
            width: 150,
            height: 2,
            strokeColor: '#000000',
            strokeWidth: 2,
            strokeStyle: 'solid'
          }
          break
          
        case 'rect':
          newElement = {
            ...baseElement,
            width: 150,
            height: 100,
            fillColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 1,
            strokeStyle: 'solid'
          }
          break
          
        case 'circle':
          newElement = {
            ...baseElement,
            width: 100,
            height: 100,
            fillColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 1,
            strokeStyle: 'solid'
          }
          break
          
        case 'table':
          newElement = {
            ...baseElement,
            width: 300,
            height: 150,
            rows: 3,
            cols: 3,
            cellPadding: 5,
            borderColor: '#000000',
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: '#ffffff',
            textColor: '#000000',
            fontSize: 12,
            textAlign: 'left',
            verticalAlign: 'top',
            textDirection: 'ltr',
            fontFamily: 'inherit',
            data: Array(3).fill().map(() => Array(3).fill('Cell')),
            mergedCells: {} // Format: 'row,col': { colspan: 2, rowspan: 1 }
          }
          break
          
        default:
          newElement = {
            ...baseElement,
            width: 150,
            height: 40,
            content: 'Element',
            fontSize: 14,
            color: '#000000'
          }
      }
      
      console.log('Adding new element from addElement:', newElement)
      elements.value.push(newElement)
      selectElement(newElement)
      emitTemplateUpdate()
    }

    const addDataElement = (elementData) => {
      console.log('addDataElement called with:', elementData)
      
      const newElement = {
        id: elementIdCounter++,
        x: 50 + (elements.value.length * 20),
        y: 50 + (elements.value.length * 20),
        width: elementData.type === 'image' ? 150 : 200,
        height: elementData.type === 'image' ? 100 : 40,
        ...elementData
      }
      
      console.log('Adding new element:', newElement)
      elements.value.push(newElement)
      selectElement(newElement)
      sidebarTab.value = 'properties'
      emitTemplateUpdate()
    }

    const setSidebarTab = (tab) => {
      console.log('Setting sidebar tab to:', tab)
      sidebarTab.value = tab
    }

    const testAddElement = () => {
      console.log('Test add element clicked')
      const testElement = {
        id: elementIdCounter++,
        type: 'text',
        x: 100,
        y: 100,
        width: 200,
        height: 40,
        content: 'Test Element - ' + new Date().toLocaleTimeString(),
        fontSize: 16,
        color: '#007bff',
        fontWeight: 'bold'
      }
      console.log('Adding test element:', testElement)
      elements.value.push(testElement)
      selectElement(testElement)
      emitTemplateUpdate()
    }

    const selectElement = (element) => {
      selectedElement.value = element
      if (element?.type !== 'table') {
        selectedCell.value = null
      }
    }

    const handleCellSelect = (row, col) => {
      selectedCell.value = { row, col }
      sidebarTab.value = 'properties'
    }

    const updateElement = () => {
      emitTemplateUpdate()
    }

    const deleteElement = () => {
      if (selectedElement.value) {
        deleteElementById(selectedElement.value.id)
      }
    }

    const deleteElementById = (id) => {
      const index = elements.value.findIndex(el => el.id === id)
      if (index > -1) {
        elements.value.splice(index, 1)
        if (selectedElement.value?.id === id) {
          selectedElement.value = null
        }
        emitTemplateUpdate()
      }
    }

    const zoomIn = () => {
      zoom.value = Math.min(zoom.value + 0.1, 2)
    }

    const zoomOut = () => {
      zoom.value = Math.max(zoom.value - 0.1, 0.1)
    }


    const handleElementDragStart = (event, elementData) => {
      console.log('Element drag start:', elementData)
      event.dataTransfer.setData('application/json', JSON.stringify(elementData))
    }

    const addElementFromData = (elementData) => {
      console.log('Adding element from data:', elementData)
      addDataElement(elementData)
    }

    const handleDrop = (event) => {
      event.preventDefault()
      
      // Try to get JSON data first (from data source panel)
      let droppedData
      try {
        const jsonData = event.dataTransfer.getData('application/json')
        if (jsonData) {
          droppedData = JSON.parse(jsonData)
        }
      } catch (e) {
        // If JSON parsing fails, try plain text
        const plainText = event.dataTransfer.getData('text/plain')
        if (plainText) {
          droppedData = { type: plainText }
        }
      }
      
      if (droppedData) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / zoom.value
        const y = (event.clientY - rect.top) / zoom.value
        
        // Create element based on dropped data
        const elementData = {
          ...droppedData,
          id: elementIdCounter++,
          x: Math.max(0, x - 50),
          y: Math.max(0, y - 25)
        }
        
        // Set default dimensions if not provided
        if (!elementData.width) {
          elementData.width = elementData.type === 'image' ? 150 : 200
        }
        if (!elementData.height) {
          elementData.height = elementData.type === 'image' ? 100 : 40
        }
        
        // Create the element using addDataElement which handles all types
        const newElement = createElementFromData(elementData)
        elements.value.push(newElement)
        selectElement(newElement)
        sidebarTab.value = 'properties'
        emitTemplateUpdate()
      }
    }

    const createElementFromData = (data) => {
      const baseElement = {
        id: data.id,
        x: data.x,
        y: data.y,
        width: data.width,
        height: data.height
      }

      switch (data.type) {
        case 'placeholder':
        case 'text':
          return {
            ...baseElement,
            type: 'text',
            content: data.content || 'Sample Text',
            fontSize: data.fontSize || 14,
            color: data.color || '#000000',
            fontWeight: data.fontWeight || 'normal',
            textDirection: data.textDirection || 'ltr',
            fontFamily: data.fontFamily || 'inherit'
          }

        case 'formatted-text':
          return {
            ...baseElement,
            type: 'formatted-text',
            content: data.content || 'Formatted Text',
            format: data.format || 'p',
            fontSize: data.fontSize || getFormattedTextSize(data.format),
            color: data.color || '#000000',
            fontWeight: data.fontWeight || (['h1', 'h2', 'h3', 'h4', 'h5', 'bold'].includes(data.format) ? 'bold' : 'normal'),
            fontStyle: data.format === 'italic' ? 'italic' : 'normal',
            textDecoration: data.format === 'underline' ? 'underline' : 'none',
            textDirection: data.textDirection || 'ltr',
            fontFamily: data.fontFamily || 'inherit'
          }

        case 'image':
        case 'image-placeholder':
          return {
            ...baseElement,
            type: 'image',
            src: data.content && data.content.startsWith('{{') ? null : (data.src || 'https://via.placeholder.com/150x100'),
            placeholder: data.content && data.content.startsWith('{{') ? data.content : null
          }

        case 'line':
          return {
            ...baseElement,
            type: 'line',
            strokeColor: '#000000',
            strokeWidth: 2,
            strokeStyle: 'solid'
          }

        case 'rect':
          return {
            ...baseElement,
            type: 'rect',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 1,
            strokeStyle: 'solid'
          }

        case 'circle':
          return {
            ...baseElement,
            type: 'circle',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 1,
            strokeStyle: 'solid'
          }

        case 'table':
          return {
            ...baseElement,
            type: 'table',
            rows: 3,
            cols: 3,
            cellPadding: 5,
            borderColor: '#000000',
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: '#ffffff',
            textColor: '#000000',
            fontSize: 12,
            textAlign: 'left',
            verticalAlign: 'top',
            textDirection: 'ltr',
            fontFamily: 'inherit',
            data: Array(3).fill().map(() => Array(3).fill('Cell')),
            mergedCells: {}
          }

        default:
          return {
            ...baseElement,
            type: 'text',
            content: data.content || 'Element',
            fontSize: 14,
            color: '#000000',
            textDirection: 'ltr',
            fontFamily: 'inherit'
          }
      }
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

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          // If an image element is selected, update it
          if (selectedElement.value && selectedElement.value.type === 'image') {
            selectedElement.value.src = e.target.result
            updateElement()
          } else {
            // Create a new image element
            const newElement = {
              id: elementIdCounter++,
              type: 'image',
              x: 50 + (elements.value.length * 20),
              y: 50 + (elements.value.length * 20),
              width: 150,
              height: 100,
              src: e.target.result
            }
            
            elements.value.push(newElement)
            selectElement(newElement)
            sidebarTab.value = 'properties'
            emitTemplateUpdate()
          }
        }
        reader.readAsDataURL(file)
        
        // Clear the input value so the same file can be uploaded again
        event.target.value = ''
      }
    }


    const loadTemplate = (template) => {
      elements.value = template.elements || []
      pageSize.value = template.pageSize || 'a4'
      selectedElement.value = null
      elementIdCounter = Math.max(...elements.value.map(el => el.id), 0) + 1
    }



    const getTemplate = () => {
      return {
        elements: elements.value,
        pageSize: pageSize.value
      }
    }

    // Table manipulation functions
    const addTableRow = () => {
      if (selectedElement.value && selectedElement.value.type === 'table') {
        const newRow = Array(selectedElement.value.cols).fill('Cell')
        selectedElement.value.data.push(newRow)
        selectedElement.value.rows = selectedElement.value.data.length
        updateElement()
      }
    }

    const removeTableRow = () => {
      if (selectedElement.value && selectedElement.value.type === 'table' && selectedElement.value.rows > 1) {
        selectedElement.value.data.pop()
        selectedElement.value.rows = selectedElement.value.data.length
        updateElement()
      }
    }

    const addTableColumn = () => {
      if (selectedElement.value && selectedElement.value.type === 'table') {
        selectedElement.value.data.forEach(row => {
          row.push('Cell')
        })
        selectedElement.value.cols = selectedElement.value.data[0].length
        updateElement()
      }
    }

    const removeTableColumn = () => {
      if (selectedElement.value && selectedElement.value.type === 'table' && selectedElement.value.cols > 1) {
        selectedElement.value.data.forEach(row => {
          row.pop()
        })
        selectedElement.value.cols = selectedElement.value.data[0].length
        updateElement()
      }
    }

    const fillTableWithSampleData = () => {
      if (selectedElement.value && selectedElement.value.type === 'table') {
        const sampleData = [
          ['Name', 'Position', 'Department', 'Salary'],
          ['John Doe', 'Software Engineer', 'Engineering', '$95,000'],
          ['Jane Smith', 'Marketing Manager', 'Marketing', '$75,000'],
          ['Mike Johnson', 'Sales Rep', 'Sales', '$65,000']
        ]
        
        // Adjust table size if needed
        const newRows = Math.max(selectedElement.value.rows, sampleData.length)
        const newCols = Math.max(selectedElement.value.cols, sampleData[0].length)
        
        // Create new data array with proper dimensions
        const newData = Array(newRows).fill().map((_, rowIndex) => 
          Array(newCols).fill().map((_, colIndex) => {
            if (sampleData[rowIndex] && sampleData[rowIndex][colIndex]) {
              return sampleData[rowIndex][colIndex]
            }
            return `R${rowIndex + 1}C${colIndex + 1}`
          })
        )
        
        selectedElement.value.data = newData
        selectedElement.value.rows = newRows
        selectedElement.value.cols = newCols
        updateElement()
      }
    }

    const clearTableData = () => {
      if (selectedElement.value && selectedElement.value.type === 'table') {
        selectedElement.value.data = selectedElement.value.data.map((row, rowIndex) =>
          row.map((_, colIndex) => `R${rowIndex + 1}C${colIndex + 1}`)
        )
        updateElement()
      }
    }

    // Cell merge functions
    const selectCell = (row, col) => {
      selectedCell.value = { row, col }
    }

    const clearSelectedCell = () => {
      selectedCell.value = null
    }

    const isCellMerged = (row, col) => {
      if (!selectedElement.value || !selectedElement.value.mergedCells) return false
      const key = `${row},${col}`
      return selectedElement.value.mergedCells[key] && 
             (selectedElement.value.mergedCells[key].colspan > 1 || selectedElement.value.mergedCells[key].rowspan > 1)
    }

    const isCellHidden = (row, col) => {
      if (!selectedElement.value || !selectedElement.value.mergedCells) return false
      
      // Check if this cell is covered by another merged cell
      for (const [mergedKey, mergeData] of Object.entries(selectedElement.value.mergedCells)) {
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
      if (!selectedElement.value || !selectedElement.value.mergedCells) return 1
      const key = `${row},${col}`
      return selectedElement.value.mergedCells[key]?.colspan || 1
    }

    const getCellRowspan = (row, col) => {
      if (!selectedElement.value || !selectedElement.value.mergedCells) return 1
      const key = `${row},${col}`
      return selectedElement.value.mergedCells[key]?.rowspan || 1
    }

    const canMergeRight = () => {
      if (!selectedCell.value || !selectedElement.value) return false
      const { row, col } = selectedCell.value
      const nextCol = col + getCellColspan(row, col)
      return nextCol < selectedElement.value.cols && !isCellMerged(row, nextCol) && !isCellHidden(row, nextCol)
    }

    const canMergeDown = () => {
      if (!selectedCell.value || !selectedElement.value) return false
      const { row, col } = selectedCell.value
      const nextRow = row + getCellRowspan(row, col)
      return nextRow < selectedElement.value.rows && !isCellMerged(nextRow, col) && !isCellHidden(nextRow, col)
    }

    const mergeCellRight = () => {
      if (!canMergeRight()) return
      
      // Ensure mergedCells object exists
      if (!selectedElement.value.mergedCells) {
        selectedElement.value.mergedCells = {}
      }
      
      const { row, col } = selectedCell.value
      const key = `${row},${col}`
      
      if (!selectedElement.value.mergedCells[key]) {
        selectedElement.value.mergedCells[key] = { colspan: 1, rowspan: 1 }
      }
      
      selectedElement.value.mergedCells[key].colspan += 1
      updateElement()
    }

    const mergeCellDown = () => {
      if (!canMergeDown()) return
      
      // Ensure mergedCells object exists
      if (!selectedElement.value.mergedCells) {
        selectedElement.value.mergedCells = {}
      }
      
      const { row, col } = selectedCell.value
      const key = `${row},${col}`
      
      if (!selectedElement.value.mergedCells[key]) {
        selectedElement.value.mergedCells[key] = { colspan: 1, rowspan: 1 }
      }
      
      selectedElement.value.mergedCells[key].rowspan += 1
      updateElement()
    }

    const unmergeCells = () => {
      if (!selectedCell.value || !selectedElement.value || !selectedElement.value.mergedCells) return
      
      const { row, col } = selectedCell.value
      const key = `${row},${col}`
      
      if (selectedElement.value.mergedCells[key]) {
        delete selectedElement.value.mergedCells[key]
        updateElement()
      }
    }

// Expose methods to parent components
defineExpose({
  loadTemplate,
  getTemplate
})
</script>

<style scoped>
.cell-container {
  position: relative;
  min-height: 32px;
  cursor: pointer;
}

.selected-cell {
  background-color: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 3px;
}

.merged-cell {
  background-color: #f3e5f5;
  border: 1px solid #9c27b0;
}

.hidden-cell {
  display: none;
}

.cell-input {
  border: 1px solid #dee2e6;
}

.cell-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.table-editor .cell-container:hover {
  background-color: #f8f9fa;
}

.table-editor .selected-cell:hover {
  background-color: #e3f2fd;
}

</style>