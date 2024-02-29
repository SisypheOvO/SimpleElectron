document.getElementsByClassName('notifi')[0].addEventListener('click', function() {
    var notification = new Notification('Ciallo~', {
        body: "Any problem? We'll be right there soon.",
        silent: false,
        icon: 'icon.png',
        requireInteraction: true
    });
    notification.onclick = () => {
        console.log('Notification clicked');
    };
});