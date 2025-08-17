import { ref, reactive, computed } from 'vue'

export function useDataSource() {
  // Data source management
  const dataSources = ref([])
  const currentDataSource = ref(null)
  const currentDataSet = ref({})

  // Placeholder config
  const customPlaceholders = ref([
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

  // Sample data sets
  const sampleDataSets = ref([
    {
      id: 'employee_001',
      name: 'John Doe - Software Engineer',
      data: {
        employee_name: 'John Doe',
        employee_id: 'EMP001',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        start_date: '2023-01-15',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
        salary: '$95,000',
        hourly_rate: '$45.67',
        bonus: '$5,000',
        benefits: 'Health, Dental, Vision, 401k',
        vacation_days: '15 days',
        sick_days: '10 days',
        company_name: 'TechCorp Solutions',
        company_address: '456 Business Ave, Suite 100, City, State 12345',
        hr_contact: 'Sarah Johnson',
        manager_name: 'Mike Wilson',
        company_phone: '+1 (555) 987-6543',
        company_email: 'hr@techcorp.com',
        review_date: '2024-01-15',
        next_review: '2025-01-15',
        performance_rating: '4.5/5.0',
        goals: 'Lead frontend development, Mentor junior developers',
        training_completed: 'React Advanced, AWS Certification',
        certifications: 'AWS Solutions Architect'
      }
    },
    {
      id: 'employee_002',
      name: 'Jane Smith - Marketing Manager',
      data: {
        employee_name: 'Jane Smith',
        employee_id: 'EMP002',
        position: 'Marketing Manager',
        department: 'Marketing',
        start_date: '2022-03-10',
        email: 'jane.smith@company.com',
        phone: '+1 (555) 234-5678',
        address: '789 Oak Street, City, State 12345',
        salary: '$75,000',
        hourly_rate: '$36.06',
        bonus: '$3,500',
        benefits: 'Health, Dental, Vision, 401k',
        vacation_days: '20 days',
        sick_days: '12 days',
        company_name: 'TechCorp Solutions',
        company_address: '456 Business Ave, Suite 100, City, State 12345',
        hr_contact: 'Sarah Johnson',
        manager_name: 'Lisa Chen',
        company_phone: '+1 (555) 987-6543',
        company_email: 'hr@techcorp.com',
        review_date: '2024-03-10',
        next_review: '2025-03-10',
        performance_rating: '4.2/5.0',
        goals: 'Increase brand awareness, Launch new campaigns',
        training_completed: 'Digital Marketing Certification, Google Analytics',
        certifications: 'Google Ads Certified, HubSpot Certified'
      }
    }
  ])

  // Create data source
  const createDataSource = (name, type = 'manual') => {
    const newDataSource = {
      id: Date.now().toString(),
      name,
      type, // 'manual', 'json', 'csv', 'api'
      fields: [],
      createdAt: new Date().toISOString()
    }

    dataSources.value.push(newDataSource)
    return newDataSource
  }

  // Add field to data source
  const addFieldToDataSource = (dataSourceId, field) => {
    const dataSource = dataSources.value.find(ds => ds.id === dataSourceId)
    if (dataSource) {
      dataSource.fields.push({
        id: Date.now().toString(),
        ...field
      })
    }
  }

  // Update field in data source
  const updateFieldInDataSource = (dataSourceId, fieldId, updates) => {
    const dataSource = dataSources.value.find(ds => ds.id === dataSourceId)
    if (dataSource) {
      const field = dataSource.fields.find(f => f.id === fieldId)
      if (field) {
        Object.assign(field, updates)
      }
    }
  }

  // Remove field from data source
  const removeFieldFromDataSource = (dataSourceId, fieldId) => {
    const dataSource = dataSources.value.find(ds => ds.id === dataSourceId)
    if (dataSource) {
      const index = dataSource.fields.findIndex(f => f.id === fieldId)
      if (index > -1) {
        dataSource.fields.splice(index, 1)
      }
    }
  }

  // Set current data set
  const setCurrentDataSet = (dataSet) => {
    currentDataSet.value = dataSet || {}
  }

  // Process template with data
  const processTemplateWithData = (template, dataSet = currentDataSet.value) => {
    if (!template || !dataSet) return template

    const processedTemplate = JSON.parse(JSON.stringify(template))

    processedTemplate.elements = processedTemplate.elements.map(element => {
      if (element.type === 'text' || element.type === 'formatted-text') {
        element.content = replacePlaceholders(element.content, dataSet)
      }
      return element
    })

    return processedTemplate
  }

  // Replace placeholders in text
  const replacePlaceholders = (text, dataSet = currentDataSet.value) => {
    if (!text || !dataSet) return text

    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return dataSet[key] || match
    })
  }

  // Get available placeholders
  const getAvailablePlaceholders = computed(() => {
    const placeholders = []
    
    customPlaceholders.value.forEach(category => {
      category.items.forEach(item => {
        if (item.type === 'placeholder') {
          placeholders.push({
            key: item.content.replace(/[{}]/g, ''),
            label: item.label,
            category: category.name,
            icon: item.icon
          })
        }
      })
    })

    return placeholders
  })

  // Import data from JSON
  const importDataFromJSON = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      
      if (Array.isArray(data)) {
        // Array of data sets
        data.forEach((item, index) => {
          sampleDataSets.value.push({
            id: `imported_${Date.now()}_${index}`,
            name: `Imported Dataset ${index + 1}`,
            data: item
          })
        })
      } else {
        // Single data set
        sampleDataSets.value.push({
          id: `imported_${Date.now()}`,
          name: 'Imported Dataset',
          data: data
        })
      }
      
      return true
    } catch (error) {
      console.error('Failed to import JSON data:', error)
      return false
    }
  }

  // Import data from CSV
  const importDataFromCSV = (csvData) => {
    try {
      const lines = csvData.split('\n').filter(line => line.trim())
      if (lines.length < 2) return false

      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      
      lines.slice(1).forEach((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const dataObject = {}
        
        headers.forEach((header, i) => {
          dataObject[header] = values[i] || ''
        })

        sampleDataSets.value.push({
          id: `csv_import_${Date.now()}_${index}`,
          name: `CSV Row ${index + 1}`,
          data: dataObject
        })
      })
      
      return true
    } catch (error) {
      console.error('Failed to import CSV data:', error)
      return false
    }
  }

  // Export current data set
  const exportDataSet = (dataSetId) => {
    const dataSet = sampleDataSets.value.find(ds => ds.id === dataSetId)
    if (dataSet) {
      const dataStr = JSON.stringify(dataSet.data, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${dataSet.name.replace(/\s+/g, '_')}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  // Initialize with sample data
  const initializeDataSources = () => {
    // Create a sample data source
    const sampleDataSource = createDataSource('Employee Records', 'manual')
    
    // Add sample fields
    const sampleFields = [
      { name: 'employee_name', type: 'text', label: 'Employee Name' },
      { name: 'employee_id', type: 'text', label: 'Employee ID' },
      { name: 'position', type: 'text', label: 'Position' },
      { name: 'department', type: 'text', label: 'Department' },
      { name: 'salary', type: 'currency', label: 'Salary' },
      { name: 'start_date', type: 'date', label: 'Start Date' }
    ]

    sampleFields.forEach(field => {
      addFieldToDataSource(sampleDataSource.id, field)
    })

    currentDataSource.value = sampleDataSource
  }

  return {
    // Data sources
    dataSources,
    currentDataSource,
    currentDataSet,
    sampleDataSets,
    customPlaceholders,
    
    // Data source management
    createDataSource,
    addFieldToDataSource,
    updateFieldInDataSource,
    removeFieldFromDataSource,
    
    // Data set management
    setCurrentDataSet,
    processTemplateWithData,
    replacePlaceholders,
    getAvailablePlaceholders,
    
    // Import/Export
    importDataFromJSON,
    importDataFromCSV,
    exportDataSet,
    
    // Initialization
    initializeDataSources
  }
}