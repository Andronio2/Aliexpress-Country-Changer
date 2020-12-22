// ==UserScript==
// @name         Aliexpress Country Changer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Изменяет страну и валюту
// @author       Andronio
// @homepage     https://github.com/Andronio2/Aliexpress-Country-Changer
// @supportURL   https://github.com/Andronio2/Aliexpress-Country-Changer/issues
// @updateURL    https://github.com/Andronio2/Aliexpress-Country-Changer/raw/main/Aliexpress%20Country%20Changer.user.js
// @downloadURL  https://github.com/Andronio2/Aliexpress-Country-Changer/raw/main/Aliexpress%20Country%20Changer.user.js
// @match        https://*.aliexpress.ru/*
// @match        https://*.aliexpress.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function () {
    'use strict';

let myCurrency	= "KZT";
let myCountry	= "KZ";
let myLocale    = "ru_RU";

/*    const cookieSettings = {
		'aep_usuc_f': {
			'region':   myCountry,
			'b_locale': myLocale,
			'c_tp':     myCurrency,
		},
		'xman_us_f': {
			'x_locale': myLocale
		}
	}
*/

/*    const cookieSettings = {
		'aep_usuc_f': {
			'region':   myCountry,
			'c_tp':     myCurrency,
			'x_alimid':	'2'
		}
	}
*/
    const cookieSettings = {
		'aep_usuc_f': {
			'region':   myCountry,
			'c_tp':     myCurrency
		}
	}
	
	if (!location.href.includes("mydata=123")) {
		let strMass = [];
		let cookies = document.cookie.split('; ');
		let isNeedModif = false;

		const findNReplace = (str, key, value) => {
			if (str.includes(key)) {
				let re = new RegExp(key + '=[^&$]+');
                if (str.match(re)[0] !== (key + '=' + value)) {
                    str = str.replace(re, key + '=' + value);
                    isNeedModif = true;
                }
            } else {
                str = key + '=' + value + str;
                isNeedModif = true;
            }
			return str;
		};

        const setCookies = (mass, host) => {
            mass.forEach( str => {
				document.cookie = `${str}; path=/; expires=Tue, 19 Jan 2088 03:14:07 GMT; domain=.${host}`;

            });
        };

		cookies.forEach(cookie => {
			for (let cookieName in cookieSettings) {
                if (cookie.startsWith(cookieName)) {                                    // Если нашел нужную куку
                    let str = cookie.slice(cookieName.length + 1)                       // Убрали начало
                    for (let subCookie in cookieSettings[cookieName]) {
                        str = findNReplace(str, subCookie, cookieSettings[cookieName][subCookie]);
                    }
                    strMass.push(cookieName + '=' + str);
                }
            }
		});
		if (isNeedModif) {
			if (location.hostname.includes("aliexpress.ru")) {
                setCookies(strMass, "aliexpress.ru");
			} else if (location.hostname.includes("aliexpress.com")) {
                setCookies(strMass, "aliexpress.com");
			} else {alert("Ошибка в скрипте")};
            location.reload();
        };
	};
})();
