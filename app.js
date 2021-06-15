const express = require('express');

// Initialiser l'application
const app = express();
const path = require('path');
const axios = require('axios')

//  Lier  mon express.js à un moteur de template
// 1. On va recup mes templates dans le dossier views
app.set('views', path.join(__dirname,'views'));

// 2. Connecter twig à express.js
app.set('view engine', 'twig');

// Définir le port dans une variable
const port = process.env.PORT || 5000;

// Rendre disponible en URL tout fichier
// dans le dossier public
app.use(express.static('public'));

// Routing
app.get('/', (req, res) => {
    res.render('index', {title : "Page d'accueil"});
})

app.get('/blog', (req,res) => {
    //récupérer la liste des articles
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then(resAxios => {
        console.log(resAxios.data);
        res.render('blog', {posts : resAxios.data});
    })
})

// API posts title et body
app.get('/blog/:id', (req, res) => {
   axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
   .then(resAxios => {
       console.log(resAxios.data);

       // Mes données de l'API que je reçois
       // Je les envoie dans le template twig
       // Dans mon template
       res.render('articles', {myArticle: resAxios.data});
   })
})

app.get('/contact', (req,res) => {
    res.render('contact', {mail : "JB@gmail.com"});
})

// Ex: /utilisateurs/7
app.get('/users/:id', (req,res) => {

    // Vient récupérer tout ce qu'il y a après /utilisateurs/
    // Et ça va le mettre dans :bachi
    // Et ça, ça le transvide dans req.params.bachi
    // Dans mon ex, id -> 7

   // Récupérer les données de l'API JSON placeholder
   // POur un utilisateur précis
   // Ici, celui dont l'id correspond à req.params.bachi
   axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
   .then(resAxios => {
       console.log(resAxios.data);

       // Mes données de l'API que je reçois
       // Je les envoie dans le template twig
       // Avec un nom myUser qui permet de faire
       // Dans mon template
       // {{myUser.quelquechose}}
       res.render('user', {myUser: resAxios.data});
   })
})


// lance le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});