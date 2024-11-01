import { wordData } from "./data.js";
import {sortWordsByClusters, populateFilterDropdown} from "./functions.js"


/*
- You get an array of objects wordData
- After sorting words into clusters you
*/ 

// Filter wordData to only include valid clusters and render tables
function renderTables(wordData) {
    const clusters = sortWordsByClusters(wordData);
    const clustersContainer = document.getElementById('clusters-container');
    const clusterButtonContainer = document.getElementById('cluster-button-container'); // Container for cluster buttons

    // Create a button for each cluster
    Object.keys(clusters).forEach(cluster => {
        const button = document.createElement('button');
        button.className = 'cluster-button';
        button.textContent = cluster;
        button.dataset.cluster = cluster;
        button.onclick = () => toggleClusterVisibility(cluster); // Attach click event
        clusterButtonContainer.appendChild(button);

        // Create the table for each cluster
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
                td.textContent = word[field] || "(missing)"; // Show "(missing)" if part_of_speech is missing
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const clusterDiv = document.createElement('div');
        clusterDiv.className = 'cluster';
        clusterDiv.dataset.cluster = cluster;
        clusterDiv.style.display = 'none'; // Hide initially
        clusterDiv.appendChild(clusterTitle);
        clusterDiv.appendChild(table);

        clustersContainer.appendChild(clusterDiv);
    });
}

// Toggle cluster visibility on button click
function toggleClusterVisibility(cluster) {
    const clusterDiv = document.querySelector(`.cluster[data-cluster="${cluster}"]`);
    const button = document.querySelector(`.cluster-button[data-cluster="${cluster}"]`);
    
    // Toggle visibility
    if (clusterDiv.style.display === 'none') {
        clusterDiv.style.display = 'block';
        button.classList.add('active'); // Add active class for styling
    } else {
        clusterDiv.style.display = 'none';
        button.classList.remove('active'); // Remove active class
    }
}

// Initialize page
function initialize() {
    renderTables(wordData);
}

initialize();
