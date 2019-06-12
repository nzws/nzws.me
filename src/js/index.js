import turbolinks from 'turbolinks';

function load() {
  if (window.ready) {
    window.ready();

    window.ready = null;
  }
}

turbolinks.start();
document.addEventListener('turbolinks:load', load);
window.onload = load;
