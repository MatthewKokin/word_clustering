export const wordData = [
    {
        word: 'admonish',
        definition: 'to warn strongly, even to the point of reprimanding',
        part_of_speech: 'verb',
        example: 'The teacher admonished the students for talking during the lecture.',
        cluster: '🗣️ Harsh Criticism',
        word_id: '1'
    },
    {
        word: 'ascetic',
        definition: 'practicing self-denial',
        part_of_speech: 'adjective',
        example: 'The monk led an ascetic life of simplicity and solitude.',
        cluster: '🧘‍♂️ Self-Denial',
        word_id: '2'
    },
    {
        word: 'banality',
        definition: 'a trite or obvious remark',
        part_of_speech: 'noun',
        example: 'The conversation was filled with banality and small talk.',
        cluster: '💬 Trite Remarks',
        word_id: '3'
    },
    {
        word: 'copious',
        definition: 'in abundant supply',
        part_of_speech: 'adjective',
        example: 'The copious notes taken by the student were very helpful during exams.',
        cluster: '🌱 Abundance',
        word_id: '4'
    },
    {
        word: 'cryptic',
        definition: 'mysterious or vague, usually intentionally',
        part_of_speech: 'adjective',
        example: 'His cryptic response left everyone in confusion.',
        cluster: '🕵️‍♂️ Vague or Ambiguous',
        word_id: '5'
    }
];


export const validClusters = [
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



async function loadCSV() {
    const response = await fetch('test_data.csv');
    const data = await response.text();

    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const wordData = rows.slice(1).map(row => {
        return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
        }, {});
    });
    console.log(wordData);
    return wordData;
}

// export const wordData_2 = loadCSV()