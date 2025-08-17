import { ref, reactive } from 'vue'

export function useTemplateManager() {
  const templates = ref([])
  const currentTemplate = ref(null)

  const saveTemplate = (template, name = null) => {
    const templateName = name || `Template ${templates.value.length + 1}`
    const timestamp = new Date().toISOString()
    
    const savedTemplate = {
      id: Date.now().toString(),
      name: templateName,
      template: JSON.parse(JSON.stringify(template)),
      createdAt: timestamp,
      updatedAt: timestamp
    }

    templates.value.push(savedTemplate)
    currentTemplate.value = savedTemplate
    
    saveToLocalStorage()
    return savedTemplate
  }

  const loadTemplate = (templateId) => {
    const template = templates.value.find(t => t.id === templateId)
    if (template) {
      currentTemplate.value = template
      return template.template
    }
    return null
  }

  const updateTemplate = (templateId, updatedTemplate) => {
    const index = templates.value.findIndex(t => t.id === templateId)
    if (index > -1) {
      templates.value[index].template = JSON.parse(JSON.stringify(updatedTemplate))
      templates.value[index].updatedAt = new Date().toISOString()
      saveToLocalStorage()
      return templates.value[index]
    }
    return null
  }

  const deleteTemplate = (templateId) => {
    const index = templates.value.findIndex(t => t.id === templateId)
    if (index > -1) {
      templates.value.splice(index, 1)
      if (currentTemplate.value?.id === templateId) {
        currentTemplate.value = null
      }
      saveToLocalStorage()
      return true
    }
    return false
  }

  const exportTemplate = (templateId) => {
    const template = templates.value.find(t => t.id === templateId)
    if (template) {
      const dataStr = JSON.stringify(template, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(dataBlob)
      link.download = `${template.name.replace(/\s+/g, '_')}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return true
    }
    return false
  }

  const importTemplate = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const templateData = JSON.parse(e.target.result)
          
          if (templateData.template && templateData.name) {
            const importedTemplate = saveTemplate(templateData.template, `${templateData.name} (Imported)`)
            resolve(importedTemplate)
          } else {
            reject(new Error('Invalid template file format'))
          }
        } catch (error) {
          reject(new Error('Failed to parse template file'))
        }
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsText(file)
    })
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('ptd_templates', JSON.stringify(templates.value))
    } catch (error) {
      console.warn('Failed to save templates to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('ptd_templates')
      if (saved) {
        templates.value = JSON.parse(saved)
      }
    } catch (error) {
      console.warn('Failed to load templates from localStorage:', error)
      templates.value = []
    }
  }

  const createSampleTemplates = () => {
    const sampleInvoice = {
      elements: [
        {
          id: 1,
          type: 'text',
          x: 50,
          y: 50,
          width: 200,
          height: 40,
          content: 'INVOICE',
          fontSize: 24,
          color: '#000000',
          fontWeight: 'bold'
        },
        {
          id: 2,
          type: 'text',
          x: 50,
          y: 120,
          width: 150,
          height: 25,
          content: 'Invoice #: 12345',
          fontSize: 14,
          color: '#000000'
        },
        {
          id: 3,
          type: 'text',
          x: 50,
          y: 150,
          width: 150,
          height: 25,
          content: 'Date: 2024-01-15',
          fontSize: 14,
          color: '#000000'
        },
        {
          id: 4,
          type: 'image',
          x: 400,
          y: 50,
          width: 120,
          height: 80,
          content: '',
          src: 'https://via.placeholder.com/120x80/007bff/white?text=LOGO'
        },
        {
          id: 5,
          type: 'rect',
          x: 50,
          y: 200,
          width: 500,
          height: 200,
          fillColor: '#ffffff',
          strokeColor: '#000000',
          strokeWidth: 2,
          strokeStyle: 'solid'
        },
        {
          id: 6,
          type: 'table',
          x: 60,
          y: 220,
          width: 480,
          height: 160,
          rows: 4,
          cols: 4,
          cellPadding: 8,
          borderColor: '#000000',
          borderWidth: 1,
          borderStyle: 'solid',
          backgroundColor: '#ffffff',
          textColor: '#000000',
          fontSize: 12,
          textAlign: 'left',
          verticalAlign: 'top',
          data: [
            ['Item', 'Description', 'Qty', 'Amount'],
            ['Service 1', 'Consulting', '10 hrs', '$1,500'],
            ['Service 2', 'Development', '20 hrs', '$3,000'],
            ['', '', 'Total:', '$4,500']
          ],
          mergedCells: {}
        }
      ],
      pageSize: 'a4'
    }

    const sampleLabel = {
      elements: [
        {
          id: 1,
          type: 'text',
          x: 30,
          y: 30,
          width: 180,
          height: 60,
          content: 'Product Name\nSKU: ABC123',
          fontSize: 16,
          color: '#000000'
        },
        {
          id: 2,
          type: 'image',
          x: 250,
          y: 30,
          width: 100,
          height: 60,
          content: '',
          src: 'https://via.placeholder.com/100x60/28a745/white?text=QR'
        },
        {
          id: 3,
          type: 'rect',
          x: 20,
          y: 20,
          width: 350,
          height: 80,
          fillColor: 'transparent',
          strokeColor: '#007bff',
          strokeWidth: 2,
          strokeStyle: 'dashed'
        },
        {
          id: 4,
          type: 'line',
          x: 30,
          y: 110,
          width: 330,
          height: 2,
          strokeColor: '#28a745',
          strokeWidth: 1,
          strokeStyle: 'dotted'
        }
      ],
      pageSize: 'a4'
    }

    const sampleBusinessCard = {
      elements: [
        {
          id: 1,
          type: 'rect',
          x: 20,
          y: 20,
          width: 340,
          height: 200,
          fillColor: '#f8f9fa',
          strokeColor: '#dee2e6',
          strokeWidth: 1,
          strokeStyle: 'solid'
        },
        {
          id: 2,
          type: 'text',
          x: 40,
          y: 40,
          width: 200,
          height: 30,
          content: 'John Doe',
          fontSize: 20,
          color: '#000000',
          fontWeight: 'bold'
        },
        {
          id: 3,
          type: 'text',
          x: 40,
          y: 75,
          width: 200,
          height: 20,
          content: 'Senior Developer',
          fontSize: 14,
          color: '#6c757d'
        },
        {
          id: 4,
          type: 'line',
          x: 40,
          y: 105,
          width: 300,
          height: 2,
          strokeColor: '#007bff',
          strokeWidth: 2,
          strokeStyle: 'solid'
        },
        {
          id: 5,
          type: 'text',
          x: 40,
          y: 120,
          width: 150,
          height: 80,
          content: 'john@company.com\n+1 (555) 123-4567\nwww.company.com',
          fontSize: 12,
          color: '#000000'
        },
        {
          id: 6,
          type: 'circle',
          x: 270,
          y: 50,
          width: 60,
          height: 60,
          fillColor: '#007bff',
          strokeColor: '#0056b3',
          strokeWidth: 2,
          strokeStyle: 'solid'
        }
      ],
      pageSize: 'a4'
    }

    saveTemplate(sampleInvoice, 'Sample Invoice')
    saveTemplate(sampleLabel, 'Sample Label')
    saveTemplate(sampleBusinessCard, 'Sample Business Card')
  }

  const initializeTemplates = () => {
    loadFromLocalStorage()
    if (templates.value.length === 0) {
      createSampleTemplates()
    }
  }

  return {
    templates,
    currentTemplate,
    saveTemplate,
    loadTemplate,
    updateTemplate,
    deleteTemplate,
    exportTemplate,
    importTemplate,
    initializeTemplates
  }
}