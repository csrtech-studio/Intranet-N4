import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

document.getElementById('newsForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const type = document.getElementById('type').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value || null; // Si no hay URL, se establece como null

    try {
        // Guardar en Firestore
        await addDoc(collection(db, 'news'), {
            type: type,
            title: title,
            content: content,
            imageUrl: imageUrl, // Guardar la URL de la imagen
            createdAt: new Date()
        });
        alert('Noticia agregada exitosamente.');
    } catch (e) {
        console.error('Error al agregar noticia: ', e);
        alert('Error al agregar noticia.');
    }
});
