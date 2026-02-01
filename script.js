// CONFIGURATION - YOUR URL IS CORRECT
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhzofDyEZWPHsHSPhzlkYNBVOl7ukLa9a9124UM_cEqoQpUu4fWBk_gNxDQRSvL44H/exec';
const emts = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown'];
const cars = ['Ambulance 101', 'Ambulance 102', 'Ambulance 103', 'Ambulance 104'];

const pages = {
    Medical: [
        { name: 'Bandages', type: 'checkbox', required: 'Present' },
        { name: 'Gauze packs', type: 'checkbox', required: 'Full kit' },
        { name: 'BP cuff', type: 'checkbox', required: 'Functional' },
        { name: 'Stethoscope', type: 'checkbox', required: 'Working' },
    ],
    Trauma: [
        { name: 'Tourniquets', type: 'checkbox', required: '2+ functional' },
        { name: 'Trauma dressings', type: 'checkbox', required: '10+' },
        { name: 'Chest seals', type: 'checkbox', required: '4+' },
        { name: 'Hemostatic gauze', type: 'checkbox', required: 'Present' },
    ],
    Vehicle: [
        { name: 'O2 bottles', type: 'text', required: '500 PSI', placeholder: 'Enter PSI', min: 0, max: 2000 },
        { name: 'Glove boxes', type: 'slider', required: '100%', min: 0, max: 100, step: 5 },
        { name: 'Duct tape', type: 'slider', required: '100%', min: 0, max: 100, step: 5 },
        { name: 'Fire extinguisher', type: 'checkbox', required: 'Charged' },
        { name: 'Suction unit', type: 'checkbox', required: 'Operational' },
        { name: 'AED', type: 'checkbox', required: 'Functional' },
    ]
};

// GLOBAL STATE
let state = JSON.parse(localStorage.getItem('checkupState')) || {
    emt: '', car: '', items: {}, currentPage: 'Medical', submitted: false
};
let currentPageIndex = 0;
const pageOrder = ['Medical', 'Trauma', 'Vehicle'];

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
    window.newCheckup = newCheckup; // ✅ NEW: Start fresh checkup
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

function renderPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const pageEl = document.getElementById(pageName.toLowerCase());
    if (pageEl) {
        pageEl.classList.add('active');
        const container = pageEl.querySelector('.items');
        container.innerHTML = '';

        pages[pageName].forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.key = `${pageName}-${item.name}`;
            const key = div.dataset.key;
            const saved = state.items[key] || { checked: false, value: '' };
            const isChecked = saved.checked;

            let inputHTML = `
                <input type="checkbox" id="${key}" ${isChecked ? 'checked' : ''}>
                <label for="${key}">${item.name}</label>
                <span class="required">Required: ${item.required}</span>
            `;

            switch (item.type) {
                case 'text':
                    inputHTML += `<input type="number" class="input-value" placeholder="${item.placeholder || 'Enter value'}" value="${saved.value || ''}" min="${item.min || ''}" max="${item.max || ''}" ${!isChecked ? 'disabled' : ''}>`;
                    break;
                case 'slider':
                    const sliderValue = saved.value || 0;
                    inputHTML += `
                        <input type="range" class="input-slider" min="${item.min || 0}" max="${item.max || 100}" step="${item.step || 1}" value="${sliderValue}" ${!isChecked ? 'disabled' : ''}>
                        <span class="slider-value ${!isChecked ? 'disabled' : ''}">${sliderValue}%</span>
                    `;
                    break;
            }

            div.innerHTML = inputHTML;
            container.appendChild(div);
            setupItemEvents(div, item);
        });

        state.currentPage = pageName;
        saveState();
    }
}

function setupItemEvents(div, item) {
    const key = div.dataset.key;
    const checkbox = div.querySelector('input[type=checkbox]');
    const valueInput = div.querySelector('.input-value, .input-slider');
    const sliderValueEl = div.querySelector('.slider-value');

    checkbox.addEventListener('change', () => {
        toggleInputs(div, item);
        saveItem(key, div);
    });

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
    const valueInput = div.querySelector('.input-value, .input-slider');
    const sliderValueEl = div.querySelector('.slider-value');

    const isChecked = checkbox.checked;

    if (valueInput) {
        valueInput.disabled = !isChecked;
    }

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
    const valueInput = div.querySelector('.input-value, .input-slider');

    state.items[key] = {
        checked: checkbox.checked,
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

// ✅ CORS-PROOF SUBMIT
function submitInitial() {
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;

    if (!state.emt || !state.car) {
        alert('Please select EMT and Car first!');
        return;
    }

    ['Medical', 'Trauma', 'Vehicle'].forEach(pageName => {
        pages[pageName].forEach(item => {
            const key = `${pageName}-${item.name}`;
            if (!state.items[key]) state.items[key] = { checked: false, value: '' };
        });
    });
    saveState();

    // ✅ 14 ROWS: One entry per item
    const allData = Object.entries(state.items).map(([key, data]) => ({
        timestamp: new Date().toISOString(),
        emt: state.emt,
        car: state.car,
        phase: 'INITIAL CHECKUP',
        item: key.split('-').slice(1).join(' '),  // Just item name
        checked: data.checked ? '✅ PRESENT' : '❌ MISSING'
    }));

    const dataStr = JSON.stringify(allData);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', SCRIPT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('✅ Initial checkup submitted! Status:', xhr.status);
            state.submitted = true;
            saveState();
            showRestock();
        }
    };

    xhr.send('data=' + encodeURIComponent(dataStr));
}

function showRestock() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('restock').classList.add('active');

    const restockList = document.getElementById('restock-list');
    restockList.innerHTML = '';

    let totalItemsChecked = 0;
    let totalItemsMissing = 0;
    const allMissingItems = [];

    ['Medical', 'Trauma', 'Vehicle'].forEach(pageName => {
        pages[pageName].forEach(item => {
            const key = `${pageName}-${item.name}`;
            if (!state.items[key]) {
                state.items[key] = { checked: false, value: '' };
            }

            const itemData = state.items[key];
            if (itemData.checked) {
                totalItemsChecked++;
            } else {
                totalItemsMissing++;
                allMissingItems.push({ key, item, pageName });
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
                state.items[key].checked = true;
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
    summaryDiv.innerHTML = `
        📋 <strong>${totalItemsMissing} items missing</strong> from ambulance - 
        <span style="color:#28a745;">${totalItemsChecked} items were present</span>
    `;
    restockList.appendChild(summaryDiv);
}

// ✅ FIXED: Clears state after final submit
function submitFinal() {
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;

    // ✅ 14 ROWS: One entry per item (final status only)
    const finalData = Object.entries(state.items).map(([key, data]) => ({
        timestamp: new Date().toISOString(),
        emt: state.emt,
        car: state.car,
        phase: 'FINAL RESTOCK',
        item: key.split('-').slice(1).join(' '),  // Just item name
        final_status: data.checked ? '✅ RESTOCKED' : '⚠️ WAREHOUSE OUT OF STOCK'
    }));

    const dataStr = JSON.stringify(finalData);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', SCRIPT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('✅ Final restock submitted!');
            newCheckup();
        }
    };

    xhr.send('data=' + encodeURIComponent(dataStr));
}

// ✅ NEW: Start completely fresh checkup
function newCheckup() {
    if (confirm('Complete! Start new ambulance checkup?')) {
        // Clear ALL state
        state = {
            emt: '',
            car: '',
            items: {},
            currentPage: 'Medical',
            submitted: false
        };
        saveState();
        currentPageIndex = 0;
        document.getElementById('emt').value = '';
        document.getElementById('car').value = '';
        renderPage('Medical');
        console.log('✅ New checkup ready!');
    }
}

function backToCheckup() {
    state.submitted = false;
    saveState();
    currentPageIndex = pageOrder.indexOf(state.currentPage || 'Medical');
    renderPage(state.currentPage || 'Medical');
}

function showSuccess() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('success').classList.add('active');
}

function resetAll() {
    if (confirm('Reset everything?')) {
        localStorage.removeItem('checkupState');
        location.reload();
    }
}
