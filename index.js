import { wordData } from "./data.js";
import {sortWordsByClusters, populateFilterDropdown} from "./functions.js"
// List of valid cluster names (make sure this matches the actual cluster names you expect)

// async function loadCSV(csv_name) {
//     const response = await fetch(csv_name);
//     const data = await response.text();

//     const rows = data.split('\n').map(row => row.split(','));
//     const headers = rows[0];
//     const wordData = rows.slice(1).map(row => {
//         return headers.reduce((obj, header, index) => {
//             obj[header] = row[index];
//             return obj;
//         }, {});
//     });
//     console.log('Load_CSV worked! ' + wordData);
//     return wordData;
// }

async function loadCSV() {
    const response = await fetch('clustered_words_final.csv');
    const data = await response.text();

    // Parse CSV data
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const wordData = rows.slice(1).map(row => {
        return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
        }, {});
    });

    return wordData;
}

/*
- You get an array of objects wordData
- After sorting words into clusters you
*/ 

// Filter wordData to only include valid clusters and render tables
function renderTables(wordData) {
    const clusters = sortWordsByClusters(wordData)
    const clustersContainer = document.getElementById('clusters-container');
    const clusterFilter = document.getElementById('cluster-filter');
    populateFilterDropdown(clusters, clusterFilter)

    function createTable() {

    }
    // Render tables for each cluster
    Object.keys(clusters).forEach(cluster => {
        const clusterTitle = document.createElement('div');
        clusterTitle.className = 'cluster-title';
        clusterTitle.textContent = cluster;

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['Word', 'Part of Speech', 'Example'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        clusters[cluster].forEach(word => {
            const row = document.createElement('tr');
            ['word', 'part_of_speech', 'example'].forEach(field => {
                const td = document.createElement('td');
                td.textContent = word[field];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const clusterDiv = document.createElement('div');
        clusterDiv.className = 'cluster';
        clusterDiv.dataset.cluster = cluster;
        clusterDiv.appendChild(clusterTitle);
        clusterDiv.appendChild(table);

        clustersContainer.appendChild(clusterDiv);
    });
}

// Filter clusters based on the slicer selection
function setupFilter() {
    const clusterFilter = document.getElementById('cluster-filter');
    clusterFilter.addEventListener('change', () => {
        const selectedClusters = Array.from(clusterFilter.selectedOptions).map(opt => opt.value);
        document.querySelectorAll('.cluster').forEach(clusterDiv => {
            clusterDiv.classList.toggle('hidden', !selectedClusters.includes(clusterDiv.dataset.cluster));
        });
    });
}

// Initialize page with CSV file input
async function initialize(csv_name) {
    // const wordData = await loadCSV(csv_name);
    renderTables(wordData);
    setupFilter();
}

// Call initialize with the CSV file name
initialize();