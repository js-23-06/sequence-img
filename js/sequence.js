class Sequence {
	constructor(selector) {
		this.num = 200;
		this.count = 0;
		this.imgDOM = this.createImgs(selector, this.num);

		this.showMask();
		window.addEventListener('mousemove', (e) => this.matchMove(this.imgDOM, this.num, e));
	}
	showMask() {
		const mask = document.createElement('aside');
		mask.style.transitionDuration = '0.5s';
		const delay = this.convertSpeed(mask);
		mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
		document.body.append(mask);

		this.imgDOM.forEach((img) => {
			img.onload = () => {
				this.count++;
				const percent = parseInt((this.count / 200) * 100);
				mask.querySelector('p').innerHTML = percent + '%';
				mask.querySelector('.bar').style.width = percent + '%';
				console.log(this.count);

				if (this.count === this.num) {
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
	createImgs(targetEl, num) {
		const frame = document.querySelector(targetEl);
		let tags = '';
		Array(num)
			.fill()
			.forEach((_, idx) => (tags += `<img src='img/pic${idx}.jpg' />`));
		frame.innerHTML = tags;
		return frame.querySelectorAll('img');
	}
	matchMove(arrEl, num, e) {
		const percent = parseInt((e.clientX / window.innerWidth) * num);
		for (const img of arrEl) img.style.visibility = 'hidden';
		arrEl[percent].style.visibility = 'visible';
	}
	convertSpeed(el) {
		return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
	}
}
