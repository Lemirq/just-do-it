import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCsh5M11b0Og8v9kHjZqQXKszm7neH3xgg',
	authDomain: 'todo-app-b38f4.firebaseapp.com',
	databaseURL: 'https://todo-app-b38f4-default-rtdb.firebaseio.com',
	projectId: 'todo-app-b38f4',
	storageBucket: 'todo-app-b38f4.appspot.com',
	messagingSenderId: '562527986925',
	appId: '1:562527986925:web:90fc618ff619ad6dbb18e4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();
