import { languageCodes } from '../utils/langcode';

let sourceLanguageElement = document.getElementById('sourceLanguageDropdown');
let languageContainer = document.querySelector('.sourceLanguageContainer');
let sourceLangSearch = document.querySelector('.sourceLanguageSearchInput');
let modalElement = document.querySelector('.modal');
let languageButtonTextElement = document.querySelector('.sourceLanguageButtonText');
let langItems;

let previosItemSelected = undefined;

sourceLanguageElement.addEventListener('click', () => {
	togglelanguageContainer(10);
	sourceLangSearch.focus();
	modalElement.classList.remove('hidden');
});

modalElement.addEventListener('click', () => {
	if (!languageContainer.classList.contains('hidden')) {
		togglelanguageContainer(150);
	}
});

sourceLangSearch.addEventListener('keyup', () => {
	let langItemText;
	let searchText = sourceLangSearch.value.toUpperCase();

	for (const langItem of langItems) {
		langItemText = langItem.innerText.toUpperCase();
		if (langItemText.indexOf(searchText) > -1) {
			langItem.classList.remove('hidden');
		} else {
			langItem.classList.add('hidden');
		}
	}
});

addLanguageToList(0);

function togglelanguageContainer(delay) {
	modalElement.classList.add('hidden');
	setTimeout(() => {
		languageContainer.classList.toggle('hidden');
	}, delay);
}

function addLanguageToList(isSourceLang) {
	let lannguageListElement = document.querySelector('.lannguageSourceList');

	for (const [code, name] of Object.entries(languageCodes)) {
		lannguageListElement.appendChild(createLanguageNode(code, name));
	}

	langItems = document.querySelectorAll('.lannguageSourceList > li');
	selectedByIndex(0);
}

function createLanguageNode(code, name) {
	let langNode = document.createElement('li');

	langNode.className = 'px-3 py-1 hover:bg-gray-300 cursor-default border-t-2';
	langNode.innerText = `${name} (${code})`;
	langNode.setAttribute('value', code);

	langNode.addEventListener('click', () => {
		selectedItem(langNode);
		document.querySelector('.langDetectText').classList.add('hidden');
		togglelanguageContainer(150);
	});
	return langNode;
}

function selectedByIndex(index) {
	selectedItem(langItems[index]);
}

function selectedItem(item) {
	previosItemSelected?.classList.remove('bg-blue-200');
	previosItemSelected?.classList.add('hover:bg-gray-300');
	item.classList.remove('hover:bg-gray-300');
	item.classList.add('bg-blue-200');
	languageButtonTextElement.textContent = item.innerText;
	previosItemSelected = item;
	sourceLanguageElement.setAttribute('code', item.getAttribute('value'));
}
