
function toggleMusic() {
    var audio = document.getElementById("background-music");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Yorumları kaydetme fonksiyonu
function saveComment(commentData) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentData); // Yeni yorumu mevcut yorumların listesine ekle
    localStorage.setItem('comments', JSON.stringify(comments)); // Güncellenmiş listeyi localStorage'a kaydet
}

// Yorumları yükleme fonksiyonu
function loadComments() {
    const commentsList = document.querySelector('.comments-list');
    commentsList.innerHTML = ''; // Önceki yorumları temizle

    let comments = JSON.parse(localStorage.getItem('comments')) || []; // localStorage'dan yorumları al
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.textContent = `${comment.name} ${comment.surname}: ${comment.comment}`; // Yorum metnini oluştur
        
        // Silme butonunu oluştur
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.classList.add('delete-button'); // Silme butonuna sınıf ekle
        deleteButton.addEventListener('click', () => {
            deleteComment(index); // Silme fonksiyonunu çağır
        });

        commentElement.appendChild(deleteButton); // Silme butonunu yorumun yanına ekle
        commentsList.appendChild(commentElement); // Yorumları listeye ekle
    });
}

function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || []; // Mevcut yorumları al
    const commentToDelete = comments[index];

    // Yorumun silinip silinmeyeceğine dair bir onay isteyin
    if (confirm(`Bu yorumu silmek istiyor musunuz? ${commentToDelete.name} ${commentToDelete.surname}: ${commentToDelete.comment}`)) {
        comments.splice(index, 1); // İlgili indeksteki yorumu sil
        localStorage.setItem('comments', JSON.stringify(comments)); // Güncellenmiş listeyi kaydet
        loadComments(); // Güncellenmiş yorumları yükle
    }
}

// Form gönderildiğinde yorum kaydetme
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const comment = document.querySelector('.comment-input').value.trim();

    if (name && surname && comment) {
        const commentData = { name, surname, comment }; // Yorum verisini oluştur
        saveComment(commentData); // Yorum verisini kaydet
        loadComments(); // Yorumları yükle
        commentForm.reset(); // Formu sıfırla
    }
});

// Sayfa yüklendiğinde yorumları yükle
document.addEventListener('DOMContentLoaded', loadComments);
