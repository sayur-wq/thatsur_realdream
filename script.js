(() => {
	const videoElement = document.getElementById('bgVideo');
	const grainCanvas = document.getElementById('grainCanvas');
	const glitchBar = document.getElementById('glitchBar');
	const flashLayer = document.getElementById('flash');
	const trackingLayer = document.getElementById('tracking');
	const scratchesLayer = document.getElementById('scratches');
	const eyesLayer = document.getElementById('eyesLayer');
	const deadPixelsLayer = document.getElementById('deadPixels');
	const demonLayer = document.getElementById('demonLayer');
	const tearsLayer = document.getElementById('tears');
	const dripsLayer = document.getElementById('drips');
	const jumpscareLayer = document.getElementById('jumpscare');
	const screamAudio = document.getElementById('screamAudio');
    const handsLayer = document.getElementById('handsLayer');
	// removed settings UI
	const gate = document.getElementById('gate');
	const startBtn = document.getElementById('startBtn');
	const speakBtn = document.getElementById('speakBtn');
	const omensLayer = document.getElementById('omens');

	// Ensure video loops and resumes on end for certain browsers
	videoElement.addEventListener('ended', () => {
		videoElement.currentTime = 0;
		videoElement.play().catch(() => {});
	});

	// Apply flicker class randomly for extra eeriness
	const stage = document.getElementById('app');
	setInterval(() => {
		if (Math.random() < 0.3) {
			stage.classList.add('flicker');
			setTimeout(() => stage.classList.remove('flicker'), 260 + Math.random() * 620);
		}
	}, 1200);

	// Occasional shake & RGB split
	setInterval(() => {
		if (Math.random() < 0.35) {
			stage.classList.add('shake');
			videoElement.classList.add(Math.random() < 0.5 ? 'rgb-split' : 'rgb-split-strong');
			setTimeout(() => {
				stage.classList.remove('shake');
				videoElement.classList.remove('rgb-split');
				videoElement.classList.remove('rgb-split-strong');
			}, 450 + Math.random() * 600);
		}
	}, 2200);

	// Heavy filter bursts: posterize / ripple / edge / invert
	const heavyFilters = ['posterize', 'rippleDistort', 'edgeDetect'];
	setInterval(() => {
		const chance = Math.random();
		if (chance < 0.28) {
			const pick = heavyFilters[Math.floor(Math.random() * heavyFilters.length)];
			videoElement.style.filter = `url(#${pick}) contrast(1.35) brightness(0.86) saturate(0.6)`;
			if (Math.random() < 0.4) videoElement.classList.add('rgb-split');
			setTimeout(() => {
				videoElement.style.filter = '';
				videoElement.classList.remove('rgb-split');
			}, 420 + Math.random() * 680);
		} else if (chance < 0.35) {
			// quick invert/solarize flick
			videoElement.style.filter = 'invert(1) hue-rotate(180deg) contrast(1.2)';
			setTimeout(() => { videoElement.style.filter = ''; }, 140);
		}
	}, 2300);

	// Glitch bar sweeps occasionally
	function triggerGlitch() {
		const height = 8 + Math.random() * 30;
		glitchBar.style.height = height + 'px';
		glitchBar.style.transform = 'translateY(-100%)';
		glitchBar.style.transition = 'none';
		const y = Math.random() * window.innerHeight;
		glitchBar.style.top = y + 'px';
		requestAnimationFrame(() => {
			glitchBar.style.transition = 'transform 240ms cubic-bezier(.3,.7,.2,1)';
			glitchBar.style.transform = 'translateY(0)';
			setTimeout(() => {
				glitchBar.style.transition = 'transform 520ms ease-out';
				glitchBar.style.transform = 'translateY(120%)';
			}, 260);
		});
	}
	setInterval(() => { if (Math.random() < 0.55) triggerGlitch(); }, 1500);

	// Random flash bursts
	function triggerFlash() {
		if (!flashLayer) return;
		flashLayer.classList.remove('show');
		void flashLayer.offsetWidth; // reflow to restart animation
		flashLayer.classList.add('show');
	}
	setInterval(() => { if (Math.random() < 0.22) triggerFlash(); }, 2600);

	// Demon silhouette (short jump)
	function spawnDemon() {
		if (!demonLayer) return;
		const x = 20 + Math.random() * 60;
		const y = 30 + Math.random() * 40;
		let node;
		if (Math.random() < 0.5) {
			// CSS-based demon silhouette
			node = document.createElement('div');
			node.className = 'demon';
			node.style.left = x + 'vw';
			node.style.top = y + 'vh';
		} else {
			// SVG demon face for higher detail
			node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			node.setAttribute('viewBox', '0 0 100 100');
			node.style.position = 'absolute';
			node.style.left = x + 'vw';
			node.style.top = y + 'vh';
			node.style.transform = 'translate(-50%, -50%)';
			node.style.width = '180px';
			node.style.height = '180px';
			node.style.filter = 'drop-shadow(0 0 12px rgba(255,0,30,0.7))';
			const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
			use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#demonFace');
			node.appendChild(use);
		}
		demonLayer.appendChild(node);
		setTimeout(() => node.remove(), 900);
	}
	setInterval(() => { if (Math.random() < 0.16) spawnDemon(); }, 3800);

	// Screen tearing bars
	function spawnTear() {
		if (!tearsLayer) return;
		const t = document.createElement('div');
		t.className = 'tear';
		const y = Math.random() * 100;
		t.style.top = y + 'vh';
		tearsLayer.appendChild(t);
		requestAnimationFrame(() => {
			t.style.transition = 'transform 360ms cubic-bezier(.2,.6,.2,1)';
			t.style.transform = 'translateY(260%)';
		});
		setTimeout(() => t.remove(), 500);
	}
	setInterval(() => { if (Math.random() < 0.28) spawnTear(); }, 2400);

	// Blood drips
	function spawnDrip() {
		if (!dripsLayer) return;
		const d = document.createElement('div');
		d.className = 'drip';
		d.style.left = (10 + Math.random() * 80) + 'vw';
		d.style.top = '-2vh';
		dripsLayer.appendChild(d);
		const h = 20 + Math.random() * 35;
		requestAnimationFrame(() => {
			d.style.transition = 'height 1.2s ease, top 1.2s ease';
			d.style.height = h + 'vh';
			d.style.top = '0vh';
		});
		setTimeout(() => d.remove(), 1600);
	}
	setInterval(() => { if (Math.random() < 0.12) spawnDrip(); }, 3200);

	// Web Audio API low rumble (no external files)
	let audioCtx = null; let rumbleOsc = null; let rumbleGain = null;
	function initAudio() {
		if (audioCtx) return;
		audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		rumbleOsc = audioCtx.createOscillator();
		rumbleGain = audioCtx.createGain();
		rumbleOsc.type = 'sine';
		rumbleOsc.frequency.value = 42; // Hz
		rumbleGain.gain.value = 0.0;
		rumbleOsc.connect(rumbleGain).connect(audioCtx.destination);
		rumbleOsc.start();
	}

	function rumblePulse() {
		if (!audioCtx) return;
		const now = audioCtx.currentTime;
		const target = 0.04 + Math.random() * 0.06;
		rumbleGain.gain.cancelScheduledValues(now);
		rumbleGain.gain.linearRampToValueAtTime(target, now + 0.05);
		rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
	}

	// Start audio on user gesture (Enter click)
	let audioPrimed = false;
	startBtn?.addEventListener('click', async () => {
		try { initAudio(); setTimeout(rumblePulse, 600); } catch (_) {}
		// Prime laugh audio on user gesture so later playback won't be blocked
		if (screamAudio && !audioPrimed) {
			try {
				screamAudio.muted = true;
				screamAudio.volume = 0;
				await screamAudio.play();
				screamAudio.pause();
				screamAudio.currentTime = 0;
				screamAudio.muted = false;
				audioPrimed = true;
			} catch (_) {}
		}
		// schedule an early scare so user hears it soon
		setTimeout(() => { showJumpscare(); }, 8000 + Math.random() * 6000);
	});

	// Occasionally trigger rumble
	setInterval(() => { if (Math.random() < 0.18) rumblePulse(); }, 5000);

	// Occasionally manipulate music (video audio): small volume dips, warble, stutter
	function musicGlitch() {
		if (videoElement.paused) return;
		if (videoElement.muted) return;
		const roll = Math.random();
		if (roll < 0.45) {
			// quick volume dip
			const prev = videoElement.volume;
			const target = Math.max(0.25, prev - (0.25 + Math.random() * 0.35));
			videoElement.volume = target;
			setTimeout(() => { videoElement.volume = prev; }, 900);
		} else if (roll < 0.8) {
			// playback rate warble (slight pitch/time change)
			const prev = videoElement.playbackRate;
			const target = 0.85 + Math.random() * 0.25; // 0.85–1.10
			videoElement.playbackRate = target;
			setTimeout(() => { videoElement.playbackRate = prev; }, 800);
		} else {
			// micro stutter
			const wasPlaying = !videoElement.paused;
			videoElement.pause();
			setTimeout(() => { if (wasPlaying) { videoElement.play().catch(()=>{}); } }, 90 + Math.random()*70);
		}
	}
	setInterval(() => { if (Math.random() < 0.6) musicGlitch(); }, 12000 + Math.random() * 8000);

	// Scheduled jumpscare (every 30-60s), with SVG demon face and scream
	let jumpDurationMs = 900;
	let jumpMinS = 20;
	let jumpMaxS = 45;
	let laughVolume = 1.0;
	function showJumpscare() {
		if (!jumpscareLayer) return;
		jumpscareLayer.innerHTML = '';
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', '0 0 100 100');
		const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#demonFace');
		svg.appendChild(use);
		jumpscareLayer.appendChild(svg);
		jumpscareLayer.classList.add('show');
		// Play laugh if available
		if (screamAudio) {
			try {
				screamAudio.currentTime = 0;
				screamAudio.volume = laughVolume;
				screamAudio.muted = false;
				screamAudio.play().catch(()=>{});
			} catch (_) {
				// fallback beep via WebAudio if element fails
				try {
					if (!audioCtx) initAudio();
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = 'square';
					osc.frequency.value = 620;
					gain.gain.value = 0.0001;
					osc.connect(gain).connect(audioCtx.destination);
					osc.start();
					const now = audioCtx.currentTime;
					gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
					gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
					setTimeout(() => { try { osc.stop(); osc.disconnect(); } catch {} }, 450);
				} catch {}
			}
		}
		setTimeout(() => {
			jumpscareLayer.classList.remove('show');
			jumpscareLayer.innerHTML = '';
		}, jumpDurationMs);
	}

	function scheduleJumpscare() {
		const min = Math.min(jumpMinS, jumpMaxS) * 1000;
		const max = Math.max(jumpMinS, jumpMaxS) * 1000;
		const wait = min + Math.random() * (max - min);
		setTimeout(() => { showJumpscare(); scheduleJumpscare(); }, wait);
	}

	scheduleJumpscare();

	// removed settings logic

	// Background laugh bed: occasionally play lower volume under the music
	let bgLaughTimer = null;
	function scheduleBackgroundLaugh() {
		if (!screamAudio) return;
		const wait = 8000 + Math.random() * 14000; // 8–22s for more frequent tests
		bgLaughTimer = setTimeout(async () => {
			try {
				screamAudio.volume = 0.18; // lower than music video
				screamAudio.muted = false;
				screamAudio.currentTime = 0;
				await screamAudio.play().catch(()=>{});
				// stop after short bed 1.5-3s
				setTimeout(() => { try { screamAudio.pause(); } catch {} scheduleBackgroundLaugh(); }, 1500 + Math.random() * 1500);
			} catch { scheduleBackgroundLaugh(); }
		}, wait);
	}
	startBtn?.addEventListener('click', () => { scheduleBackgroundLaugh(); });

	// Ghost hands spawner
	function spawnHand() {
		if (!handsLayer) return;
		const h = document.createElement('div');
		h.className = 'hand';
		h.style.left = (10 + Math.random() * 80) + 'vw';
		h.style.top = (10 + Math.random() * 80) + 'vh';
		handsLayer.appendChild(h);
		setTimeout(() => h.remove(), 2800);
	}
	setInterval(() => { if (Math.random() < 0.22) spawnHand(); }, 3400);

	// Eyes spawner
	function spawnEye() {
		if (!eyesLayer) return;
		const eye = document.createElement('div');
		eye.className = 'eye';
		const x = 10 + Math.random() * 80;
		const y = 10 + Math.random() * 80;
		eye.style.left = x + 'vw';
		eye.style.top = y + 'vh';
		eyesLayer.appendChild(eye);
		setTimeout(() => eye.remove(), 2400);
	}
	setInterval(() => { if (Math.random() < 0.18) spawnEye(); }, 3000);

	// Dead pixels spawner
	function spawnDeadPixels() {
		if (!deadPixelsLayer) return;
		for (let i = 0; i < 6; i += 1) {
			const p = document.createElement('div');
			p.className = 'dead-pixel';
			p.style.left = Math.random() * 100 + 'vw';
			p.style.top = Math.random() * 100 + 'vh';
			deadPixelsLayer.appendChild(p);
			setTimeout(() => p.remove(), 1600 + Math.random() * 1200);
		}
	}
	setInterval(() => { if (Math.random() < 0.25) spawnDeadPixels(); }, 2800);

	// Procedural grain on canvas
	const ctx = grainCanvas.getContext('2d', { willReadFrequently: true });
	function resizeCanvas() {
		grainCanvas.width = window.innerWidth;
		grainCanvas.height = window.innerHeight;
	}
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	function renderGrain() {
		const { width, height } = grainCanvas;
		const imageData = ctx.createImageData(width, height);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			const v = Math.random() * 255;
			data[i] = v;      // R
			data[i + 1] = v;  // G
			data[i + 2] = v;  // B
			data[i + 3] = 18 + Math.random() * 28; // A
		}
		ctx.putImageData(imageData, 0, 0);
		requestAnimationFrame(renderGrain);
	}
	requestAnimationFrame(renderGrain);

	// Gate controls: user gesture to unmute if desired
	function hideGate() {
		gate.classList.remove('visible');
	}

	startBtn?.addEventListener('click', async () => {
		try {
			videoElement.muted = false;
			await videoElement.play();
			hideGate();
		} catch (e) {
			// Fallback: keep muted if autoplay policy blocks
			videoElement.muted = true;
			await videoElement.play().catch(() => {});
			hideGate();
		}
	});

	// "Konuş" hidden trigger: every 4th click spawns ominous Japanese messages
	let speakClickCount = 0;
	const messages = [
		'見ている', // watching
		'後ろを見て', // look behind you
		'まだ逃げられると思う？', // do you still think you can escape?
		'来る', // it comes
		'影は動く', // the shadow moves
		'終わりは近い', // the end is near
		'振り向くな', // do not turn around
		'どこにも行けない', // you cannot go anywhere
		"i'm behind you",
		"check your phone",
		"i know your address",
		"don't turn around",
		"can you hear it?",
		"it sees you",
		"closer",
		"run if you can",
		"숨지 마", // don't hide
		"뒤를 봐", // look behind
		"너를 보고 있어", // I'm watching you
		"너의 비밀을 알아", // I know your secret
		"여기 있어" // I'm here
	];

	function spawnOmen() {
		if (!omensLayer) return;
		const omen = document.createElement('div');
		omen.className = 'omen';
		omen.textContent = messages[Math.floor(Math.random() * messages.length)];
		const x = 10 + Math.random() * 80; // viewport %
		const y = 10 + Math.random() * 80;
		const size = 18 + Math.random() * 42;
		omen.style.left = x + 'vw';
		omen.style.top = y + 'vh';
		omen.style.fontSize = size + 'px';
		omensLayer.appendChild(omen);
		// auto-remove after animation
		setTimeout(() => omen.remove(), 2000);
	}

	speakBtn?.addEventListener('click', async () => {
		speakClickCount += 1;
		if (speakClickCount % 4 === 0) {
			for (let i = 0; i < 4; i += 1) {
				setTimeout(spawnOmen, i * 200);
			}
		}
	});

	// Keyboard shortcuts
	document.addEventListener('keydown', async (ev) => {
		if (ev.key.toLowerCase() === 'm') {
			videoElement.muted = !videoElement.muted;
			if (videoElement.paused) { await videoElement.play().catch(() => {}); }
		}
		if (ev.key.toLowerCase() === 'h') {
			stage.classList.toggle('flicker');
		}
	});

	// Attempt to start muted for autoplay friendliness
	videoElement.muted = true;
	videoElement.play().catch(() => {});
})();


