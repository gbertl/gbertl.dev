export const toggleBodyScroll = () => {
  document.body.classList.toggle('overflow-y-hidden');
};

export const hideBodyScroll = () => {
  document.body.classList.add('overflow-y-hidden');
};

export const showBodyScroll = () => {
  document.body.classList.remove('overflow-y-hidden');
};

export const generateOverlayEffect = () => {
  for (let x = 0; x < 10; x++) {
    const div = document.createElement('div');
    div.className = 'overlay-effect__item';
    document.querySelector('.overlay-effect')?.appendChild(div);
  }
};
