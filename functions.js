import { validClusters } from "./data.js";

export function sortWordsByClusters(wordData) {
    // Return an object with keys of cluster names and arrays
    const clusters = {};
    wordData.forEach(word => {
        if (validClusters.includes(word.cluster)) {
            clusters[word.cluster] = clusters[word.cluster] ? clusters[word.cluster] : [];
            clusters[word.cluster].push(word);
        }
    });
    return clusters
}

export function populateFilterDropdown(clusters, clusterFilter) {
    Object.keys(clusters).forEach(cluster => {
        const option = document.createElement('option');
        option.value = cluster;
        option.textContent = cluster;
        clusterFilter.appendChild(option);
    });
}

