// Function to provide proper font fallbacks for better cross-platform compatibility
const getFontFamilyWithFallbacks = (fontFamily) => {
  if (!fontFamily || fontFamily === 'inherit') {
    return 'Arial, sans-serif'
  }

  // Map fonts to their proper fallbacks
  const fontMap = {
    'Arial, sans-serif': 'Arial, Helvetica, sans-serif',
    "'Helvetica Neue', sans-serif": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    "'Times New Roman', serif": "'Times New Roman', Times, serif",
    'Georgia, serif': 'Georgia, "Times New Roman", Times, serif',
    "'Courier New', monospace": "'Courier New', Courier, monospace",
    'Roboto, sans-serif': 'Roboto, Arial, Helvetica, sans-serif',
    "'Open Sans', sans-serif": "'Open Sans', Arial, Helvetica, sans-serif",
    'Lato, sans-serif': 'Lato, Arial, Helvetica, sans-serif',
    'Montserrat, sans-serif': 'Montserrat, Arial, Helvetica, sans-serif',
    'Tahoma, sans-serif': 'Tahoma, Arial, Helvetica, sans-serif',
    'Verdana, sans-serif': 'Verdana, Arial, Helvetica, sans-serif',
    "'Segoe UI', sans-serif": "'Segoe UI', Tahoma, Arial, Helvetica, sans-serif",
    // Arabic fonts with fallbacks
    'Tajawal, sans-serif': 'Tajawal, "Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
    'Cairo, sans-serif': 'Cairo, "Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
    "'Noto Sans Arabic', sans-serif": '"Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
    "'IBM Plex Sans Arabic', sans-serif": '"IBM Plex Sans Arabic", "Noto Sans Arabic", Arial, sans-serif',
    'Amiri, serif': 'Amiri, "Times New Roman", Times, serif'
  }

  return fontMap[fontFamily] || `${fontFamily}, Arial, sans-serif`
}

export const generateHTMLContent = (template) => {
  const { elements, pageSize } = template
  
  // Generate CSS for elements
  const elementStyles = elements.map(element => {
    let styles = `
    .element-${element.id} {
      position: absolute;
      left: ${element.x}px;
      top: ${element.y}px;
      width: ${element.width}px;
      height: ${element.height}px;`
    
    if (element.type === 'text' || element.type === 'formatted-text') {
      styles += `
      font-size: ${element.fontSize}px;
      color: ${element.color};
      font-family: ${getFontFamilyWithFallbacks(element.fontFamily)};
      font-weight: ${element.fontWeight || 'normal'};
      font-style: ${element.fontStyle || 'normal'};
      text-decoration: ${element.textDecoration || 'none'};
      direction: ${element.textDirection || 'ltr'};
      text-align: ${element.textDirection === 'rtl' ? 'right' : 'left'};
      display: flex;
      align-items: flex-start;
      padding: 4px;
      word-wrap: break-word;`
    }
    
    if (element.type === 'line') {
      styles += `
      background-color: ${element.strokeColor || '#000000'};
      height: ${element.strokeWidth || 2}px;`
    }
    
    if (element.type === 'rect') {
      styles += `
      background-color: ${element.fillColor || '#ffffff'};
      border: ${element.strokeWidth || 1}px solid ${element.strokeColor || '#000000'};`
    }
    
    if (element.type === 'circle') {
      styles += `
      background-color: ${element.fillColor || '#ffffff'};
      border: ${element.strokeWidth || 1}px solid ${element.strokeColor || '#000000'};
      border-radius: 50%;`
    }
    
    styles += `
    }`
    
    return styles
  }).join('\n')
  
  // Generate HTML for elements
  const elementHTML = elements.map(element => {
    if (element.type === 'text' || element.type === 'formatted-text') {
      return `<div class="element-${element.id}">${element.content}</div>`
    }
    
    if (element.type === 'image') {
      return `<div class="element-${element.id}">
        ${element.src ? `<img src="${element.src}" style="width: 100%; height: 100%; object-fit: contain;" />` : '<div style="background: #f0f0f0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">Image Placeholder</div>'}
      </div>`
    }
    
    if (element.type === 'line') {
      return `<div class="element-${element.id}"></div>`
    }
    
    if (element.type === 'rect') {
      return `<div class="element-${element.id}"></div>`
    }
    
    if (element.type === 'circle') {
      return `<div class="element-${element.id}"></div>`
    }
    
    if (element.type === 'table') {
      // Helper functions for merged cells
      const isCellHidden = (row, col) => {
        if (!element.mergedCells) return false
        
        for (const [mergedKey, mergeData] of Object.entries(element.mergedCells)) {
          const [mergedRow, mergedCol] = mergedKey.split(',').map(Number)
          const { colspan = 1, rowspan = 1 } = mergeData
          
          if (mergedRow !== row || mergedCol !== col) {
            if (row >= mergedRow && row < mergedRow + rowspan &&
                col >= mergedCol && col < mergedCol + colspan) {
              return true
            }
          }
        }
        return false
      }

      const getCellColspan = (row, col) => {
        if (!element.mergedCells) return 1
        const key = `${row},${col}`
        return element.mergedCells[key]?.colspan || 1
      }

      const getCellRowspan = (row, col) => {
        if (!element.mergedCells) return 1
        const key = `${row},${col}`
        return element.mergedCells[key]?.rowspan || 1
      }

      const tableHTML = `
        <table style="width: 100%; height: 100%; border-collapse: collapse; background-color: ${element.backgroundColor || '#ffffff'}; color: ${element.textColor || '#000000'}; font-size: ${element.fontSize || 12}px; font-family: ${getFontFamilyWithFallbacks(element.fontFamily)}; direction: ${element.textDirection || 'ltr'};">
          ${element.data.map((row, rowIndex) => `
            <tr>
              ${row.map((cell, colIndex) => {
                if (isCellHidden(rowIndex, colIndex)) return ''
                
                const colspan = getCellColspan(rowIndex, colIndex)
                const rowspan = getCellRowspan(rowIndex, colIndex)
                const colspanAttr = colspan > 1 ? ` colspan="${colspan}"` : ''
                const rowspanAttr = rowspan > 1 ? ` rowspan="${rowspan}"` : ''
                const textAlign = element.textDirection === 'rtl' ? 'right' : (element.textAlign || 'left')
                
                return `<td style="border: ${element.borderWidth || 1}px ${element.borderStyle || 'solid'} ${element.borderColor || '#000000'}; padding: ${element.cellPadding || 5}px; text-align: ${textAlign}; vertical-align: ${element.verticalAlign || 'top'}; direction: ${element.textDirection || 'ltr'};"${colspanAttr}${rowspanAttr}>${cell}</td>`
              }).join('')}
            </tr>
          `).join('')}
        </table>`
      return `<div class="element-${element.id}">${tableHTML}</div>`
    }
    
    return `<div class="element-${element.id}"></div>`
  }).join('\n')
  
  const canvasWidth = pageSize === 'a4' ? '794px' : '816px'
  const canvasHeight = pageSize === 'a4' ? '1123px' : '1056px'
  
  const htmlParts = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '    <title>Print Template</title>',
    '    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">',
    '    <style>',
    '        * {',
    '            margin: 0;',
    '            padding: 0;',
    '            box-sizing: border-box;',
    '            -webkit-print-color-adjust: exact !important;',
    '            color-adjust: exact !important;',
    '            print-color-adjust: exact !important;',
    '        }',
    '        ',
    '        body {',
    '            font-family: Arial, sans-serif;',
    '            background: #f0f0f0;',
    '            padding: 20px;',
    '        }',
    '        ',
    '        .template-container {',
    '            background: white;',
    `            width: ${canvasWidth};`,
    `            height: ${canvasHeight};`,
    '            margin: 0 auto;',
    '            position: relative;',
    '            box-shadow: 0 4px 12px rgba(0,0,0,0.15);',
    '        }',
    '        ',
    '        @media print {',
    '            body {',
    '                background: white;',
    '                padding: 0;',
    '            }',
    '            ',
    '            .template-container {',
    '                width: 100% !important;',
    '                height: 100% !important;',
    '                box-shadow: none !important;',
    '                margin: 0 !important;',
    '            }',
    '        }',
    '        ',
    '        @page {',
    '            margin: 0;',
    `            size: ${pageSize.toUpperCase()} portrait;`,
    '        }',
    '        ',
    elementStyles,
    '    </style>',
    '</head>',
    '<body>',
    '    <div class="template-container">',
    elementHTML,
    '    </div>',
    '    ',
    '    <script>',
    '        window.addEventListener("load", function() {',
    '            console.log("Template loaded and ready for printing");',
    '        });',
    '    </script>',
    '</body>',
    '</html>'
  ]
  
  return htmlParts.join('\n')
}

export const downloadHTML = (htmlContent) => {
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `template_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  return true
}