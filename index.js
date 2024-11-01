// List of valid cluster names (make sure this matches the actual cluster names you expect)
const validClusters = [
    "🗣️ Harsh Criticism", "🧘‍♂️ Self-Denial", "💬 Trite Remarks", "🌱 Abundance",
    "⬆️⬇️ Highest and Lowest Points", "⏳ Short-Lived", "🙌 Praise", "🚧 Hindrance",
    "🔥 Unorthodox Opinions", "🎭 Distinctive Traits", "😴 Dull or Lacking Imagination",
    "😡 Irritable", "⚔️ Verbal Attack", "💰 Frugality", "💥 Aggressiveness and Defiance",
    "📜 Short Truths", "⚖️ Duty and Responsibility", "🤝 Social and Modest", 
    "😏 Mocking and Ridiculing", "🤥 Deception", "🥷 Troublemakers", 
    "🕵️‍♂️ Vague or Ambiguous", "😠 Intense Irritation", "🚫 Lack of", "⚔️ War-like", 
    "🛑 Rejection with Contempt", "💸 Extravagance and Poverty", "💤 Lack of Energy", 
    "😢 Sorrowful", "💵 Poverty", "😡 Anger", "Noise"
];

// Load and parse the CSV file
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

// Filter wordData to only include valid clusters and render tables
function renderTables(wordData) {
    const clusters = {};
    
    // Organize words by cluster, filtering only valid clusters
    wordData.forEach(word => {
        if (validClusters.includes(word.cluster)) {
            if (!clusters[word.cluster]) {
                clusters[word.cluster] = [];
            }
            clusters[word.cluster].push(word);
        }
    });

    const clustersContainer = document.getElementById('clusters-container');
    const clusterFilter = document.getElementById('cluster-filter');

    // Populate the filter dropdown
    Object.keys(clusters).forEach(cluster => {
        const option = document.createElement('option');
        option.value = cluster;
        option.textContent = cluster;
        clusterFilter.appendChild(option);
    });

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
            ['word', 'part of speech', 'example'].forEach(field => {
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

// Initialize page
async function initialize() {
    const wordData = await loadCSV();
    renderTables(wordData);
    setupFilter();
}

initialize();
