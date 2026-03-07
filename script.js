// CONFIGURATION 
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSQzOeqNj6ZPiU7AIdQzLOCFwYRfGgQPlyR3m-oiVusaXg0GCuvplbfw8M7fxruYhf/exec';
const emts = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown'];
const cars = ['Ambulance 101', 'Ambulance 102', 'Ambulance 103', 'Ambulance 104'];

const pages = {
    Medical: [
        // SECTION: BVM and Suction
        { type: 'section', name: 'BVM and Suction' },
        { name: 'BVM Adult', type: 'checkbox', required: '1' },
        { name: 'BVM Adult Oxygen Reservoir', type: 'checkbox', required: '1' },
        { name: 'BVM Pediatric', type: 'checkbox', required: '1' },
        { name: 'BVM Mask Adult', quantity: true, required: '3 (Large Adult - Small Adult - Large Child)' },
        { name: 'BVM Mask Pediatric', quantity: true, required: '2 (Small Child - Infant)' },
        { name: 'HEPA Filter', quantity: true, required: '2' },
        { name: 'Manual Suction Unit', type: 'checkbox', required: '1' },
        { name: 'Suction Pipes (with adapter)', type: 'checkbox', required: '2 (Thin - Thick)' },
        { name: 'Suction Tubes', quantity: true, required: '4 (Black - Blue - Green - Orange)' },
        { name: 'Suction Connector', type: 'checkbox', required: '1' },
        { name: 'Airway Cannula (OPA)', quantity: true, required: '8 (40mm - 110mm)' },

        // SECTION: Oxygen
        { type: 'section', name: 'Oxygen' },
        { name: 'Oxygen D-Size Bottle (Small)', type: 'text', quantity: true, required: '2000 psi', placeholder: 'Enter PSI', min: 0, max: 3000 },
        { name: 'Oxygen Regulator for Bottle', type: 'checkbox', required: '1' },
        { name: 'Oxygen Keychain', type: 'checkbox', required: '1' },
        { name: 'Oxygen Face Mask Adult', quantity: true, required: '3' },
        { name: 'Oxygen Face Mask Pediatric', quantity: true, required: '1' },
        { name: 'Oxygen Non-rebreather Mask Adult', quantity: true, required: '3' },
        { name: 'Oxygen Non-rebreather Mask Pediatric', quantity: true, required: '1' },
        { name: 'Oxygen Nasal Cannula Adult', quantity: true, required: '3' },
        { name: 'Oxygen Nasal Cannula Pediatric', quantity: true, required: '1' },
        { name: 'Oxygen Connecting Tube', quantity: true, required: '3' },

        // SECTION: Vital Signs
        { type: 'section', name: 'Vital Signs' },
        { name: 'Shygmomanometer', type: 'checkbox', required: '1' },
        { name: 'Shygmomanometer Cuffs', quantity: true, required: '4 (Large Adult - Adult - Child - Infant)' },
        { name: 'Stethoscope', type: 'checkbox', required: '1' },
        { name: 'Pulse Oximeter', type: 'checkbox', required: '1' },
        { name: 'Penlight', type: 'checkbox', required: '1' },
        { name: 'Oral Thermometer', quantity: true, required: '3' },
        { name: 'Thermometer Strips', quantity: true, required: '10' },
        { name: 'Glucometer', type: 'checkbox', required: '1' },
        { name: 'Glucometer Strips', quantity: true, required: '10' },
        { name: 'Glucometer Needles', quantity: true, required: '10' },

        // SECTION: Other
        { type: 'section', name: 'Other' },
        { name: 'Cloth Scissors', type: 'checkbox', required: '1' },
        { name: 'Trash Bags Small', quantity: true, required: '10' }
    ],

    Trauma: [
        // SECTION: Spinal
        { type: 'section', name: 'Spinal' },
        { name: 'Head Immobilizer', type: 'checkbox', required: '1' },
        { name: 'Head Immobilizer Fixations', quantity: true, required: '2' },
        { name: 'Head Immobilizer Straps', quantity: true, required: '2' },
        { name: 'Spider Belts', type: 'checkbox', required: '1' },
        { name: 'Hook Straps', quantity: true, required: '4' },

        // SECTION: Splinting
        { type: 'section', name: 'Splinting' },
        { name: 'Pelvic Belt', type: 'checkbox', required: '1' },
        { name: 'KTD', type: 'checkbox', required: '1' },
        { name: 'Ducting Tape', type: 'slider', required: '50% at least', min: 0, max: 100, step: 5 },

        // SECTION: Bandages
        { type: 'section', name: 'Bandages' },
        { name: 'Elastic Bandage Small', quantity: true, required: '5' },
        { name: 'Elastic Bandage Medium', quantity: true, required: '5' },
        { name: 'Elastic Bandage Large', quantity: true, required: '5' },
        { name: 'Compressive Bandage', quantity: true, required: '5' },
        { name: 'Triangular Bandage', quantity: true, required: '5' },
        { name: 'Band Aids', quantity: true, required: '10' },

        // SECTION: Other
        { type: 'section', name: 'Other' },
        { name: 'Sterile Gauze (Set of 5)', quantity: true, required: '5' },
        { name: 'Ice Bag', quantity: true, required: '2' },
        { name: 'Inongan/DHR', type: 'checkbox', required: '1' },
        { name: 'Tourniquet', type: 'checkbox', required: '1' },
        { name: 'Chest Seal', quantity: true, required: '1' }
    ],

    'Ambulance Equipment': [
        // SECTION: Transport
        { type: 'section', name: 'Transport' },
        { name: 'Foldable Stretcher', type: 'checkbox', required: '1' },
        { name: 'Stair Chair', type: 'checkbox', required: '1' },
        { name: 'EZ-Glide', type: 'checkbox', required: '1' },
        { name: 'Planchette', type: 'checkbox', required: '1' },
        { name: 'Scoop Stretcher', type: 'checkbox', required: '1' },
        { name: 'Spare Belts', quantity: true, required: '3' },

        // SECTION: Immobilization and Splinting
        { type: 'section', name: 'Immobilization and Splinting' },
        { name: 'Vacuum Mattress', type: 'checkbox', required: '1' },
        { name: 'Vacuum Mattress Deflator', type: 'checkbox', required: '1' },
        { name: 'Spinal Board', type: 'checkbox', required: '1' },
        { name: 'Rigid Splints', quantity: true, required: '3' },
        { name: 'Vacuum Splints', quantity: true, required: '3' },
        { name: 'KED', type: 'checkbox', required: '1' },
        { name: 'KED Straps', quantity: true, required: '2' },
        { name: 'KED Pillow', type: 'checkbox', required: '1' },
        { name: 'Cervical Collar Adult', quantity: true, required: '3' },
        { name: 'Cervical Collar Pediatric', quantity: true, required: '2' },

        // SECTION: Oxygen
        { type: 'section', name: 'Oxygen' },
        { name: 'Oxygen E-Size Bottle', type: 'text', quantity: true, required: '2000 psi', placeholder: 'Enter PSI', min: 0, max: 3000 },
        { name: 'Oxygen Regulator for Bottle', type: 'checkbox', required: '1' },
        { name: 'Oxygen Jumbo Bottle', type: 'text', quantity: true, required: '2000 psi', placeholder: 'Enter PSI', min: 0, max: 3000 },
        { name: 'Oxygen Flowmeter for Jumbo Bottle', type: 'checkbox', required: '1' },
        { name: 'Oxygen Keychain', type: 'checkbox', required: '1' },
        { name: 'Oxygen Spare Bottle Large', type: 'checkbox', required: '1' },
        { name: 'Oxygen Spare Bottle Small', type: 'checkbox', required: '1' },

        // SECTION: Suction
        { type: 'section', name: 'Suction' },
        { name: 'Electrical Suction', type: 'checkbox', required: '1' },
        { name: 'Suction Tubes', quantity: true, required: '4 (Black - Blue - Green - Orange)' },
        { name: 'Suction Connector', type: 'checkbox', required: '1' },

        // SECTION: CPR
        { type: 'section', name: 'CPR' },
        { name: 'AED', type: 'checkbox', required: '1' },
        { name: 'AED Battery Level', type: 'slider', required: '100%', min: 0, max: 100, step: 5 },
        { name: 'AED Patches', quantity: true, required: '2' },
        { name: 'CPR Board', type: 'checkbox', required: '1' },

        // SECTION: PPE
        { type: 'section', name: 'PPE' },
        { name: 'Nitrile Gloves Small (Rear)', type: 'slider', quantity: true, required: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Nitrile Gloves Medium (Rear)', type: 'slider', quantity: true, required: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Nitrile Gloves Large (Rear)', type: 'slider', quantity: true, required: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Nitrile Gloves Large (Front)', type: 'slider', quantity: true, required: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Surgical Face Mask (Front)', type: 'slider', quantity: true, required: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Intermediate PPE Kit (for 4 EMTs)', quantity: true, required: '3' },
        { name: 'Intermediate Plus Coverall Medium', quantity: true, required: '1' },
        { name: 'Intermediate Plus Coverall Large', quantity: true, required: '1' },
        { name: 'Intermediate Plus Coverall X-Large', quantity: true, required: '1' },
        { name: 'Protective Glasses or Goggles', quantity: true, required: '4' },
        { name: 'N95 Face Mask', quantity: true, required: '4' },

        // SECTION: Disinfection
        { type: 'section', name: 'Disinfection' },
        { name: 'Trash Bags Large', quantity: true, required: '5' },
        { name: 'Trash Bags Small', quantity: true, required: '10' },
        { name: 'Cleanisept Spray', type: 'checkbox', required: '1' },
        { name: 'Descosept Spray', type: 'checkbox', required: '1' },
        { name: 'Paper Towels', quantity: true, required: '1' },
        { name: 'Hand Sanitizer (Front)', type: 'slider', required: '50% at least', min: 0, max: 100, step: 5 },

        // SECTION: Skin and Hygiene
        { type: 'section', name: 'Skin and Hygiene' },
        { name: 'Disposable Blanket', quantity: true, required: '3' },
        { name: 'Regular Blanket', quantity: true, required: '2' },
        { name: 'Male Urinal', type: 'checkbox', required: '1' },
        { name: 'Female Urinal', type: 'checkbox', required: '1' },
        { name: 'Bed Pan', type: 'checkbox', required: '1' },
        { name: 'Serum', type: 'checkbox', required: '1' },
        { name: 'Blue Pad', quantity: true, required: '3' },                                                          // ✅ REMOVED type: 'checkbox'

        // SECTION: Other
        { type: 'section', name: 'Other' },
        { name: 'Body Bag', quantity: true, required: '2' },                                                          // ✅ REMOVED type: 'checkbox'
        { name: 'Obstetric Kit', type: 'checkbox', required: '1' },
        { name: 'Head Lamp', quantity: true, required: '4' },                                                         // ✅ REMOVED type: 'checkbox'
        { name: 'Disclaimer Report (Front)', quantity: true, required: '5' }
    ]
};



// GLOBAL STATE
let state = JSON.parse(localStorage.getItem('checkupState')) || {
    emt: '', car: '', items: {}, currentPage: 'Medical', submitted: false,
    startTime: null, endTime: null, firstCheckTime: null
};
let currentPageIndex = 0;
const pageOrder = ['Medical', 'Trauma', 'Ambulance Equipment'];
let firstCheckRecorded = false;

// INIT
document.addEventListener('DOMContentLoaded', function () {
    initDropdowns();
    if (state.submitted) {
        showRestock();
    } else {
        renderPage(state.currentPage || 'Medical');
    }
    window.nextPage = nextPage;
    window.prevPage = prevPage;
    window.submitInitial = submitInitial;
    window.submitFinal = submitFinal;
    window.backToCheckup = backToCheckup;
    window.resetAll = resetAll;
    window.newCheckup = newCheckup;
});

function initDropdowns() {
    ['emt', 'car'].forEach(id => {
        const select = document.getElementById(id);
        const options = id === 'emt' ? emts : cars;
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = option.text = opt;
            select.add(option);
        });
        select.value = state[id];
        select.addEventListener('change', () => {
            state[id] = select.value;
            saveState();
        });
    });
}

function recordFirstCheck() {
    if (!firstCheckRecorded && !state.firstCheckTime) {
        state.firstCheckTime = new Date().toISOString();
        state.startTime = state.firstCheckTime;
        firstCheckRecorded = true;
        saveState();
        console.log('⏰ First check recorded at:', state.firstCheckTime);
    }
}

function renderPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    const pageEl = document.getElementById(pageId);

    if (pageEl) {
        pageEl.classList.add('active');
        const container = pageEl.querySelector('.items');
        container.innerHTML = '';

        pages[pageName].forEach(item => {
            if (item.type === 'section') {
                // SECTION HEADERS (unchanged)
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section-header';
                Object.assign(sectionDiv.style, { margin: '30px 0 25px 0' });
                const h3 = document.createElement('h3');
                h3.textContent = item.name;
                Object.assign(h3.style, { margin: '0', fontSize: '1.2em' });
                sectionDiv.appendChild(h3);
                container.appendChild(sectionDiv);
                return;
            }

            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.key = `${pageName}-${item.name}`;
            const key = div.dataset.key;

            // DEFAULT TO 0 FOR QUANTITY ITEMS
            let saved = state.items[key];
            if (!saved) {
                saved = item.quantity ? { quantity: '0', value: '' } : { checked: false, value: '' };
                state.items[key] = saved;
            } else if (item.quantity && !saved.quantity) {
                saved.quantity = '0';
            }

            // ✅ FIXED: QUANTITY-ONLY ITEMS (NO CHECKBOX) - bottles + pure quantity items
            if (item.quantity && !item.type) {
                // Pure quantity items (no explicit type = checkbox)
                const qty = saved.quantity || '0';
                div.innerHTML = `
            <label class="quantity-label">${item.name}</label>
            <input type="number" class="input-quantity" placeholder="Qty" value="${qty}" min="0" step="1">
            <span class="required">Required: ${item.required}</span>
        `;
                div.classList.add('quantity-only');
            } else if (item.type === 'text' && item.quantity) {
                // PSI bottles ONLY
                const psi = saved.quantity || '0';
                div.innerHTML = `
            <label class="quantity-label">${item.name}</label>
            <input type="number" class="input-quantity" placeholder="${item.placeholder}" value="${psi}" min="${item.min ?? 0}" max="${item.max ?? ''}" step="1">
            <span class="required">Required: ${item.required}</span>
        `;
                div.classList.add('quantity-only');
            } else {
                // ✅ ALL OTHER ITEMS (checkbox primary)
                const isChecked = saved.checked || false;
                let inputHTML = `
            <input type="checkbox" id="${key}" ${isChecked ? 'checked' : ''}>
            <label for="${key}">${item.name}</label>
            <span class="required">Required: ${item.required}</span>
        `;

                // Only add quantity input for checkbox items that have quantity
                if (item.quantity && item.type === 'checkbox') {
                    inputHTML += `<input type="number" class="input-quantity" placeholder="Qty" value="${saved.quantity || '0'}" min="0" step="1" ${!isChecked ? 'disabled' : ''}>`;
                }

                if (item.type === 'text' && !item.quantity) {
                    inputHTML += `<input type="number" class="input-value" placeholder="${item.placeholder || 'Enter value'}" value="${saved.value || ''}" min="${item.min || ''}" max="${item.max || ''}" ${!isChecked ? 'disabled' : ''}>`;
                } else if (item.type === 'slider') {
                    const sliderValue = saved.value || 0;
                    inputHTML += `
                <input type="range" class="input-slider" min="${item.min || 0}" max="${item.max || 100}" step="${item.step || 1}" value="${sliderValue}" ${!isChecked ? 'disabled' : ''}>
                <span class="slider-value ${!isChecked ? 'disabled' : ''}">${sliderValue}%</span>
            `;
                }

                div.innerHTML = inputHTML;
            }

            container.appendChild(div);
            setupItemEvents(div, item, key);
        });

        state.currentPage = pageName;
        saveState();
    }
}

function setupItemEvents(div, item, key) {
    // QUANTITY-ONLY ITEMS
    if (div.classList.contains('quantity-only')) {
        const quantityInput = div.querySelector('.input-quantity');
        div.style.cursor = 'default';
        quantityInput.addEventListener('input', () => {
            state.items[key].quantity = quantityInput.value || '0';
            if (state.currentPage === 'Medical' && !firstCheckRecorded && quantityInput.value > 0) {
                recordFirstCheck();
            }
            saveState();
        });
        return;
    }

    // CHECKBOX ITEMS
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const valueInput = div.querySelector('.input-value, .input-slider');
    const sliderValueEl = div.querySelector('.slider-value');

    // Make entire item clickable
    div.style.cursor = 'pointer';
    div.addEventListener('click', function (e) {
        if (e.target.type === 'range' || e.target.type === 'number') return;
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });

    checkbox.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    checkbox.addEventListener('change', () => {
        if (state.currentPage === 'Medical' && !firstCheckRecorded) {
            recordFirstCheck();
        }
        toggleInputs(div, item);
        saveItem(key, div);
    });

    if (quantityInput) {
        quantityInput.addEventListener('input', () => saveItem(key, div));
    }
    if (valueInput && !valueInput.disabled) {
        valueInput.addEventListener('input', () => saveItem(key, div));
        if (item.type === 'slider' && sliderValueEl) {
            const updateSliderDisplay = () => {
                sliderValueEl.textContent = `${valueInput.value}%`;
                saveItem(key, div);
            };
            valueInput.oninput = updateSliderDisplay;
            updateSliderDisplay();
        }
    }
}

function toggleInputs(div, item) {
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const valueInput = div.querySelector('.input-value, .input-slider');
    const sliderValueEl = div.querySelector('.slider-value');

    const isChecked = checkbox.checked;

    if (quantityInput) quantityInput.disabled = !isChecked;
    if (valueInput) valueInput.disabled = !isChecked;
    if (sliderValueEl) {
        sliderValueEl.className = `slider-value ${!isChecked ? 'disabled' : ''}`;
    }

    if (isChecked && valueInput && item.type === 'slider') {
        const updateSliderDisplay = () => {
            sliderValueEl.textContent = `${valueInput.value}%`;
        };
        valueInput.oninput = updateSliderDisplay;
        updateSliderDisplay();
    }
}

function saveItem(key, div) {
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const valueInput = div.querySelector('.input-value, .input-slider');

    state.items[key] = {
        checked: checkbox ? checkbox.checked : false,
        quantity: quantityInput ? (quantityInput.value || '0') : state.items[key]?.quantity || '0',
        value: valueInput ? valueInput.value : ''
    };
    saveState();
}

function saveState() {
    localStorage.setItem('checkupState', JSON.stringify(state));
}

function nextPage() {
    currentPageIndex = Math.min(currentPageIndex + 1, pageOrder.length - 1);
    renderPage(pageOrder[currentPageIndex]);
}

function prevPage() {
    currentPageIndex = Math.max(currentPageIndex - 1, 0);
    renderPage(pageOrder[currentPageIndex]);
}

function submitInitial() {
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;

    if (!state.emt || !state.car) {
        alert('Please select EMT and Car first!');
        return;
    }

    // Initialize all items
    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section') {
                const key = `${pageName}-${item.name}`;
                if (!state.items[key]) {
                    state.items[key] = item.quantity ? { quantity: '0' } : { checked: false, value: '' };
                }
            }
        });
    });
    saveState();

    const allData = Object.entries(state.items).map(([key, data]) => ({
        timestamp: new Date().toISOString(),
        start_time: state.startTime || '',
        first_check_time: state.firstCheckTime || '',
        emt: state.emt,
        car: state.car,
        phase: 'INITIAL CHECKUP',
        item: key.split('-').slice(1).join(' '),
        status: data.quantity && parseInt(data.quantity) > 0 ? '✅ PRESENT' :
            data.checked ? '✅ PRESENT' : '❌ MISSING',
        quantity: data.quantity || '0',
        psi_value: data.value || ''
    }));

    const dataStr = JSON.stringify(allData);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', SCRIPT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('✅ Initial Status:', xhr.status, xhr.responseText);
            state.submitted = true;
            saveState();
            showRestock();
        }
    };

    xhr.send('data=' + encodeURIComponent(dataStr));
}

function showRestock() {
    if (!state.endTime) {
        state.endTime = new Date().toISOString();
        saveState();
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('restock').classList.add('active');

    const restockList = document.getElementById('restock-list');
    restockList.innerHTML = '';

    let totalItemsPresent = 0;
    let totalItemsMissing = 0;
    const allMissingItems = [];

    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section') {
                const key = `${pageName}-${item.name}`;
                if (!state.items[key]) {
                    state.items[key] = item.quantity ? { quantity: '0' } : { checked: false };
                }

                const itemData = state.items[key];
                const hasQuantity = parseInt(itemData.quantity || '0') > 0;
                const isChecked = itemData.checked || false;

                if (hasQuantity || isChecked) {
                    totalItemsPresent++;
                } else {
                    totalItemsMissing++;
                    allMissingItems.push({ key, item, pageName });
                }
            }
        });
    });

    if (allMissingItems.length === 0) {
        restockList.innerHTML = '<div style="text-align:center;padding:40px;color:#28a745;font-size:1.5em;">✅ All items were present in ambulance!</div>';
        return;
    }

    allMissingItems.forEach(({ key, item, pageName }, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.id = `restock-item-${index}`;

        div.innerHTML = `
            <input type="checkbox" id="${key}-restock">
            <label for="${key}-restock">
                <strong>${pageName}:</strong> ${item.name}
                <span style="color:#ff9800;font-weight:bold;">(Missing from ambulance)</span>
            </label>
            <span class="required">Restock needed</span>
        `;

        const checkbox = div.querySelector('input[type=checkbox]');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                // ✅ FIXED: Use 100% for percentage items, required value for others
                if (item.quantity && item.required.includes('%')) {
                    state.items[key].quantity = '100';
                } else if (item.quantity) {
                    // Extract first number from required (e.g., "3 (Large Adult...)" → "3")
                    const firstNumber = item.required.match(/^\d+/)?.[0] || '1';
                    state.items[key].quantity = firstNumber;
                } else {
                    state.items[key].checked = true;
                }
                saveState();

                div.style.background = '#d4edda';
                div.style.borderColor = '#28a745';
                const label = div.querySelector('label');
                label.innerHTML = `
                    <strong>${pageName}:</strong> ${item.name}
                    <span style="color:#28a745;font-weight:bold;">✅ RESTOCKED</span>
                `;

                setTimeout(() => {
                    div.remove();
                    const remaining = document.querySelectorAll('#restock-list .item');
                    if (remaining.length === 0) {
                        restockList.innerHTML = '<div style="text-align:center;padding:40px;color:#28a745;font-size:1.5em;">✅ All restocked! Ready for final submit.</div>';
                    }
                }, 1200);
            }
        });

        restockList.appendChild(div);
    });

    const summaryDiv = document.createElement('div');
    summaryDiv.style.cssText = 'text-align:center;margin-top:30px;padding:20px;background:#fff3cd;border-radius:10px;font-size:1.2em;color:#e74c3c;border:2px solid #ffc107;';

    const totalTime = state.endTime && state.startTime ?
        ((new Date(state.endTime) - new Date(state.startTime)) / 1000 / 60).toFixed(1) : 'N/A';

    summaryDiv.innerHTML = `
        📋 <strong>${totalItemsMissing} items missing</strong> from ambulance - 
        <span style="color:#28a745;">${totalItemsPresent} items were present</span>
        <br><strong>⏱️ Total Checkup Time: ${totalTime} minutes</strong>
    `;
    restockList.appendChild(summaryDiv);
}


function newCheckup() {
    if (confirm('Complete! Start new ambulance checkup?')) {
        state = {
            emt: '',
            car: '',
            items: {},
            currentPage: 'Medical',
            submitted: false,
            startTime: null,
            endTime: null,
            firstCheckTime: null
        };
        firstCheckRecorded = false;
        saveState();
        currentPageIndex = 0;
        document.getElementById('emt').value = '';
        document.getElementById('car').value = '';
        renderPage('Medical');
        console.log('✅ New checkup ready!');
    }
}

function submitFinal() {
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;

    const finalData = Object.entries(state.items).map(([key, data]) => ({
        start_time: state.startTime || '',
        end_time: state.endTime || '',
        checkup_time: state.endTime && state.startTime ?
            ((new Date(state.endTime) - new Date(state.startTime)) / 1000 / 60).toFixed(1) + ' minutes' : 'N/A',
        emt: state.emt,
        car: state.car,
        phase: 'FINAL RESTOCK',
        item: key.split('-').slice(1).join(' '),
        final_status: (data.quantity && parseInt(data.quantity) > 0) || data.checked ? '✅ RESTOCKED' : '⚠️ WAREHOUSE OUT OF STOCK',
        quantity: data.quantity || '0',
        psi_value: data.value || ''
    }));

    const dataStr = JSON.stringify(finalData);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', SCRIPT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('✅ Final Status:', xhr.status, xhr.responseText);
            newCheckup();
        }
    };

    xhr.send('data=' + encodeURIComponent(dataStr));
}

function backToCheckup() {
    state.submitted = false;
    saveState();
    currentPageIndex = pageOrder.indexOf(state.currentPage || 'Medical');
    renderPage(state.currentPage || 'Medical');
}

function resetAll() {
    if (confirm('Reset everything?')) {
        localStorage.removeItem('checkupState');
        location.reload();
    }
}
