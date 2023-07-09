//문자열로 반복되는 태그를 만들어서 innerHTML로 동적으로 pic0.jpg~pic199.jpg까지의 img태그 200개를 동적으로 figure영역 안쪽에 생성

//동적으로 200개의 태그가 문자열로 담길 빈 문자열을 생성한다음 반복문으로 200번 반복돌면서 태그 문자열생성하고 innerHTML로 figure안쪽에 생성
const frame = document.querySelector('figure');
const num = 200;

let tags = '';
//for (let i = 0; i < num; i++) tags += `<img src='img/pic${i}.jpg' />`;
Array(num)
	.fill()
	.forEach((_, idx) => (tags += `<img src='img/pic${idx}.jpg' />`));
frame.innerHTML = tags;

//브라우저에서 마우스 포인터를 움직일때마다 현재 포인터의 가로축 좌표값 출력
//마우스가 움직일때마다 항상 1~200가 찍히는 200분율 변환
//백분율 구하는 공식 (현재수치값 / 전체수치값) *100
//이백분율 구하는 공식 (현재수치값 / 전체수치값) *200
//브라우저 폭 구하느 공식 window.innerWidth
window.addEventListener('mousemove', (e) => {
	const percent = parseInt((e.clientX / window.innerWidth) * num);
	console.log(percent);
});
