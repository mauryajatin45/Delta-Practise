let textarea = document.querySelector(".textarea");
let timer = document.querySelector(".timer");
let btn = document.querySelector(".btn");
let userinput = document.querySelector(".userinput");
let subcontainer = document.querySelector(".subcontainer");
let toastnotification = document.querySelector(".toastnotification");
let close = document.querySelector(".close");
let wpmHTML = document.querySelector(".wpm");
let errorsHTML = document.querySelector(".errors");
let cpmHTML = document.querySelector(".cpm");
let second = 59;

let str = "In a small town nestled between rolling hills and expansive meadows, autumn arrived with a gentle breeze, rustling the leaves into a vibrant tapestry of reds, oranges, and yellows. The days grew shorter, and a crispness filled the air, signaling the time for harvest and reflection. Every year, the townsfolk gathered for the annual Fall Festival, a celebration that brought the community together to honor the changing season and the bounties it provided. As the sun dipped below the horizon, the town square transformed into a lively hub of activity. Stalls lined the cobblestone streets, each offering handmade crafts, fresh produce, and the delightful aroma of baked goods. Children laughed as they raced to the pumpkin patch, their hands stained with orange from the pumpkins they picked. Families took turns bobbing for apples, their delighted squeals punctuating the air as they splashed water onto their friends. Amidst the festivities, local musicians set up on a small stage, filling the night with melodies that echoed against the starry sky. The sweet sounds of folk music wove through the crowd, drawing people to the dance floor, where couples spun and twirled beneath the soft glow of fairy lights. Laughter mingled with music, creating a symphony of joy that enveloped everyone present. As darkness deepened, a storyteller took center stage, her voice smooth and captivating. She shared tales of the town's history, legends of harvests past, and the importance of community. Her words painted vivid pictures, reminding everyone of the bonds that held them together, especially during these times of change. The festival culminated in a spectacular display of fireworks, lighting up the night sky with bursts of color. Faces turned upward, illuminated by the glow, as the crowd marveled at the beauty above. In that moment, with hearts full of gratitude and connection, the townsfolk celebrated not only the season but also the spirit of togetherness that defined their little corner of the world.";

let WPM = 0;
let Errors = 0;
let correctChars = 0;
textarea.innerHTML = str;

let interval;
let startTime;

btn.addEventListener('click', () => {
    startTest();
});

function startTest() {
    btn.innerHTML = "Type...";
    userinput.style.display = 'block';
    userinput.value = ''; 
    textarea.style.height = '60%';
    timer.style.bottom = '31%';
    
    clearInterval(interval);
    second = 59; 
    startTime = Date.now();

    interval = setInterval(() => {
        if (second >= 0) {
            timer.innerHTML = `Time remaining: ${second}s`;
            second--;
        }
        if (second < 0) {
            ResetNormal();
        }
    }, 1000);
}

close.addEventListener('click', refreshPage);
function refreshPage() {
    location.reload(); 
}

function showToast() {
    subcontainer.style.filter = 'blur(5px)';
    toastnotification.style.display = 'flex';
    toastnotification.classList.add('show');
}

function ResetNormal() {
    clearInterval(interval);
    btn.innerHTML = "Test Again";
    userinput.style.display = 'none';

    let elapsedTime = (Date.now() - startTime) / 60000;
    let wordsTyped = userinput.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    WPM = Math.round(wordsTyped / elapsedTime);
    
    wpmHTML.innerHTML = `WPM: ${WPM}`;
    errorsHTML.innerHTML = `Errors: ${Errors}`;
    cpmHTML.innerHTML = `CPM: ${correctChars}`;

    showToast();
}

userinput.addEventListener('input', (e) => {
    const inputText = e.target.value;
    let highlightedText = '';
    correctChars = 0;
    Errors = 0;

    for (let i = 0; i < str.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === str[i]) {
                highlightedText += `<span style="background-color: lime;">${inputText[i]}</span>`;
                correctChars++;
            } else {
                highlightedText += `<span style="background-color: red;">${inputText[i]}</span>`;
                Errors++;
            }
        } else {
            highlightedText += `<span>${str[i]}</span>`;
        }
    }

    textarea.innerHTML = highlightedText;
    const linesTyped = inputText.split('\n').length;

    if (linesTyped >= 3) {
        textarea.scrollBy({
            top: 60,
            behavior: 'smooth'
        });
    }

    if (inputText === str) {
        clearInterval(interval);
        timer.innerHTML = "Well done! Time's up!";
        userinput.style.display = 'none';
        return;
    }
});
