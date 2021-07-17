// Existing code unchanged.
window.onload = function () {
    var context = new AudioContext();
    // Setup all nodes
}

// One-liner to resume playback when user interacted with the page.
document.querySelector('button').addEventListener('click', function () {
    context.resume().then(() => {
        console.log('Playback resumed successfully');
    });
});

document.querySelector('button').addEventListener('click', function () {
    var context = new AudioContext();
    // Setup all nodes
});