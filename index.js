import { wordData } from "./data.js";
import { sortWordsByClusters } from "./functions.js";

function renderTables(wordData) {
    const clusters = sortWordsByClusters(wordData);
    const clustersContainer = document.getElementById('clusters-container');
    const clusterButtonContainer = document.getElementById('cluster-button-container');

    // Create "Select All" button
    const selectAllButton = document.createElement('button');
    selectAllButton.className = 'select-all-button';
    selectAllButton.textContent = 'Select All';
    selectAllButton.onclick = () => toggleAllClusters(selectAllButton, clusters);
    clusterButtonContainer.appendChild(selectAllButton);

    // Create a button and table for each cluster
    Object.keys(clusters).forEach(cluster => {
        const button = document.createElement('button');
        button.className = 'cluster-button';
        button.textContent = cluster;
        button.dataset.cluster = cluster;
        button.onclick = () => toggleClusterVisibility(cluster);
        clusterButtonContainer.appendChild(button);

        const clusterTitle = document.createElement('div');
        clusterTitle.className = 'cluster-title';
        clusterTitle.textContent = cluster;

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['Word', 'Part of Speech', 'Definition', 'Example'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        clusters[cluster].forEach(word => {
            const row = document.createElement('tr');
            ['word', 'part_of_speech', 'definition', 'example'].forEach(field => {
                const td = document.createElement('td');
                td.textContent = word[field] || "(missing)";
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        const clusterDiv = document.createElement('div');
        clusterDiv.className = 'cluster';
        clusterDiv.dataset.cluster = cluster;
        clusterDiv.style.display = 'none';
        clusterDiv.appendChild(clusterTitle);
        clusterDiv.appendChild(table);

        clustersContainer.appendChild(clusterDiv);
    });
}

function toggleClusterVisibility(cluster) {
    const clusterDiv = document.querySelector(`.cluster[data-cluster="${cluster}"]`);
    const button = document.querySelector(`.cluster-button[data-cluster="${cluster}"]`);
    
    if (clusterDiv.style.display === 'none') {
        clusterDiv.style.display = 'block';
        button.classList.add('active');
    } else {
        clusterDiv.style.display = 'none';
        button.classList.remove('active');
    }
}

// Function to toggle all clusters at once
function toggleAllClusters(selectAllButton, clusters) {
    const isAllSelected = selectAllButton.textContent === 'Deselect All';
    const clusterElements = document.querySelectorAll('.cluster');
    const clusterButtons = document.querySelectorAll('.cluster-button');

    // Show or hide all clusters
    clusterElements.forEach(clusterDiv => {
        clusterDiv.style.display = isAllSelected ? 'none' : 'block';
    });

    // Update button styles and text
    clusterButtons.forEach(button => {
        if (isAllSelected) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    });

    // Toggle the "Select All" button text
    selectAllButton.textContent = isAllSelected ? 'Select All' : 'Deselect All';
}

function initialize() {
    renderTables(wordData);
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});
