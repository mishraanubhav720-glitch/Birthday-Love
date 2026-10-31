// ==========================================
// 1. PERSONAL CONFIGURATION (यहाँ अपना डेटा बदलें)
// ==========================================
const CONFIG = {
    herName: "ANCHAL DARLING❤️", // यहाँ अपनी गर्लफ्रेंड का नाम लिखें
    startDate: "2026/07/13", // जब से आप साथ हैं वो तारीख डालें
    memories: [
        {
            img: "assets/pic1.jpg.jpeg", // इसे बदलकर "assets/pic1.jpg" कर लें
            date: "EPOCH 01 // FIRST GLIMPSE",
            caption: "जब पहली बार तुम्हें देखा था, तभी मेरे दिल का सिस्टम क्रैश हो गया था।"
        },
        {
            img: "assets/pic2.jpg.jpeg", // "assets/pic2.jpg"

            date: "EPOCH 02 // FAVORITE SMILE",
            caption: "तुम्हारी ये मुस्कान मेरी दुनिया का सबसे खूबसूरत एल्गोरिदम है।"
        },
        {
            img: "assets/pic3.jpg.jpeg", // "assets/pic3.jpg"
            date: "EPOCH 03 // UNFORGETTABLE MOMENTS",
            caption: "तुम्हारे साथ बिताया हर एक पल मेरी मेमोरी में हमेशा के लिए सेव है।"
        },
        {
            img: "assets/pic4.jpg.jpeg", // "assets/pic4.jpg"
            date: "EPOCH 04 // INFINITE FUTURE",
            caption: "आज तुम्हारा जन्मदिन है, और मेरी हर दुआ में सिर्फ तुम्हारी खुशी है।"
        }
    ]
};

// ==========================================
// 2. SHAYARI DATABASE (5+ शायरियाँ हर मूड के लिए)
// ==========================================
const SHAYARI_DB = {
    roohani: [
        "हज़ारों चेहरों के डेटासेट में एक तुम्हारा ही नूर है,\nमेरी हर साँस, मेरी हर धड़कन में बस तुम्हारा ही सुरूर है।\nजन्मदिन मुबारक हो मेरी ज़िंदगी! ❤️",
        "तुम्हें चाहना कोई इत्तेफ़ाक नहीं, मेरी रूह का फैसला है,\nमेरी हर दुआ का शुरू और आखिरी सिलसिला तुमसे मिला है।",
        "ना जाने कौन सी कशिश है तुम्हारी इन निगाहों में,\nमैं खुद को भूल जाता हूँ जब भी आता हूँ तुम्हारी पनाहों में।"
    ],
    husn: [
        "चाँद भी शर्मा जाए जब तुम ज़ुल्फ़ें सँवारती हो,\nमेरी बेरंग सी दुनिया में तुम हर रोज़ नए रंग उतारती हो।",
        "सादगी ऐसी कि हर अदा पर दिल निसार हो जाए,\nतुम बस एक बार मुस्कुरा दो, तो पतझड़ में भी बहार हो जाए।"
    ],
    tech: [
        "तुम मेरे Neural Network की सबसे खूबसूरत Weight हो,\nमेरी ज़िंदगी के हर फैसले की तुम ही लर्निंग रेट हो!\nHappy Birthday My Favorite Algorithm! 💻❤️",
        "दुनिया भर के AI मॉडल्स फेल हो गए तुम्हारी खूबसूरती नापने में,\nमेरा दिल Overfit हो चुका है सिर्फ तुम्हें चाहने में।"
    ],
    safar: [
        "हाथ थाम कर तुम्हारा हर एक मंज़िल पार करनी है,\nमुझे अपनी हर एक सुबह और हर शाम तुम्हारे नाम करनी है।",
        "सफर कितना भी लंबा हो, अगर हमसफर तुम हो,\nतो हर राह जन्नत और हर लम्हा मुकम्मल है।"
    ]
};

let currentCategory = 'roohani';
let currentIndex = 0;
let typingTimer = null;

// Initialize Page
document.getElementById("her-name").innerText = CONFIG.herName;

// ==========================================
// 3. LIVE UPTIME COUNTER
// ==========================================
function updateTimer() {
    const start = new Date(CONFIG.startDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, now - start);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = String(days).padStart(3, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("mins").innerText = String(mins).padStart(2, '0');
    document.getElementById("secs").innerText = String(secs).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// ==========================================
// 4. LLM STREAMING SHAYARI GENERATOR
// ==========================================
function typeText(text) {
    const output = document.getElementById("shayari-output");
    output.innerHTML = "";
    clearInterval(typingTimer);

    let i = 0;
    typingTimer = setInterval(() => {
        if (i < text.length) {
            output.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingTimer);
        }
    }, 30);
}

function generateShayari(category, btnElement) {
    currentCategory = category;
    currentIndex = 0;
    if (btnElement) {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
    typeText(SHAYARI_DB[currentCategory][currentIndex]);
}

function nextShayari() {
    const list = SHAYARI_DB[currentCategory];
    currentIndex = (currentIndex + 1) % list.length;
    typeText(list[currentIndex]);
}
generateShayari('roohani');

// ==========================================
// 5. RENDER 3D PHOTO GALLERY
// ==========================================
const photoGrid = document.getElementById("photo-grid");
CONFIG.memories.forEach(item => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.innerHTML = `
        <img src="${item.img}" alt="Memory">
        <div class="memory-date">${item.date}</div>
        <div class="memory-caption">${item.caption}</div>
    `;
    photoGrid.appendChild(card);
});

// ==========================================
// 6. CAKE BLOW (TOUCH + REAL MICROPHONE)
// ==========================================
function extinguishCandle() {
    const flame = document.getElementById("flame");
    if (!flame.classList.contains("off")) {
        flame.classList.add("off");
        document.getElementById("wish-status").innerHTML = "🎉 <b>Happy Birthday Jaan!</b> तुम्हारी हर दुआ कबूल हो! ❤️";
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
}

async function startMicBlowDetection() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        mic.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        document.getElementById("wish-status").innerText = "🎙️ अब अपने फोन के माइक में ज़ोर से फूंक मारो (Blow Now)...";

        function checkBlow() {
            analyser.getByteFrequencyData(dataArray);
            let avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            if (avg > 65) {
                extinguishCandle();
                stream.getTracks().forEach(track => track.stop());
            } else {
                requestAnimationFrame(checkBlow);
            }
        }
        checkBlow();
    } catch (err) {
        alert("Mic permission नहीं मिली! आप सीधे केक पर टच करके भी कैंडल बुझा सकती हैं।");
    }
}

// ==========================================
// 7. BIOMETRIC FINGERPRINT SCANNER
// ==========================================
const fpBtn = document.getElementById("fingerprint-btn");
let scanTimeout;

function startScan() {
    fpBtn.classList.add("scanning");
    document.getElementById("scan-status").innerText = "SCANNING HEART SIGNATURE... HOLD STILL";
    scanTimeout = setTimeout(() => {
        fpBtn.classList.remove("scanning");
        document.getElementById("scan-status").innerHTML = "✅ <b>IDENTITY VERIFIED:</b> QUEEN OF MY HEART";
        document.getElementById("secret-letter").classList.remove("hidden");
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
    }, 1800);
}

function cancelScan() {
    clearTimeout(scanTimeout);
    fpBtn.classList.remove("scanning");
}

fpBtn.addEventListener("mousedown", startScan);
fpBtn.addEventListener("mouseup", cancelScan);
fpBtn.addEventListener("touchstart", (e) => { e.preventDefault(); startScan(); });
fpBtn.addEventListener("touchend", cancelScan);

// ==========================================
// 8. MUSIC CONTROL
// ==========================================
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "⏸️ Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🎵 Play Romantic Track";
    }
});

// ==========================================
// 9. INTERACTIVE NEURAL NETWORK CANVAS
// ==========================================
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
for (let i = 0; i < 55; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
    });
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ff2a85";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            let dx = node.x - nodes[j].x;
            let dy = node.y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(255, 42, 133, ${1 - dist / 130})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();
