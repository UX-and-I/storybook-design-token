export const createButton = ({ label, onClick }) => {
  const btn = document.createElement('button');

  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  btn.className = ['storybook-button'];

  return btn;
};
