const burger = document.querySelector(".burger");
const burgerTitle = burger.querySelector(".menu-title");
const burgerCloseBtn = burger.querySelector('.burger-close');

burgerTitle.addEventListener("click", function (event) {
	const burgerClassList = Object.values(burger.classList);

	if (burgerClassList.some(className => className === "expand")) {
		burger.classList.remove("expand");
	} else {
		burger.classList.add("expand");
	}
});

burgerCloseBtn.addEventListener('click', () => {
	if (burger.classList.contains('expand')) {
		burger.classList.remove("expand");
	}
});



// отправка emaila, оповещение о успешной отправке
const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content p');

// modalTrigger.forEach(btn => {
// 	btn.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		modal.classList.add('show');
// 		modal.classList.remove('hide');
// 		document.body.style.overflow = 'hidden';
// 	});
// });

function showModal (message) {
	modal.classList.add('show');
	modal.classList.remove('hide');
	modalContent.textContent = message;
	document.body.style.overflow = 'hidden';
}

function hideModal () {
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
	if (e.target === modal || e.target.getAttribute('data-close') == '') {
		hideModal();
	}
});

function showMessage(text, className) {
	const statusMessage = document.createElement('div');
	statusMessage.textContent = text;
	statusMessage.style.cssText = `
		display: block;
		margin: 30px auto 0;
	`;
	if (className) {
		statusMessage.classList.add(className);
	}
	form.after(statusMessage);

	return function () {
		return statusMessage.remove();
	};
}

// форма  JSON
const form = document.querySelector('form');

const message = {
	invalidEmail: 'Invalid email',
	loading: 'Loading...',
	success: 'Thanks! We will contact you soon',
	failure: 'Something went wrong...'
};

function postData(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const pattern = /^(\w|\.)+@([\w-]+\.)+[\w-]{2,4}$/giu;
		const email = e.target.querySelector('input[name="email"]');
		if (!pattern.test(email.value)) {
			const hideMessage = showMessage(message.invalidEmail, 'text-danger');
			setTimeout(hideMessage, 5000);
			return;
		}

		const hideLoading = showMessage(message.loading);

		const request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		// обязательно указаь заголовок
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		const formData = new FormData(form);

		// превращаем формат FormData в json
		const object = {};
		formData.forEach(function(value, key) {
			object[key] = value;
		});
		const json = JSON.stringify(object);
				// |_
				//    |__
			//        |
		request.send(json);

		request.addEventListener('load', () => {
			if (request.status === 200) {
				console.log(request.response);
				showModal(message.success);
				hideLoading();
				form.reset();
			} else {
				showModal(message.failure);
			}
		});
	});
	}



	postData(form);