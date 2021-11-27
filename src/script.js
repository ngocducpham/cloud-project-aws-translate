import './components/source-drop';
import './components/target-drop'
import './libs/aws-sdk'
import { languageCodes } from './utils/langcode';

document.getElementById('inputText').focus();
AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.Credentials(
	'AKIAZUSFWJ4QJ3MGRUHE',
	'QNEwt7glXKrL4KpV389e0Q1BZa+MHsWguUwpowiv'
);

var translate = new AWS.Translate({ region: AWS.config.region });
var polly = new AWS.Polly();
let inputText = document.getElementById('inputText');
let clearInputButton = document.querySelector('.clearInputButton');
let invertedLanguageButton = document.querySelector('.invertedLanguageButton');
let speechInput = document.querySelector('.speechInputButton');
let speechOutput = document.querySelector('.speechOutputButton');
let transTimeout;

inputText.addEventListener('keyup', realTimeTrans);
clearInputButton.addEventListener('click', clearInputs);
speechInput.addEventListener('click', doSynthesizeInput);
speechOutput.addEventListener('click',doSynthesizeOutput);

function realTimeTrans() {
	clearTimeout(transTimeout);
	transTimeout = setTimeout(doTranslate, 300);
}

function readStringBytes(string) {
	let len = string.length;
	let totalBytes = 0;
	for (let index = 0; index < string.length; index++) {
		const element = string[index];
		totalBytes += new Blob([String.fromCharCode(element.codePointAt(0))]).size;
	}
	let lableLimit = document.getElementById('lableLimit');
	lableLimit.textContent = `${len} characters, ${totalBytes} of 5000 bytes used`;
	if (totalBytes > 5000) return string.slice(0, 5000);
	return string;
}

function doTranslate() {
	var inputText = readStringBytes(document.getElementById('inputText').value);
	if (!inputText) {
		var outputTextArea = document.getElementById('outputText');
		outputTextArea.value = '';
		exit();
	}

	var sourceDropdown = document.getElementById('sourceLanguageDropdown');
	var sourceLanguageCode = sourceDropdown.getAttribute('code');

	var targetDropdown = document.getElementById('targetLanguageDropdown');
	var targetLanguageCode = targetDropdown.getAttribute('code');

	let detectLangText = document.querySelector('.langDetectText');
	if (sourceLanguageCode == 'auto') {
		detectLangText.classList.remove('hidden');
	} else detectLangText.classList.add('hidden');

	var params = {
		Text: inputText,
		SourceLanguageCode: sourceLanguageCode,
		TargetLanguageCode: targetLanguageCode
	};

	translate.translateText(params, function (err, data) {
		if (err) {
			console.log(err, err.stack);
			alert('Error calling Amazon Translate. ' + err.message);
			return;
		}
		if (data) {
			var outputTextArea = document.getElementById('outputText');
			outputTextArea.value = data.TranslatedText;
			detectLangText.innerText = `Detected language: ${
				languageCodes[data.SourceLanguageCode]
			} (${data.SourceLanguageCode})`;
			sourceDropdown.setAttribute('code', data.SourceLanguageCode);
		}
	});
}

function doSynthesizeInput() {
	var text = document.getElementById('inputText').value.trim();
	if (!text) {
		return;
	}
	var sourceLanguageCode = document.getElementById('sourceLanguageDropdown').getAttribute('code');
	doSynthesize(text, sourceLanguageCode);
}

function doSynthesizeOutput() {
	var text = document.getElementById('outputText').value.trim();
	if (!text) {
		return;
	}
	var targetLanguageCode = document.getElementById('targetLanguageDropdown').getAttribute('code');
	doSynthesize(text, targetLanguageCode);
}

function doSynthesize(text, languageCode) {
	var voiceId;
	switch (languageCode) {
		case 'am':
			voiceId = 'Zeina';
			break;
		case 'zh':
		case 'zh-TW':
			voiceId ='Zhiyu'
			break;
		case 'da':
			voiceId = 'Naja';
			break;
		case 'de':
			voiceId = 'Marlene';
			break;
		case 'nl':
			voiceId = 'Lotte';
			break;
		case 'hi':
			voiceId = 'Aditi';
			break;
		case 'ja':
			voiceId = 'Mizuki';
			break;
		case 'en':
			voiceId = 'Joanna';
			break;
		case 'es':
			voiceId = 'Penelope';
			break;
		case 'fr':
			voiceId = 'Celine';
			break;
		case 'pt':
			voiceId = 'Vitoria';
			break;
		default:
			voiceId = null;
			break;
	}
	if (!voiceId) {
		alert('Speech synthesis unsupported for language code: "' + languageCode + '"');
		return;
	}
	var params = {
		OutputFormat: 'mp3',
		SampleRate: '8000',
		Text: text,
		TextType: 'text',
		VoiceId: voiceId
	};
	polly.synthesizeSpeech(params, function (err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
			alert('Error calling Amazon Polly. ' + err.message);
		} else {
			var uInt8Array = new Uint8Array(data.AudioStream);
			var arrayBuffer = uInt8Array.buffer;
			var blob = new Blob([arrayBuffer]);
			var url = URL.createObjectURL(blob);

			let audioElement = new Audio([url]);
			audioElement.play();
		}
	});
}

function clearInputs() {
	document.getElementById('inputText').value = '';
	document.getElementById('outputText').value = '';
}

function invertedLanguageCode() {
	let targetDropdown = document.getElementById('targetLanguageDropdown');
	let sourceDropdown = document.getElementById('sourceLanguageDropdown');
	let inputText = document.getElementById('inputText');
	let outputText = document.getElementById('outputText');

	if (sourceDropdown.value === 'auto' || targetDropdown.value === sourceDropdown.value) return;
	let temp = targetDropdown.value;
	targetDropdown.value = sourceDropdown.value;
	sourceDropdown.value = temp;

	inputText.value = outputText.value;
	doTranslate();
}
