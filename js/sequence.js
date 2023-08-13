class Sequence {
	#defOpt = { imgNum: 200, maskName: 'mask', imgUrl: 'img/pic', imgType: 'jpg' };
	constructor(selector, opt) {
		if (!selector) return console.error('선택자는 필수입력 항목입니다.');
		const resultOpt = { ...this.#defOpt, ...opt };
		console.log(resultOpt);
		this.num = resultOpt.imgNum;
		this.count = 0;
		this.maskClassName = resultOpt.maskName;
		this.imgUrl = resultOpt.imgUrl;
		this.imgType = resultOpt.imgType;
		//imtUrl, imgType이 읽힌 후에 createImgs함수를 호출
		this.imgDOM = this.createImgs(selector, this.num);

		this.showMask();
		window.addEventListener('mousemove', (e) => this.matchMove(this.imgDOM, this.num, e));
	}
	showMask() {
		const mask = document.createElement('aside');
		mask.classList.add(this.maskClassName);
		mask.style.transitionDuration = '0.5s';
		const delay = this.convertSpeed(mask);
		mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
		document.body.append(mask);

		this.imgDOM.forEach((img) => {
			img.onload = () => {
				this.count++;
				const percent = parseInt((this.count / this.num) * 100);
				mask.querySelector('p').innerHTML = percent + '%';
				mask.querySelector('.bar').style.width = percent + '%';
				//console.log(this.count);

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
		console.log(this);
		let tags = '';
		Array(num)
			.fill()
			.forEach((_, idx) => {
				console.log(this);
				//console.log(this.imgType);
				tags += `<img src='${this.imgUrl}${idx}.${this.imgType}' />`;
			});
		frame.innerHTML = tags;
		console.log(tags);
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
