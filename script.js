const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');
let showShit;

const calculate = () => {
	fetch(`
    https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
		.then((res) => res.json())
		.then((data) => {
			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;

			const rate = data.rates[currency2];

			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
			amountTwo.value = (amountOne.value * rate).toFixed(2);
		});
};

const swap = () => {
	const oldValue = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = oldValue;
	calculate();
};

const shitRub = () => {
	if (currencyOne.value == 'RUB' || currencyTwo.value == 'RUB') {
		showShit = setInterval(() => {
			const shit = document.createElement('i');
			shit.classList.add('shit');
			shit.textContent = '💩';
			shit.style.left = Math.random() * window.innerWidth + 'px';
			shit.style.animationDuration = 3 + 's';
			document.body.append(shit);

			setTimeout(() => {
				shit.remove();
			}, 3000);
		}, 100);
	} else {
		clearInterval(showShit);
		const shits = document.getElementsByClassName('shit');
		for (let i = 0; i < shits.length; i++) {
			shits[i].style.opacity = 0;
		}
	}
};

currencyOne.addEventListener('change', () => {
	calculate();
	shitRub();
});
currencyTwo.addEventListener('change', () => {
	calculate();
	shitRub();
});
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);

calculate();
