let textarea = document.querySelector(".textarea");
let timer = document.querySelector(".timer");
let btn = document.querySelector(".btn");
let userinput = document.querySelector(".userinput");
let subcontainer = document.querySelector(".subcontainer");
let toastnotification = document.querySelector(".toastnotification");
let close = document.querySelector(".close");

let second = 0;
let str = "In a small town nestled between rolling hills and expansive meadows, autumn arrived with a gentle breeze, rustling the leaves into a vibrant tapestry of reds, oranges, and yellows. The days grew shorter, and a crispness filled the air, signaling the time for harvest and reflection. Every year, the townsfolk gathered for the annual Fall Festival, a celebration that brought the community together to honor the changing season and the bounties it provided. As the sun dipped below the horizon, the town square transformed into a lively hub of activity. Stalls lined the cobblestone streets, each offering handmade crafts, fresh produce, and the delightful aroma of baked goods. Children laughed as they raced to the pumpkin patch, their hands stained with orange from the pumpkins they picked. Families took turns bobbing for apples, their delighted squeals punctuating the air as they splashed water onto their friends. Amidst the festivities, local musicians set up on a small stage, filling the night with melodies that echoed against the starry sky. The sweet sounds of folk music wove through the crowd, drawing people to the dance floor, where couples spun and twirled beneath the soft glow of fairy lights. Laughter mingled with music, creating a symphony of joy that enveloped everyone present. As darkness deepened, a storyteller took center stage, her voice smooth and captivating. She shared tales of the town's history, legends of harvests past, and the importance of community. Her words painted vivid pictures, reminding everyone of the bonds that held them together, especially during these times of change. The festival culminated in a spectacular display of fireworks, lighting up the night sky with bursts of color. Faces turned upward, illuminated by the glow, as the crowd marveled at the beauty above. In that moment, with hearts full of gratitude and connection, the townsfolk celebrated not only the season but also the spirit of togetherness that defined their little corner of the world.";
textarea.innerHTML = str;

let interval;

btn.addEventListener('click', () => {
    btn.innerHTML = "Type...";
    userinput.style.display = 'block';
    textarea.style.height = '60%';
    timer.style.bottom = '31%';


    clearInterval(interval);

    interval = setInterval(() => {
        if (second >= 0) {
            timer.innerHTML = `Time remaing: ${second}s`;
            second--;
        }

        if (second < 0) {
            clearInterval(interval);
            btn.innerHTML = "Test Again";
            userinput.style.display = 'none';
            textarea.style.height = '70%';
            timer.style.bottom = '22%';
            timer.style.left = '21%';
            second = 60;
            subcontainer.style.filter = 'blur(5px)';
            toastnotification.style.display = 'flex';
            showToast();
        }
    }, 1000);
});

close.addEventListener('click', () => {
    subcontainer.style.filter = 'blur(0px)';
    toastnotification.style.display = 'none';
});

function showToast() {
    toastnotification.classList.add('show');
    
    setTimeout(() => {
        toastnotification.classList.remove('show'); 
        subcontainer.style.filter = 'blur(0px)';
    }, 10000);
}

// Call this function where you want to show the notification



userinput.addEventListener('input', (e) => {
    const inputText = e.target.value;
    if (str.startsWith(inputText)) {
        // Highlight correct letters (optional)
        // This part can be implemented as needed
        textarea.style.backgroundColor = 'lime'; // Example: Change background if correct
    } else {
        textarea.style.backgroundColor = ''; // Reset if incorrect
    }

    // Check if user has typed the entire text
    if (inputText === str) {
        clearInterval(interval);
        timer.innerHTML = "Well done! Time's up!";
        btn.innerHTML = "Test Again";
        userinput.style.display = 'none';
    }
});


