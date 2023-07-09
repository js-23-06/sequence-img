const num = 200;
const mask = document.querySelector('aside');

const imgDOM = createImgs('figure', num);

let count = 0;

imgDOM.forEach((img) => {
	img.onload = () => {
		count++;
		console.log(count);
		if (count === num) {
			console.log('이미지소스 로딩 완료');
			mask.classList.add('off');

			setTimeout(() => {
				mask.remove();
			}, 2000);
		}
	};

	img.onerror = (e) => {
		e.currentTarget.setAttribute('src', 'img/logo.png');
	};
});

window.addEventListener('mousemove', (e) => matchMove(imgDOM, num, e));

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

//DOM객체가 생성된 직후 DOM에 수반되는 소스 자료들을 가져오기 시작
//img요소는 DOM이 생성되어야지 그 이후에 이미지 소스를 불어옴
//img.onload 이벤트를 연결하면 해당 돔에 수반되는 소스이미지가 완료되었을떄 호출떄
//video.onloadeddata (영상소스 호출 이벤트)
