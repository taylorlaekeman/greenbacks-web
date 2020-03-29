const palette = {
  white: 'white',
  neutral: {
    900: 'hsl(100, 10%, 20%)',
  },
  primary: {
    200: 'hsl(100, 70%, 90%)',
    500: 'hsl(100, 80%, 50%)',
    900: 'hsl(100, 100%, 10%)',
  },
};

export default {
  background: {
    button: {
      primary: palette.primary[200],
    },
    overflow: palette.white,
    page: palette.white,
  },
  border: {
    normal: palette.neutral[900],
    button: {
      primary: palette.primary[900],
    },
  },
  text: {
    button: {
      primary: palette.primary[900],
    },
    label: palette.neutral[900],
    normal: palette.neutral[900],
    title: palette.neutral[900],
  },
};
