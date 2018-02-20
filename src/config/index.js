export default {
    serverPort: 3000,
    baseUrl: 'http://localhost:3000',
    views: {
        engine: '.hbs',
        extension: '.hbs',
        path: './views'
    },
    api: {
        // baseUrl: "http://192.168.1.85:3000"
        baseUrl: "http://localhost:3001"
    },
    firebase: {
        apiKey: "AIzaSyDCpyc_2UkvtjK0MF1aoqWs9HCCHJ5XpE8",
        authDomain: "scrumly-g33k.firebaseapp.com",
        databaseURL: "https://scrumly-g33k.firebaseio.com",
        projectId: "scrumly-g33k",
        storageBucket: "scrumly-g33k.appspot.com",
        messagingSenderId: "711623483286"
    }
}