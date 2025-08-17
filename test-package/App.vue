<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-file-earmark-text me-2"></i>
          Print Template Designer
        </a>
        
        <div class="navbar-nav ms-auto">
          <div class="nav-item dropdown me-2">
            <button
              class="btn btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-folder2-open me-2"></i>
              Templates
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item" @click="saveCurrentTemplate">
                  <i class="bi bi-floppy me-2"></i>Save Template
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="exportAsHTML">
                  <i class="bi bi-file-earmark-code me-2"></i>Export HTML
                </button>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li v-if="templates.length === 0" class="dropdown-item-text text-muted">
                No saved templates
              </li>
              <li v-for="template in templates" :key="template.id">
                <div class="dropdown-item d-flex justify-content-between align-items-center">
                  <span 
                    class="flex-grow-1 cursor-pointer"
                    @click="loadSavedTemplate(template.id)"
                    style="cursor: pointer;"
                  >
                    {{ template.name }}
                  </span>
                  <button 
                    class="btn btn-sm btn-outline-danger"
                    @click.stop="deleteTemplate(template.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="nav-item">
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn"
                :class="currentView === 'designer' ? 'btn-light' : 'btn-outline-light'"
                @click="setView('designer')"
              >
                <i class="bi bi-pencil-square me-1"></i>Design
              </button>
              <button
                type="button"
                class="btn"
                :class="currentView === 'viewer' ? 'btn-light' : 'btn-outline-light'"
                @click="setView('viewer')"
              >
                <i class="bi bi-eye me-1"></i>Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <ptd-designer
        v-if="currentView === 'designer'"
        ref="designerRef"
        :placeholders="placeholders"
        :load-template="templateToLoad"
        @template-updated="handleTemplateUpdate"
      />
      
      <ptd-viewer
        v-else-if="currentView === 'viewer'"
        :template="currentTemplate"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PtdDesigner, PtdViewer, useTemplateManager, generateHTMLContent, downloadHTML } from 'vue3-print-template-designer'

const designerRef = ref(null)
const currentView = ref('designer')
const currentTemplate = ref(null)
const templateToLoad = ref({
  elements: [
   
  {
    "id": 1,
    "type": "rect",
    "x": 135,
    "y": 191,
    "width": 350,
    "height": 80,
    "fillColor": "transparent",
    "strokeColor": "#007bff",
    "strokeWidth": 2,
    "strokeStyle": "dashed"
  },
  {
    "id": 2,
    "type": "line",
    "x": 282,
    "y": 105,
    "width": 330,
    "height": 2,
    "strokeColor": "#28a745",
    "strokeWidth": 1,
    "strokeStyle": "dotted"
  },
  {
    "id": 3,
    "type": "image",
    "x": 90,
    "y": 4,
    "width": 150,
    "height": 100,
    "src": "data:image/png;base64,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ADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAYRAAAAMAgAgAAAAYRAAAAMIgAAACAQQQAAAAMIgAAAGAQAQAAAIMIAAAAGEQAAADAIAIAAAAGEQAAADCIAAAAgEEEAAAADCIAAABgEAEAAACDCAAAABhEAAAAwCACAAAABhEAAAAwiAAAAIBBBAAAAAwiAAAAYBABAAAAgwgAAAAY9P8BqkxhbETFajgAAAAASUVORK5CYII="
  }
 
    ],
    pageSize: 'a4'
})

const {
  templates,
  saveTemplate,
  loadTemplate,
  deleteTemplate: deleteTemplateById,
  initializeTemplates
} = useTemplateManager()

onMounted(() => {
  initializeTemplates()
})

const setView = (view) => {
  currentView.value = view
}

const handleTemplateUpdate = (template) => {
  currentTemplate.value = template
}


const saveCurrentTemplate = () => {
  console.log('Save template clicked')
  if (designerRef.value) {
    console.log('Designer ref exists')
    const template = designerRef.value.getTemplate()
    console.log('Template data:', template)
    
    if (template.elements.length === 0) {
      alert('Cannot save empty template. Add some elements first.')
      return
    }
    
    const name = prompt('Enter template name:', `Template ${templates.value.length + 1}`)
    if (name && name.trim()) {
      saveTemplate(template, name.trim())
      alert(`Template "${name}" has been saved!`)
    }
  } else {
    console.log('Designer ref is null')
  }
}

const loadSavedTemplate = (templateId) => {
  const template = loadTemplate(templateId)
  if (template) {
    // Pass the template to the designer component
    templateToLoad.value = template
    currentTemplate.value = template
    setView('designer')
    
    // Clear the templateToLoad after a short delay to allow the component to process it
    setTimeout(() => {
      templateToLoad.value = null
    }, 100)
  }
}

// Function to load any template into the designer
const setTemplateToLoad = (template) => {
  templateToLoad.value = template
  setView('designer')
  
  // Clear after processing
  setTimeout(() => {
    templateToLoad.value = null
  }, 100)
}

const deleteTemplate = (templateId) => {
  if (confirm('Are you sure you want to delete this template?')) {
    deleteTemplateById(templateId)
  }
}

const exportAsHTML = () => {
  console.log('Export HTML clicked')
  if (designerRef.value) {
    const template = designerRef.value.getTemplate()
    console.log('Template data for HTML export:', template)
    
    if (template.elements.length === 0) {
      alert('Cannot export empty template. Add some elements first.')
      return
    }
    
    const htmlContent = generateHTMLContent(template)
    const success = downloadHTML(htmlContent)
    
    if (success) {
      alert('HTML file downloaded! Open it in any browser to view and print.')
    }
  } else {
    console.log('Designer ref is null')
  }
}



const placeholders = ref([
  {
    name: '👨‍💼 Staff Details',
    items: [
      { type: 'placeholder', content: '{employee_name}', icon: '👤', label: 'Employee Name' },
      { type: 'placeholder', content: '{employee_id}', icon: '🆔', label: 'Employee ID' },
      { type: 'placeholder', content: '{position}', icon: '💼', label: 'Position' },
      { type: 'placeholder', content: '{department}', icon: '🏢', label: 'Department' },
      { type: 'placeholder', content: '{start_date}', icon: '📅', label: 'Start Date' },
      { type: 'placeholder', content: '{email}', icon: '📧', label: 'Email' },
      { type: 'placeholder', content: '{phone}', icon: '📞', label: 'Phone' },
      { type: 'placeholder', content: '{address}', icon: '🏠', label: 'Address' }
    ]
  },
  {
    name: '💸 Compensation Package',
    items: [
      { type: 'placeholder', content: '{salary}', icon: '💰', label: 'Salary' },
      { type: 'placeholder', content: '{hourly_rate}', icon: '⏰', label: 'Hourly Rate' },
      { type: 'placeholder', content: '{bonus}', icon: '🎁', label: 'Bonus' },
      { type: 'placeholder', content: '{benefits}', icon: '🏥', label: 'Benefits' },
      { type: 'placeholder', content: '{vacation_days}', icon: '🌴', label: 'Vacation Days' },
      { type: 'placeholder', content: '{sick_days}', icon: '🏥', label: 'Sick Days' }
    ]
  },
  {
    name: '🏭 Organization Info',
    items: [
      { type: 'placeholder', content: '{company_name}', icon: '🏢', label: 'Company Name' },
      { type: 'placeholder', content: '{company_address}', icon: '📍', label: 'Company Address' },
      { type: 'placeholder', content: '{hr_contact}', icon: '👥', label: 'HR Contact' },
      { type: 'placeholder', content: '{manager_name}', icon: '👨‍💼', label: 'Manager Name' },
      { type: 'placeholder', content: '{company_phone}', icon: '📞', label: 'Company Phone' },
      { type: 'placeholder', content: '{company_email}', icon: '📧', label: 'Company Email' }
    ]
  },
  {
    name: '📊 Performance Metrics',
    items: [
      { type: 'placeholder', content: '{review_date}', icon: '📅', label: 'Review Date' },
      { type: 'placeholder', content: '{next_review}', icon: '⏭️', label: 'Next Review' },
      { type: 'placeholder', content: '{performance_rating}', icon: '⭐', label: 'Performance Rating' },
      { type: 'placeholder', content: '{goals}', icon: '🎯', label: 'Goals' },
      { type: 'placeholder', content: '{training_completed}', icon: '🎓', label: 'Training Completed' },
      { type: 'placeholder', content: '{certifications}', icon: '📜', label: 'Certifications' }
    ]
  },
  {
    name: '🖼️ Media Assets',
    items: [
      { type: 'image-placeholder', content: '{{employee_image}}', icon: '👤', label: '{{employee_image}}' },
      { type: 'image-placeholder', content: '{{company_logo}}', icon: '🏢', label: '{{company_logo}}' },
      { type: 'image-placeholder', content: '{{signature_image}}', icon: '✍️', label: '{{signature_image}}' },
      { type: 'image', content: 'upload', icon: '📁', label: 'Upload Image' },
      { type: 'image', content: 'url', icon: '🌐', label: 'Image from URL' }
    ]
  },
  {
    name: '⚡ Quick Labels',
    items: [
      { type: 'text', content: 'EMPLOYEE RECORD', icon: '📄', label: '"EMPLOYEE RECORD" Title' },
      { type: 'text', content: 'PERFORMANCE REVIEW', icon: '📋', label: '"PERFORMANCE REVIEW" Title' },
      { type: 'text', content: 'JOB OFFER LETTER', icon: '💼', label: '"JOB OFFER LETTER" Title' },
      { type: 'text', content: 'EMPLOYEE HANDBOOK', icon: '📚', label: '"EMPLOYEE HANDBOOK" Title' },
      { type: 'text', content: 'Employee Details:', icon: '👤', label: '"Employee Details:" Label' },
      { type: 'text', content: 'Department:', icon: '🏢', label: '"Department:" Label' },
      { type: 'text', content: 'Salary:', icon: '💰', label: '"Salary:" Label' },
      { type: 'text', content: 'HR Manager:', icon: '👥', label: '"HR Manager:" Label' },
      { type: 'text', content: 'Date:', icon: '📅', label: '"Date:" Label' },
      { type: 'text', content: 'Signature:', icon: '✍️', label: '"Signature:" Label' }
    ]
  }
])
</script>

<style>
#app {
  min-height: 100vh;
}

main {
  height: calc(100vh - 56px);
}

.dropdown-menu {
  max-height: 400px;
  overflow-y: auto;
}

.navbar-brand {
  font-weight: 600;
}
</style>