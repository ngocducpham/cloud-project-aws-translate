import { languageCodes } from '../utils/langcode';

let targetLanguageElement = document.getElementById('targetLanguageDropdown');
let targetLanguageContainer = document.querySelector('.targetLanguageContainer');
let targetLangSearch = document.querySelector('.targetLanguageSearchInput');
let modalElement = document.querySelector('.modal');
let targetLanguageButtonTextElement = document.querySelector('.targetLanguageButtonText');
let targetLangItems;

let previosTargetItemSelected = undefined;

targetLanguageElement.addEventListener('click', () => {
	togglelanguageContainer(10);
	targetLangSearch.focus();
	modalElement.classList.remove('hidden');
});

modalElement.addEventListener('click', () => {
	if (!targetLanguageContainer.classList.contains('hidden')) {
		togglelanguageContainer(150);
	}
});

targetLangSearch.addEventListener('keyup', () => {
	let langItemText;
	let searchText = targetLangSearch.value.toUpperCase();

	for (const langItem of targetLangItems) {
		langItemText = langItem.innerText.toUpperCase();
		if (langItemText.indexOf(searchText) > -1) {
			langItem.classList.remove('hidden');
		} else {
			langItem.classList.add('hidden');
		}
	}
});

addLanguageToList();

function togglelanguageContainer(delay) {
	modalElement.classList.add('hidden');
	setTimeout(() => {
		targetLanguageContainer.classList.toggle('hidden');
	}, delay);
}

function addLanguageToList() {
	let lannguageListElement = document.querySelector('.lannguageTargetList');
    delete languageCodes.auto;

	for (const [code, name] of Object.entries(languageCodes)) {
		lannguageListElement.appendChild(createLanguageNode(code, name));
	}

	targetLangItems = document.querySelectorAll('.lannguageTargetList > li');
	selectedByIndex(0);
}

function createLanguageNode(code, name) {
	let langNode = document.createElement('li');

	langNode.className = 'px-3 py-1 hover:bg-gray-300 cursor-default border-t-2';
	langNode.innerText = `${name} (${code})`;
	langNode.setAttribute('value', code);

	langNode.addEventListener('click', () => {
		selectedItem(langNode);
		togglelanguageContainer(150);
	});
	return langNode;
}

function selectedByIndex(index) {
	selectedItem(targetLangItems[index]);
}

function selectedItem(item) {
	previosTargetItemSelected?.classList.remove('bg-blue-200');
	previosTargetItemSelected?.classList.add('hover:bg-gray-300');
	item.classList.remove('hover:bg-gray-300');
	item.classList.add('bg-blue-200');
	targetLanguageButtonTextElement.textContent = item.innerText;
	previosTargetItemSelected = item;
	targetLanguageElement.setAttribute('code', item.getAttribute('value'));
}
