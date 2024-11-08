import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

async function loadNews() {
    const newsContainer = document.getElementById('newsContainer');
    
    try {
        const querySnapshot = await getDocs(collection(db, 'news'));
        querySnapshot.forEach((doc) => {
            const news = doc.data();
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
            
            const imageUrl = news.imageUrl ? `<img src="${news.imageUrl}" alt="Imagen de la noticia">` : '';
            
            newsElement.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                ${imageUrl} <!-- Cargar la imagen si la URL está presente -->
                <small>${news.type} - ${new Date(news.createdAt.seconds * 1000).toLocaleDateString()}</small>
            `;
            
            newsContainer.appendChild(newsElement);
        });
    } catch (e) {
        console.error('Error al cargar noticias: ', e);
    }
}

loadNews();
