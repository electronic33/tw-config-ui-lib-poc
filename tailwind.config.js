/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/**/*.tsx'],
  theme: {
    extend: {},
    components: ({ theme }) => ({
      button: {
        sizes: {
          xs: {
            px: '4px',
            height: '16px',
            fontSize: '12px',
            borderRadius: '2px',
            shadow: theme('boxShadow.DEFAULT'),
          },
          sm: {
            px: '6px',
            height: '20px',
            fontSize: '14px',
            borderRadius: '2px',
            shadow: theme('boxShadow.DEFAULT'),
          },
          md: {
            px: '8px',
            height: '28px',
            fontSize: '16px',
            borderRadius: '4px',
            shadow: theme('boxShadow.DEFAULT'),
          },
          lg: {
            px: '12px',
            height: '36px',
            fontSize: '20px',
            borderRadius: '4px',
            shadow: theme('boxShadow.lg'),
          },
          xl: {
            px: '16px',
            height: '42px',
            fontSize: '24px',
            borderRadius: '6px',
            shadow: theme('boxShadow.xl'),
          },
        },
        colors: {
          primary: {
            filled: {
              backgroundColor: theme('colors.blue.600'),
              textColor: theme('colors.white'),
              hover: {
                backgroundColor: theme('colors.blue.400'),
                textColor: theme('colors.white'),
              },
            },
            outlined: {
              backgroundColor: theme('colors.transparent'),
              textColor: theme('colors.blue.600'),
              hover: {
                backgroundColor: theme('colors.blue.400'),
                textColor: theme('colors.white'),
              },
            },
          },
          neutral: {
            filled: {
              backgroundColor: theme('colors.gray.200'),
              textColor: theme('colors.gray.900'),
              hover: {
                backgroundColor: theme('colors.blue.400'),
                textColor: theme('colors.white'),
              },
            },
            outlined: {
              backgroundColor: theme('colors.transparent'),
              textColor: theme('colors.gray.900'),
              hover: {
                backgroundColor: theme('colors.blue.400'),
                textColor: theme('colors.white'),
              },
            },
          },
        },
      },
    }),
  },
  plugins: [],
};
