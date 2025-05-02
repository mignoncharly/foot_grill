// Data storage
let contributions = [];
let isAdmin = false; // Default to non-admin

// DOM elements
const categorySelect = document.getElementById('category');
const itemSelect = document.getElementById('item');
const contributionForm = document.getElementById('contributionForm');
const contributionsList = document.getElementById('contributionsList');
const adminSection = document.getElementById('adminSection');
const adminContributionsList = document.getElementById('adminContributionsList');
const enBtn = document.getElementById('enBtn');
const deBtn = document.getElementById('deBtn');
const resetAllBtn = document.getElementById('resetAllBtn');

// Current language
let currentLanguage = 'en';

// Set admin status from Django template variable if available 
if (typeof initialIsAdmin !== 'undefined') {
    isAdmin = initialIsAdmin;
    
    // Show admin section if user is admin
    if (isAdmin) {
        adminSection.classList.remove('d-none');
    }
}

// Function to update UI language
function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update language toggle buttons
    if (lang === 'en') {
        enBtn.classList.add('active');
        deBtn.classList.remove('active');
    } else {
        enBtn.classList.remove('active');
        deBtn.classList.add('active');
    }
    
    // Update main elements
    document.getElementById('mainTitle').textContent = translations[lang].mainTitle;
    document.getElementById('mainDescription').textContent = translations[lang].mainDescription;
    document.getElementById('formTitle').textContent = translations[lang].formTitle;
    document.getElementById('categoryLabel').textContent = translations[lang].categoryLabel;
    document.getElementById('selectCategoryOption').textContent = translations[lang].selectCategoryOption;
    document.getElementById('meatOption').textContent = translations[lang].meatOption;
    document.getElementById('drinksOption').textContent = translations[lang].drinksOption;
    document.getElementById('saucesOption').textContent = translations[lang].saucesOption;
    document.getElementById('sidesOption').textContent = translations[lang].sidesOption;
    document.getElementById('utensilsOption').textContent = translations[lang].utensilsOption;
    document.getElementById('itemLabel').textContent = translations[lang].itemLabel;
    document.getElementById('selectItemOption').textContent = translations[lang].selectItemOption;
    document.getElementById('quantityLabel').textContent = translations[lang].quantityLabel;
    document.getElementById('nameLabel').textContent = translations[lang].nameLabel;
    document.getElementById('commentLabel').textContent = translations[lang].commentLabel;
    document.getElementById('comment').placeholder = translations[lang].commentPlaceholder;
    document.getElementById('submitBtn').textContent = translations[lang].submitBtn;
    document.getElementById('contributionsTitle').textContent = translations[lang].contributionsTitle;
    
    // Update admin section elements if visible
    if (isAdmin) {
        document.getElementById('adminTitle').textContent = translations[lang].adminTitle;
        document.getElementById('nameHeader').textContent = translations[lang].nameHeader;
        document.getElementById('categoryHeader').textContent = translations[lang].categoryHeader;
        document.getElementById('itemHeader').textContent = translations[lang].itemHeader;
        document.getElementById('quantityHeader').textContent = translations[lang].quantityHeader;
        document.getElementById('commentHeader').textContent = translations[lang].commentHeader;
        document.getElementById('resetAllBtnText').textContent = translations[lang].resetAllBtnText;
    }
    
    // If a category is selected, update item options
    if (categorySelect.value) {
        updateItemOptions(categorySelect.value);
    }
    
    // Update contributions list
    updateContributionsList();
    
    // Update admin list if admin
    if (isAdmin) {
        updateAdminList();
    }
}

// Custom alert function
function showCustomAlert(type, message, callback = null) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Create alert box
    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert ${type}`;
    
    // Create alert title
    const title = document.createElement('div');
    title.className = 'custom-alert-title';
    title.textContent = translations[currentLanguage].alertTitles[type];
    
    // Create alert message
    const messageEl = document.createElement('div');
    messageEl.className = 'custom-alert-message';
    messageEl.textContent = message;
    
    // Create OK button
    const okButton = document.createElement('button');
    okButton.className = 'custom-alert-button';
    okButton.textContent = translations[currentLanguage].alertButtons.ok;
    okButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        if (callback) callback();
    });
    
    // Assemble alert box
    alertBox.appendChild(title);
    alertBox.appendChild(messageEl);
    alertBox.appendChild(okButton);
    
    // Add to overlay
    overlay.appendChild(alertBox);
    
    // Add to document
    document.body.appendChild(overlay);
}

// Confirmation dialog with Yes/No options
function showConfirmDialog(title, message, onConfirm, onCancel = null) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Create alert box
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert warning';
    
    // Create alert title
    const titleEl = document.createElement('div');
    titleEl.className = 'custom-alert-title';
    titleEl.textContent = title;
    
    // Create alert message
    const messageEl = document.createElement('div');
    messageEl.className = 'custom-alert-message';
    messageEl.textContent = message;
    
    // Create button container for layout
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex justify-content-center gap-3';
    
    // Create Yes button
    const yesButton = document.createElement('button');
    yesButton.className = 'custom-alert-button';
    yesButton.textContent = translations[currentLanguage].alertButtons.yes;
    yesButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        if (onConfirm) onConfirm();
    });
    
    // Create No button
    const noButton = document.createElement('button');
    noButton.className = 'custom-alert-button btn-outline-secondary';
    noButton.textContent = translations[currentLanguage].alertButtons.no;
    noButton.style.backgroundColor = '#f8f9fa';
    noButton.style.color = '#212529';
    noButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
    });
    
    // Assemble buttons
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    
    // Assemble alert box
    alertBox.appendChild(titleEl);
    alertBox.appendChild(messageEl);
    alertBox.appendChild(buttonContainer);
    
    // Add to overlay
    overlay.appendChild(alertBox);
    
    // Add to document
    document.body.appendChild(overlay);
}

// Function to populate item options based on selected category
function updateItemOptions(category) {
    // Clear previous options
    itemSelect.innerHTML = `<option value="">${translations[currentLanguage].selectItemOption}</option>`;
    
    if (!category) {
        itemSelect.disabled = true;
        return;
    }
    
    // Enable item select
    itemSelect.disabled = false;
    
    // Add options based on category
    const items = translations[currentLanguage][category];
    for (const [key, value] of Object.entries(items)) {
        // Skip non-item entries like 'units'
        if (key === 'units') continue;
        
        // Calculate current quantity for this item
        const currentQuantity = getCurrentQuantity(category, key);
        const maxQuantity = maxQuantities[category][key];
        const remaining = maxQuantity - currentQuantity;
        
        // Create option element
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${value} (${remaining}/${maxQuantity})`;
        
        // Disable option if max quantity reached
        if (remaining <= 0) {
            option.disabled = true;
        }
        
        itemSelect.appendChild(option);
    }
    
    // Update unit display based on category
    updateUnitDisplay(category);
}



// Function to update the unit display based on category and optionally item
function updateUnitDisplay(category, item = null) {
    const unitAddon = document.getElementById('unit-addon');
    const unitHelp = document.getElementById('unitHelp');
    const quantityInput = document.getElementById('quantity');
    
    // Default values
    unitAddon.textContent = 'units';
    unitHelp.textContent = 'Select a category and item to see the appropriate unit';
    
    if (!category) {
        return;
    }
    
    try {
        // Handle special case for drinks which have specific units per item
        if (category === 'drinks' && item) {
            // Get the unit for this specific drink item
            if (translations[currentLanguage].units && 
                translations[currentLanguage].units.drinks && 
                translations[currentLanguage].units.drinks[item]) {
                
                const unitValue = translations[currentLanguage].units.drinks[item];
                unitAddon.textContent = unitValue;
                unitHelp.textContent = `Enter quantity in ${unitValue}`;
            }
            
            // Set appropriate step value for drinks
            quantityInput.step = "1";
            quantityInput.min = "1";
        } 
        // For other categories that have a single unit
        else if (category && translations[currentLanguage].units && 
                 typeof translations[currentLanguage].units[category] === 'string') {
            
            const unitValue = translations[currentLanguage].units[category];
            unitAddon.textContent = unitValue;
            unitHelp.textContent = `Enter quantity in ${unitValue}`;
            
            // Set appropriate step value based on category
            if (category === 'meat') {
                quantityInput.step = "0.1";
                quantityInput.min = "0.1";
            } else {
                quantityInput.step = "1";
                quantityInput.min = "1";
            }
        }
    } catch (error) {
        console.error('Error updating unit display:', error, {
            category,
            item,
            currentLanguage
        });
        // Reset to defaults in case of error
        unitAddon.textContent = 'units';
        unitHelp.textContent = 'Select a category and item to see the appropriate unit';
    }
}

// Function to get current quantity of an item
function getCurrentQuantity(category, itemKey) {
    return contributions
        .filter(c => c.category === category && c.item === itemKey)
        .reduce((sum, c) => sum + c.quantity, 0);
}


// This function needs to be fixed to handle unit display correctly
// Function to update contributions list
function updateContributionsList() {
    contributionsList.innerHTML = '';
    
    // Group contributions by category
    const groupedByCategory = {};
    contributions.forEach(contribution => {
        if (!groupedByCategory[contribution.category]) {
            groupedByCategory[contribution.category] = [];
        }
        groupedByCategory[contribution.category].push(contribution);
    });
    
    // Create list items for each category
    for (const [category, items] of Object.entries(groupedByCategory)) {
        const categoryName = translations[currentLanguage][`${category}Option`];
        
        const categoryItem = document.createElement('li');
        categoryItem.className = 'list-group-item';
        categoryItem.innerHTML = `<h6>${categoryName}</h6>`;
        
        const itemsList = document.createElement('ul');
        itemsList.className = 'list-unstyled';
        
        items.forEach(contribution => {
            const itemName = translations[currentLanguage][category][contribution.item];
            
            // Get the appropriate unit
            let unit = 'units';
            try {
                if (category === 'drinks' && contribution.item && 
                    translations[currentLanguage].units && 
                    translations[currentLanguage].units.drinks && 
                    translations[currentLanguage].units.drinks[contribution.item]) {
                    unit = translations[currentLanguage].units.drinks[contribution.item];
                } else if (translations[currentLanguage].units && 
                           typeof translations[currentLanguage].units[category] === 'string') {
                    unit = translations[currentLanguage].units[category];
                }
            } catch (error) {
                console.error('Error getting unit for display:', error, {
                    category, 
                    item: contribution.item,
                    currentLanguage
                });
            }
            
            const itemElement = document.createElement('li');
            itemElement.className = 'contribution-item';
            
            // Create content with comment if present
            let contentHTML = `
                <div class="d-flex justify-content-between">
                    <span>${itemName}</span>
                    <span>${contribution.quantity} ${unit} (${contribution.name})</span>
                </div>
            `;
            
            if (contribution.comment && contribution.comment.trim() !== '') {
                contentHTML += `<div class="text-muted small mt-1">${contribution.comment}</div>`;
            }
            
            itemElement.innerHTML = contentHTML;
            itemsList.appendChild(itemElement);
        });
        
        categoryItem.appendChild(itemsList);
        contributionsList.appendChild(categoryItem);
    }
    
    // Show message if no contributions
    if (contributions.length === 0) {
        contributionsList.innerHTML = `<li class="list-group-item text-center">${translations[currentLanguage].noContributions}</li>`;
    }
}

// Function to update admin list
function updateAdminList() {
    // Skip if not admin
    if (!isAdmin) return;
    
    adminContributionsList.innerHTML = '';
    
    contributions.forEach((contribution) => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = contribution.name;
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = translations[currentLanguage][`${contribution.category}Option`];
        
        const itemCell = document.createElement('td');
        itemCell.textContent = translations[currentLanguage][contribution.category][contribution.item];
        
        // Get the appropriate unit
        let unit = 'units';
        try {
            if (contribution.category === 'drinks' && contribution.item && 
                translations[currentLanguage].units && 
                translations[currentLanguage].units.drinks && 
                translations[currentLanguage].units.drinks[contribution.item]) {
                unit = translations[currentLanguage].units.drinks[contribution.item];
            } else if (translations[currentLanguage].units && 
                       typeof translations[currentLanguage].units[category] === 'string') {
                unit = translations[currentLanguage].units[contribution.category];
            }
        } catch (error) {
            console.error('Error getting unit for admin display:', error, {
                category: contribution.category, 
                item: contribution.item,
                currentLanguage
            });
        }
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = `${contribution.quantity} ${unit}`;
        
        const commentCell = document.createElement('td');
        commentCell.textContent = contribution.comment || '';
        commentCell.className = 'text-muted';
        
        // Actions cell
        const actionsCell = document.createElement('td');
        
        // Only show delete button if admin
        if (isAdmin) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-outline-danger';
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
            deleteBtn.title = 'Delete';
            deleteBtn.dataset.id = contribution.id;
            deleteBtn.addEventListener('click', handleDeleteContribution);
            actionsCell.appendChild(deleteBtn);
        }
        
        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(itemCell);
        row.appendChild(quantityCell);
        row.appendChild(commentCell);
        row.appendChild(actionsCell);
        
        adminContributionsList.appendChild(row);
    });
}

// API Functions
async function fetchAllContributions() {
    try {
        const response = await fetch('/api/contributions/');
        const data = await response.json();
        
        contributions = data.contributions;
        
        // Update admin status if provided by API
        if (data.is_admin !== undefined) {
            isAdmin = data.is_admin;
            
            // Show/hide admin section based on admin status
            if (isAdmin) {
                adminSection.classList.remove('d-none');
            } else {
                adminSection.classList.add('d-none');
            }
        }
        
        updateContributionsList();
        
        // Only update admin list if admin
        if (isAdmin) {
            updateAdminList();
        }
    } catch (error) {
        console.error('Error fetching contributions:', error);
        showCustomAlert('error', 'Failed to fetch contributions. Please try again later.');
    }
}

async function addContribution(contributionData) {
    try {
        const response = await fetch('/api/contributions/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contributionData),
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Refetch all contributions
            await fetchAllContributions();
            return true;
        } else {
            showCustomAlert('error', data.error || 'Failed to add contribution');
            return false;
        }
    } catch (error) {
        console.error('Error adding contribution:', error);
        showCustomAlert('error', 'Failed to add contribution. Please try again later.');
        return false;
    }
}

async function deleteContribution(id) {
    // Only proceed if admin
    if (!isAdmin) {
        showCustomAlert('error', 'Admin access required');
        return false;
    }
    
    try {
        // Fix the URL path to match your Django URL pattern
        const response = await fetch(`/api/contributions/${id}/delete/`, {
            method: 'DELETE',
            credentials: 'same-origin', // Include credentials for auth
        });
        
        if (response.status === 403) {
            showCustomAlert('error', 'Admin access required');
            return false;
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Refetch all contributions
            await fetchAllContributions();
            return true;
        } else {
            showCustomAlert('error', data.error || 'Failed to delete contribution');
            return false;
        }
    } catch (error) {
        console.error('Error deleting contribution:', error);
        showCustomAlert('error', 'Failed to delete contribution. Please try again later.');
        return false;
    }
}

async function deleteAllContributions() {
    // Only proceed if admin
    if (!isAdmin) {
        showCustomAlert('error', 'Admin access required');
        return false;
    }
    
    try {
        const response = await fetch('/api/contributions/delete-all/', {
            method: 'DELETE',
            credentials: 'same-origin', // Include credentials for auth
        });
        
        if (response.status === 403) {
            showCustomAlert('error', 'Admin access required');
            return false;
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Refetch all contributions
            await fetchAllContributions();
            return true;
        } else {
            showCustomAlert('error', data.error || 'Failed to delete all contributions');
            return false;
        }
    } catch (error) {
        console.error('Error deleting all contributions:', error);
        showCustomAlert('error', 'Failed to delete all contributions. Please try again later.');
        return false;
    }
}

// Handle delete contribution
async function handleDeleteContribution(e) {
    // Only proceed if admin
    if (!isAdmin) {
        showCustomAlert('error', 'Admin access required');
        return;
    }
    
    const id = e.currentTarget.dataset.id;
    
    const success = await deleteContribution(id);
    
    if (success) {
        showCustomAlert('success', translations[currentLanguage].deleteItemSuccess);
    }
}

// Event Listeners
categorySelect.addEventListener('change', (e) => {
    updateItemOptions(e.target.value);
});

// Listen for item selection to update units for drinks
itemSelect.addEventListener('change', (e) => {
    const category = categorySelect.value;
    const item = e.target.value;
    
    if (category === 'drinks' && item) {
        updateUnitDisplay(category, item);
    }
});

contributionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const category = categorySelect.value;
    const item = itemSelect.value;
    const quantityInput = document.getElementById('quantity');
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    
    // Parse quantity based on category (decimal for meat, integer for others)
    let quantity;
    if (category === 'meat') {
        quantity = parseFloat(quantityInput.value);
    } else {
        quantity = parseInt(quantityInput.value);
    }
    
    // Validate contribution
    const currentQuantity = getCurrentQuantity(category, item);
    const maxQuantity = maxQuantities[category][item];
    
    if (currentQuantity + quantity > maxQuantity) {
        showCustomAlert('error', translations[currentLanguage].maxQuantityReached);
        return;
    }
    
    // Prepare data for API
    const contributionData = {
        category,
        item,
        quantity,
        name,
        comment
    };
    
    // Send to API
    const success = await addContribution(contributionData);
    
    if (success) {
        // Reset form
        contributionForm.reset();
        itemSelect.disabled = true;
        
        // Show success message
        showCustomAlert('success', translations[currentLanguage].submissionSuccess, () => {
            // Callback after dismissing the alert
            updateUnitDisplay(null);
        });
    }
});

// Language toggle event listeners
enBtn.addEventListener('click', () => updateLanguage('en'));
deBtn.addEventListener('click', () => updateLanguage('de'));

// Reset all contributions
resetAllBtn.addEventListener('click', () => {
    // Only proceed if admin
    if (!isAdmin) {
        showCustomAlert('error', 'Admin access required');
        return;
    }
    
    showConfirmDialog(
        translations[currentLanguage].deleteConfirmTitle,
        translations[currentLanguage].deleteConfirmMessage,
        async () => {
            const success = await deleteAllContributions();
            
            if (success) {
                // Show success message
                showCustomAlert('success', translations[currentLanguage].deleteSuccess);
            }
        }
    );
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load contributions from API
    fetchAllContributions();
    
    // Set default language
    updateLanguage('en');
    
    // Initialize unit display
    updateUnitDisplay(null);
});