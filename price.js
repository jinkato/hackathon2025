// Pricing Page JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pricing page loaded');
    
    // Get elements
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.inventory-table tbody tr');
    const filterDiv = document.querySelector('.filter');
    const sidePanel = document.querySelector('.side-panel');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            tableRows.forEach(row => {
                // Get vehicle name
                const vehicleName = row.querySelector('.vehicle-name').textContent.toLowerCase();
                
                // Get all links in vehicle details (stock ID and reference number)
                const vehicleDetailsLinks = row.querySelectorAll('.vehicle-details a');
                let vehicleDetails = '';
                vehicleDetailsLinks.forEach(link => {
                    vehicleDetails += link.textContent.toLowerCase() + ' ';
                });
                
                // Check if search term matches vehicle name or details
                if (vehicleName.includes(searchTerm) || vehicleDetails.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Row click functionality
    tableRows.forEach((row, index) => {
        row.addEventListener('click', function() {
            // Hide filter and show side panel
            filterDiv.classList.add('hidden');
            sidePanel.classList.add('active');
            
            // Update side panel image based on row index
            const sidePanelImg = sidePanel.querySelector('img');
            const imageNumber = (index % 4) + 1; // Cycle through 1-4
            sidePanelImg.src = `img/sidepanel/sidepanel${imageNumber}.png`;
        });
    });
    
    // Click on side panel to close it
    if (sidePanel) {
        sidePanel.addEventListener('click', function() {
            sidePanel.classList.remove('active');
            filterDiv.classList.remove('hidden');
        });
    }
    
    // Filter tag functionality
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        const removeBtn = tag.querySelector('.remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                tag.remove();
            });
        }
    });
});