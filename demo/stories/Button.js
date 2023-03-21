export const createButton = ({ label, onClick }) => {
  const container = document.createElement('div');
  const btn = document.createElement('button');
  const styles = document.createElement('style');

  styles.innerHTML = `
    :root {
      --border-radius-s: 4px;
      --brand: hsl(240, 100%, 50%);
      --spacing-s: 8px;
    }
  `;

  btn.type = 'button';
  btn.innerText = label;

  btn.style.backgroundColor = 'var(--brand)';
  btn.style.border = 'none';
  btn.style.borderRadius = 'var(--border-radius-s)';
  btn.style.cursor = 'pointer';
  btn.style.color = '#fff';
  btn.style.padding = 'var(--spacing-s)';

  btn.addEventListener('click', onClick);

  btn.className = ['storybook-button'];

  container.append(styles, btn);

  return container;
};
