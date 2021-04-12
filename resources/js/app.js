
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/App');
require('./components/NavBarPage');
require('./components/NavbarPageAuth');
require('./components/Footerpage');

import '../sass/SaludMejor.css';

if(document.getElementById('getToken'))
    localStorage.setItem('tk',document.getElementById('getToken').dataset.token)
