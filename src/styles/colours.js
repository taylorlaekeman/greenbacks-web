const palette = {
  white: 'white',
  primary: {
    500: 'hsl(145, 80%, 50%)',
    900: 'hsl(145, 100%, 10%)'
  }
};

export default {
  ...palette,
  background: {
    overflow: palette.white,
    page: palette.white,
    text: palette.primary[900]
  },
  text: {
    title: palette.primary[900],
    normal: palette.primary[900]
  }
};
