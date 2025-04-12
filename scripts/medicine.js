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
    // Improved card creation function
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

    // Enhanced value formatter
    function formatValue(value) {
        if (Array.isArray(value)) {
            return value.length > 0 
                ? `<ul class="list-disc pl-4">${value.map(item => `<li>${item}</li>`).join('')}</ul>`
                : '';
        }
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value)
                .filter(([_, val]) => val !== null && val !== '')
                .map(([key, val]) => `
                    <div>
                        <span class="font-medium">${formatKey(key)}:</span>
                        <div class="ml-2">${formatValue(val)}</div>
                    </div>
                `).join('');
        }
        return value || '';
    }

    // Key formatter
    function formatKey(key) {
        return key.replace(/_/g, ' ')
                 .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }

    // Main card generator
    const container = document.getElementById('cardsContainer');
    const excludedKeys = ['images', 'search'];
    
    Object.entries(result).forEach(([category, data]) => {
        if (excludedKeys.includes(category) || !data) return;

        const content = Object.entries(data)
            .filter(([_, value]) => 
                (Array.isArray(value) && value.length > 0) ||
                (typeof value === 'string' && value) ||
                (typeof value === 'object' && value !== null)
            )
            .map(([key, value]) => `
                <div class="mb-3">
                    <div class="font-medium text-gray-700">${formatKey(key)}</div>
                    <div class="text-gray-600 mt-1">
                        ${formatValue(value)}
                    </div>
                </div>
            `).join('');

        if (content.trim()) {
            container.appendChild(createCard(formatKey(category), content));
        }
    });

    // Add search card if exists
    if (result.search?.google_search_url) {
        const searchCard = createCard('Product Search', `
            <a href="${result.search.google_search_url}" target="_blank" 
               class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <span>Search Online </span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>
        `);
        container.appendChild(searchCard);
    }
});