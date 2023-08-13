const num = 200;
let count = 0;
const imgDOM = createImgs('figure', num);

showMask();
window.addEventListener('mousemove', (e) => matchMove(imgDOM, num, e));

function showMask() {
	const mask = document.createElement('aside');
	mask.style.transitionDuration = '0.5s';
	const delay = convertSpeed(mask);
	mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
	document.body.append(mask);

	imgDOM.forEach((img) => {
		img.onload = () => {
			count++;
			const percent = parseInt((count / 200) * 100);
			mask.querySelector('p').innerHTML = percent + '%';
			mask.querySelector('.bar').style.width = percent + '%';
			console.log(count);

			if (count === num) {
				console.log('이미지소스 로딩 완료');
				mask.classList.add('off');

				setTimeout(() => {
					mask.remove();
				}, delay);
			}
		};

		img.onerror = (e) => {
			e.currentTarget.setAttribute('src', 'img/logo.png');
		};
	});
}

function createImgs(targetEl, num) {
	const frame = document.querySelector(targetEl);
	let tags = '';
	Array(num)
		.fill()
		.forEach((_, idx) => (tags += `<img src='img/pic${idx}.jpg' />`));
	frame.innerHTML = tags;
	return frame.querySelectorAll('img');
}

function matchMove(arrEl, num, e) {
	const percent = parseInt((e.clientX / window.innerWidth) * num);
	for (const img of arrEl) img.style.visibility = 'hidden';
	arrEl[percent].style.visibility = 'visible';
}

function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}
