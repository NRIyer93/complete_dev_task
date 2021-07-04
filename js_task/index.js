function fetchData() {
    return fetch('./data/emotion_data.json'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => sortData(data));
}

function addListener() {
    const displayDataBtn = document.getElementById("displayDataBtn");
    displayDataBtn.addEventListener("click", () => {
        fetchData();
    })
}

function sortData(data) {
    const logCount = [];
    const emotionName = [];

    // loop through each element and render chart here
    for (let i = 0; i < data.length; i++) {
        emotionName.push(data[i].emotion);
        logCount.push(data[i].log_count);
    }

    renderBarChart(emotionName, logCount);
}

function renderBarChart(emotionName, logCount) {
    const dataToDisplay = {
        labels: emotionName,
        datasets: [{
            label: 'Emotion Dataset',
            data: logCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,

        }],
    };

    const config = {
        type: 'bar',
        data: dataToDisplay,
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    display: true,
                    title: {
                        display: true,
                        text: 'Emotion',
                        color: '#283961',
                        font: {
                            size: 20,
                            weight: 'bold',
                        },
                    }
                },
                y: {
                    beginAtZero: true,
                    display: true,
                    title: {
                        display: true,
                        text: 'Count',
                        color: '#283961',
                        font: {
                            size: 20,
                            weight: 'bold',
                        },
                    }
                }
            },
        },
    };

    const dataChart = new Chart(
        document.getElementById('barChart'),
        config
    );
}

addListener();