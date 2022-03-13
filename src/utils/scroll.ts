export const hiddenScroll = (body: any, toggle: boolean) => {
  if (toggle) {
    body.style.overflow = 'hidden';
    return;
  }
  body.style.overflow = 'auto';
};
