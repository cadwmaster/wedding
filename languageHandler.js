function changeLanguage(lang) {
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            if (data[lang]) {
                applyTranslations(data[lang]);
            } else {
                // Fallback to English if the requested language is not available
                applyTranslations(data['en']);
            }

        })
        .catch(error => {
            console.error('Error loading the translations:', error);
            // Fallback to English in case of any error
            changeLanguage('en');
        });
}

function applyTranslations(translations) {
    const elements = {
        greetings: document.getElementById('greetings'),
        prefix: document.getElementById('prefix'),
        contribute:  document.getElementById('contribute'),
        thankyou: document.getElementById('thankyou'),
        goodbye: document.getElementById('goodbye'),
        "contribute.message": document.getElementById('contributeMessage'),
        "contribute.thankyou": document.getElementById('contributeThankyou'),
    };

    for (let key in elements) {
        if (elements[key]) {
            elements[key].innerHTML = translations[key];
        }
    }
}

function detectLanguage() {
    const defaultLang = 'en'; // Default to English
    const supportedLanguages = ['en', 'de']; // List supported languages
    let browserLang = navigator.language || navigator.userLanguage;

    // Some browsers return language in the format of 'en-US'
    browserLang = browserLang.split('-')[0]; // Extract 'en' from 'en-US'

    // Check if the detected language is supported
    if (supportedLanguages.includes(browserLang)) {
        changeLanguage(browserLang);
    } else {
        changeLanguage(defaultLang); // Fallback to default
    }
}

document.addEventListener('DOMContentLoaded', detectLanguage);