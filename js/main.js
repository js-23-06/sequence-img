const num = 200;

//반환된 이미지를 전역변수에 담음
const imgDOM = createImgs('figure', num);

let count = 0;

//imgDOM이 생성되자마자 바로 반복을 돌면서
//각 img요소에 소스이미지 로딩완료 유무를 onload이벤트로 확인
//이후 소스이미지 로딩숫자값과 전체 이미지 갯수가 동일해지면 모든 이미지소스 로딩 완료처리
imgDOM.forEach((img) => {
	img.onload = () => {
		count++;
		console.log(count);
		if (count === num) {
			console.log('이미지소스 로딩 완료');
		}
	};

	img.onerror = (e) => {
		e.currentTarget.setAttribute('src', 'img/logo.png');
	};
});

//마우스 무브 이벤트 연결
window.addEventListener('mousemove', (e) => matchMove(imgDOM, num, e));

//동적으로 이미지 생성후 반환 함수
function createImgs(targetEl, num) {
	const frame = document.querySelector(targetEl);
	let tags = '';
	Array(num)
		.fill()
		.forEach((_, idx) => (tags += `<img src='img/pic${idx}.jpg' />`));
	frame.innerHTML = tags;
	return frame.querySelectorAll('img');
}

//마우스 포인터 위치에 따라 이미지 순서 매칭하는 함수
function matchMove(arrEl, num, e) {
	const percent = parseInt((e.clientX / window.innerWidth) * num);
	for (const img of arrEl) img.style.visibility = 'hidden';
	arrEl[percent].style.visibility = 'visible';
}

//DOM객체가 생성된 직후 DOM에 수반되는 소스 자료들을 가져오기 시작
//img요소는 DOM이 생성되어야지 그 이후에 이미지 소스를 불어옴
//img.onload 이벤트를 연결하면 해당 돔에 수반되는 소스이미지가 완료되었을떄 호출떄
//video.onloadeddata (영상소스 호출 이벤트)
