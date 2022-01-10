import './style.scss'
export default async function () {
  function inject() {
    document.body.classList.add('QBC');
    document.body.classList.add('fullContainer');
  }
  if (document.body) {
    inject()
  } else {
    window.addEventListener('DOMContentLoaded', () => inject);
  }
}