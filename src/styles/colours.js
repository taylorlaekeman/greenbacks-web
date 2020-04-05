const palette = {
  neutral: {
    100: 'white',
    200: 'hsl(100, 3%, 95%)',
    300: 'hsl(100, 3%, 90%)',
    400: 'hsl(100, 2%, 78%)',
    500: 'hsl(100, 3%, 70%)',
    600: 'hsl(100, 2%, 56%)',
    700: 'hsl(100, 3%, 38%)',
    800: 'hsl(100, 4%, 27%)',
    900: 'hsl(100, 7%, 20%)',
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
      primary: palette.neutral[300],
    },
    overflow: palette.neutral[100],
    page: palette.neutral[100],
  },
  border: {
    button: {
      primary: palette.primary[900],
    },
    divider: palette.neutral[300],
    normal: palette.neutral[700],
  },
  text: {
    button: {
      primary: palette.neutral[900],
    },
    label: palette.neutral[700],
    normal: palette.neutral[900],
    placeholder: palette.neutral[600],
    subtitle: palette.neutral[700],
    title: palette.neutral[900],
    understated: palette.neutral[700],
  },
};
