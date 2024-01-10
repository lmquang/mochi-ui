import plugin from 'tailwindcss/plugin.js'
import Color from 'color'
import { commonColors, semanticColors } from './colors'
import { flattenThemeObject } from './util'

const parsedColorsCache: Record<string, number[]> = {}

export const mochiui = () => {
  const themes = {
    light: {
      colors: semanticColors.light,
    },
    dark: {
      colors: semanticColors.dark,
    },
  }

  const resolved: {
    variants: { name: string; definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<
      string,
      ({
        opacityValue,
        opacityVariable,
      }: {
        opacityValue: string
        opacityVariable: string
      }) => string
    >
  } = {
    variants: [],
    utilities: {},
    colors: {},
  }

  for (const [themeName, { colors }] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`

    // use light as default theme
    if (themeName === 'light') {
      cssSelector = `:root,${cssSelector}`
    }

    resolved.utilities[cssSelector] = themeName
      ? {
          'color-scheme': themeName,
        }
      : {}

    const flatColors = flattenThemeObject(colors) as Record<string, string>

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return

      try {
        const parsedColor =
          parsedColorsCache[colorValue] ||
          Color(colorValue).hsl().round().array()
        parsedColorsCache[colorValue] = parsedColor

        const [h, s, l, defaultAlphaValue] = parsedColor
        // const colorVariable = `--tw-${colorName}`
        // const opacityVariable = `--tw-${colorName}-opacity`
        const mochiColorVariable = `--tw-${colorName}`
        const mochiOpacityVariable = `--tw-${colorName}-opacity`
        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![mochiColorVariable] =
          `${h} ${s}% ${l}%`
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === 'number') {
          resolved.utilities[cssSelector]![mochiOpacityVariable] =
            defaultAlphaValue.toFixed(2)
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!Number.isNaN(+opacityValue)) {
            return `hsl(var(${mochiColorVariable}) / ${opacityValue})`
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the opacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${mochiColorVariable}) / var(${mochiOpacityVariable}, var(${opacityVariable})))`
          }
          return `hsl(var(${mochiColorVariable}) / var(${mochiOpacityVariable}, 1))`
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message)
      }
    }
  }

  return plugin(
    ({ addVariant, addUtilities }) => {
      // add the css variables to "@layer utilities"
      addUtilities({
        ...resolved?.utilities,
        '.landing-container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          '@screen lg': {
            paddingLeft: '5rem',
            paddingRight: '5rem',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
        },
        '.dashboard-container': {
          width: '100%',
          maxWidth: '1108px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen md': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
        },
      })

      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition)
      })
    },
    {
      theme: {
        extend: {
          colors: {
            ...commonColors,
            ...resolved?.colors,
            // keep these colors for backward-compatible
            neutral: {
              0: '#ffffff',
              100: '#faf9f7',
              150: '#f4f3f2',
              200: '#eeedec',
              300: '#e5e4e3',
              400: '#d4d3d0',
              500: '#adacaa',
              600: '#848281',
              700: '#4c4d4d',
              800: '#343433',
              900: '#1a1a19',
              1000: '#000000',
            },
            primary: {
              100: '#f0f7ff',
              200: '#dcecfe',
              300: '#beddfe',
              400: '#91c5fd',
              500: '#61abfa',
              600: '#3d97f7',
              700: '#017aff',
              800: '#0068d6',
              900: '#0054ad',
              1000: '#004085',
            },
            secondary: {
              100: '#f8f5ff',
              200: '#efe7fe',
              300: '#e4d7fe',
              400: '#ccb4fd',
              500: '#af89fa',
              600: '#9e70fa',
              700: '#8a54f7',
              800: '#6d35de',
              900: '#5221b5',
              1000: '#451d95',
            },
            green: {
              100: '#edfdf6',
              200: '#d1fae9',
              300: '#a5f3d2',
              400: '#6ee7b5',
              500: '#36d392',
              600: '#0ea466',
              700: '#088752',
              800: '#037244',
              900: '#06603a',
              1000: '#064c2f',
            },
            yellow: {
              100: '#fff8eb',
              200: '#fff1d6',
              300: '#fee2a9',
              400: '#fdcf72',
              500: '#fbbb3c',
              600: '#db7712',
              700: '#b25e09',
              800: '#96530f',
              900: '#7f460d',
              1000: '#663a0f',
            },
            red: {
              100: '#fef1f2',
              200: '#fee1e3',
              300: '#fec8cc',
              400: '#fca6ad',
              500: '#f8727d',
              600: '#ef4352',
              700: '#e02d3c',
              800: '#ba2532',
              900: '#081b25',
              1000: '#86131d',
            },
          },
          fontSize: {
            xxs: '11px',
            xxxs: '10px',
            '3.5xl': '32px',
            '4.5xl': '40px',
          },
          boxShadow: {
            small:
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            input: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            demp: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'input-focused':
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            button: '0px 0px 8px 0px rgba(0, 0, 0, 0.04)',
            'button-focused-primary':
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'button-focused-gray':
              '0px 0px 0px 4px #F4F3F2, 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'button-focused-destructive':
              '0px 0px 0px 4px rgba(224, 45, 60, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          },
          width: {
            18: '4.5rem',
          },
          keyframes: {
            'slide-left': {
              '0%': { transform: 'translate(-100%, 0)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-right': {
              '0%': { transform: 'translate(100%, 0)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-top': {
              '0%': { transform: 'translate(0, -100%)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-bottom': {
              '0%': { transform: 'translate(0, 100%)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'fade-in': {
              '0%': { opacity: '0.3' },
              '100%': { opacity: '1' },
            },
            'accordion-open': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-close': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
          },
          animation: {
            'slide-from-left': 'slide-left 0.2s ease-in-out',
            'slide-from-right': 'slide-right 0.2s ease-in-out',
            'slide-from-top': 'slide-top 0.2s ease-in-out',
            'slide-from-bottom': 'slide-bottom 0.2s ease-in-out',
            'fade-in': 'fade-in 0.5s ease-in-out',
            'accordion-open': 'accordion-open 0.2s ease-out',
            'accordion-close': 'accordion-close 0.2s ease-out',
          },
          screens: {
            '4xl': '1728px',
            '3xl': '1536px',
            '2xl': '1440px',
            xl: '1280px',
            lg: '1024px',
            md: '768px',
            sm: '425px',
            xs: '375px',
          },
        },
      },
    },
  )
}
