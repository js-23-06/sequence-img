class Sequence {
	#defOpt = {
		imgNum: 200,
		maskName: 'mask',
		imgUrl: 'img/pic',
		imgType: 'jpg',
	};
	constructor(selector, opt) {
		if (!selector)
			return console.error('선택자는 필수입력 항목입니다.');
		const resultOpt = { ...this.#defOpt, ...opt };
		this.num = resultOpt.imgNum;
		this.maskClassName = resultOpt.maskName;
		this.imgUrl = resultOpt.imgUrl;
		this.imgType = resultOpt.imgType;
		this.imgDOM = this.createImgs(selector, this.num);
		//추후 해다 인스턴스의 객체 구조를 변경하지 못하도록 강제 고정
		Object.freeze(this);

		//this.showMask();
		window.addEventListener('mousemove', (e) =>
			this.matchMove(this.imgDOM, this.num, e)
		);
	}
	showMask() {
		//해당 인스턴스 객체가 고정되면 showMask메서드에서 count값자체를 변경할 수 없고, 해당 값을 showMask안쪽에서만 필요한 값이므로 지연변수 처리
		let count = 0;
		const mask = document.createElement('aside');
		mask.classList.add(this.maskClassName);
		mask.style.transitionDuration = '0.5s';
		const delay = this.convertSpeed(mask);
		mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
		document.body.append(mask);

		this.imgDOM.forEach((img) => {
			img.onload = () => {
				count++;
				const percent = parseInt((count / this.num) * 100);
				mask.querySelector('p').innerHTML = percent + '%';
				mask.querySelector('.bar').style.width = percent + '%';

				if (count === this.num) {
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
		//console.log(this);
		let tags = '';
		Array(num)
			.fill()
			.forEach((_, idx) => {
				//console.log(this);
				//console.log(this.imgType);
				tags += `<img src='${this.imgUrl}${idx}.${this.imgType}' />`;
			});
		frame.innerHTML = tags;
		//console.log(tags);
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
