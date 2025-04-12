document.addEventListener('DOMContentLoaded', () => {
    const result = JSON.parse(sessionStorage.getItem('scanResult'));
const uploadedImage = sessionStorage.getItem('uploadedImage');

// Redirect if no data
if (!result || !uploadedImage) {
window.location.href = 'index.html';
return;
}

// Display image
const productImage = document.getElementById('productImage');
productImage.src = uploadedImage;

    // Function to create cards
    function createCard(title, content) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden';
        card.innerHTML = `
            <div class="p-6 h-full">
                <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">${title}</h3>
                <div class="text-gray-600 space-y-2">${content}</div>
            </div>
        `;
        return card;
    }

    // Function to format key names
    function formatKey(key) {
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Function to generate content (skips null/empty values)
    function generateContent(data, level = 0) {
        if (data === null) return '';
        if (typeof data !== 'object') return data;
        
        let html = '<div class="space-y-2">';
        let hasContent = false;
        
        for (const [key, value] of Object.entries(data)) {
            const childContent = generateContent(value, level + 1);
            if (!childContent) continue;
            
            html += `
                <div class="${level > 0 ? 'ml-4' : ''}">
                    <span class="font-medium text-gray-700">${formatKey(key)}:</span>
                    <div class="mt-1 ${level > 0 ? 'text-sm' : ''}">
                        ${childContent}
                    </div>
                </div>
            `;
            hasContent = true;
        }
        
        html += '</div>';
        return hasContent ? html : '';
    }

    // Generate cards for each relevant category
    const container = document.getElementById('cardsContainer');
    for (const [category, data] of Object.entries(result)) {
        if (['images', 'search'].includes(category)) continue;
        
        const title = formatKey(category);
        const content = generateContent(data);
        
        if (content.trim()) {
            container.appendChild(createCard(title, content));
        }
    }

    // Add Product Search card if URL exists
    if (result.search?.google_search_url) {
        const searchCard = createCard('For more information', 
            `<a href="${result.search.google_search_url}" target="_blank" 
                class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <span>Click here </span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>`);
        container.appendChild(searchCard);
    }
});p