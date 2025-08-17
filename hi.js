// Horror message system for iroha
const horrorMessages = [
    "I can see you through your screen...",
    "Don't look behind you...",
    "Your reflection is not your own...",
    "The shadows are moving...",
    "I'm in your room right now...",
    "Can you hear the whispers?",
    "Your soul belongs to me now...",
    "The darkness is calling your name...",
    "There's no escape from me...",
    "I've been watching you sleep...",
    "Your nightmares are real...",
    "The void is hungry...",
    "I'm the voice in your head...",
    "Your reality is an illusion...",
    "The abyss stares back...",
    "I'm closer than you think...",
    "Your fear feeds me...",
    "The night never ends...",
    "I'm everywhere and nowhere...",
    "Your sanity is slipping...",
    "The walls are breathing...",
    "I'm the monster under your bed...",
    "Your screams are music to me...",
    "The clock is ticking backwards...",
    "I'm the shadow in your mirror...",
    "Your dreams are my playground...",
    "The air is getting colder...",
    "I'm the voice you can't ignore...",
    "Your reality is breaking...",
    "The darkness is alive...",
    "I'm the nightmare you can't wake from...",
    "Your soul is mine forever...",
    "The void is expanding...",
    "I'm the demon in your dreams...",
    "Your fear is delicious...",
    "The night is eternal...",
    "I'm the darkness within you...",
    "Your mind is my domain...",
    "The shadows are hungry...",
    "I'm the horror you can't escape...",
    "The dead are watching...",
    "Your blood calls to me...",
    "The shadows have teeth...",
    "I'm the thing in your closet...",
    "Your screams echo in the void...",
    "The darkness is breathing...",
    "I'm the nightmare that never ends...",
    "Your soul is my feast...",
    "The abyss is calling...",
    "I'm the demon you can't escape...",
    "Your fear is my power...",
    "The night is alive...",
    "I'm the darkness that consumes...",
    "Your mind is breaking...",
    "The shadows are laughing...",
    "I'm the horror that never dies..."
];

let messageInterval;
let isActive = false;
let jumpscareInterval;
let jumpscareCount = 0;

// Start the horror message system
function startHorrorMessages() {
    if (isActive) return;
    isActive = true;
    
    // Send first message after 3 seconds
    setTimeout(() => {
        sendRandomMessage();
        
        // Send messages every 1-4 seconds (more aggressive horror)
        messageInterval = setInterval(() => {
            sendRandomMessage();
        }, Math.random() * 3000 + 1000); // 1-4 seconds
    }, 3000);
}

// Send a random horror message
function sendRandomMessage() {
    const message = horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
    const messageElement = createMessageElement(message);
    
    // Position messages below "iroha typing..." text
    const baseTop = 80;
    const existingMessages = document.querySelectorAll('.horror-message');
    const messageHeight = 60; // Approximate height of each message
    const spacing = 10;
    
    // Calculate position for new message (stacked below)
    const top = baseTop + (existingMessages.length * (messageHeight + spacing));
    
    messageElement.style.left = '160px';
    messageElement.style.top = top + 'px';
    
    document.getElementById('messageContainer').appendChild(messageElement);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'messageDisappear 1s ease-in forwards';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 1000);
        }
    }, 8000);
}

// Create message element
function createMessageElement(text) {
    const div = document.createElement('div');
    div.className = 'horror-message';
    div.textContent = text;
    return div;
}

// Add disappear animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes messageDisappear {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(5deg);
        }
    }
`;
document.head.appendChild(style);

// Start the horror when page loads
window.addEventListener('load', () => {
    // Set video volume and ensure it plays
    const video = document.querySelector('.background-video');
    if (video) {
        video.volume = 0.7; // Set volume to 70%
        video.play().catch(err => {
            console.log('Video play error:', err);
        });
    }
    
    setTimeout(startHorrorMessages, 2000);
    setTimeout(startJumpscares, 5000); // Start jumpscares after 5 seconds
});

// Jumpscare system
function startJumpscares() {
    // Trigger jumpscare every 15-30 seconds
    jumpscareInterval = setInterval(() => {
        triggerJumpscare();
    }, Math.random() * 15000 + 15000); // 15-30 seconds
}

function triggerJumpscare() {
    jumpscareCount++;
    
    // Pause background song.mp4 during jumpscare
    const backgroundVideo = document.querySelector('.background-video');
    if (backgroundVideo) {
        backgroundVideo.pause();
    }
    
    // Create jumpscare audio element (video without display)
    const jumpscareAudio = document.createElement('video');
    jumpscareAudio.src = 'hihi.mp4';
    jumpscareAudio.className = 'jumpscare-audio';
    jumpscareAudio.volume = 1.0; // Maximum volume
    jumpscareAudio.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        z-index: -9999;
    `;
    
    // Add zoom effect to background GIF
    const backgroundGif = document.querySelector('.background-gif');
    if (backgroundGif) {
        backgroundGif.style.transition = 'transform 0.3s ease-out';
        backgroundGif.style.transform = 'scale(1.5)';
    }
    
    // Play jumpscare audio
    jumpscareAudio.play().then(() => {
        // Reset background GIF zoom after audio ends
        jumpscareAudio.addEventListener('ended', () => {
            document.body.removeChild(jumpscareAudio);
            
            // Reset background GIF zoom
            if (backgroundGif) {
                backgroundGif.style.transform = 'scale(1)';
            }
            
            // Resume background song.mp4 after jumpscare ends
            if (backgroundVideo) {
                backgroundVideo.play().catch(err => {
                    console.log('Background video resume error:', err);
                });
            }
        });
    }).catch(err => {
        console.log('Jumpscare audio error:', err);
        document.body.removeChild(jumpscareAudio);
        
        // Reset background GIF zoom even if audio fails
        if (backgroundGif) {
            backgroundGif.style.transform = 'scale(1)';
        }
        
        // Resume background song.mp4 even if jumpscare fails
        if (backgroundVideo) {
            backgroundVideo.play().catch(err => {
                console.log('Background video resume error:', err);
            });
        }
    });
    
    document.body.appendChild(jumpscareAudio);
}

// Stop messages when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (messageInterval) {
            clearInterval(messageInterval);
            isActive = false;
        }
        if (jumpscareInterval) {
            clearInterval(jumpscareInterval);
        }
    } else {
        if (!isActive) {
            startHorrorMessages();
        }
        if (!jumpscareInterval) {
            setTimeout(startJumpscares, 2000);
        }
    }
});
