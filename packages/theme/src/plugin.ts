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
              50: '#F9FAFB',
              100: '#F2F4F7',
              150: '#f4f3f2', // NOTE: Missing in design system on figma.
              200: '#EAECF0',
              300: '#D6DADD',
              400: '#d4d3d0',
              500: '#787E85',
              600: '#5D6267',
              700: '#4C5054',
              800: '#333639',
              900: '#17181D',
              1000: '#000000',
            },
            primary: {
              50: '#EFF8FF',
              100: '#D1E9FF',
              200: '#B2DDFF',
              300: '#84CAFF',
              400: '#53B1FD',
              500: '#2E90FA',
              600: '#1570EF',
              700: '#175CD3',
              800: '#1849A9',
              900: '#194185',
              1000: '#004085', // Mising in Design system
            },
            secondary: {
              50: '#F4F3FF',
              100: '#EBE9FE',
              200: '#D9D6FE',
              300: '#BDB4FE',
              400: '#9B8AFB',
              500: '#7A5AF8',
              600: '#6938EF',
              700: '#5925DC',
              800: '#4A1FB8',
              900: '#3E1C96',
              1000: '#451d95', // Missing in Design System
            },
            green: {
              50: '#ECFDF3', // Missing in Design System
              100: '#D1FADF',
              200: '#A6F4C5',
              300: '#6CE9A6',
              400: '#32D583',
              500: '#12B76A',
              600: '#039855',
              700: '#027A48',
              800: '#05603A',
              900: '#054F31',
              1000: '#064c2f', // Missing in Design System
            },
            yellow: {
              50: '#FFFAEB', // Missing in Design System
              100: '#FEF0C7',
              200: '#FEDF89',
              300: '#FEC84B',
              400: '#FDB022',
              500: '#F79009',
              600: '#DC6803',
              700: '#B54708',
              800: '#93370D',
              900: '#7A2E0E',
              1000: '#663a0f', // Missing in Design System
            },
            red: {
              50: '#FEF3F2', // Missing in Design System
              100: '#FEE4E2',
              200: '#FECDCA',
              300: '#FDA29B',
              400: '#F97066',
              500: '#F04438',
              600: '#D92D20',
              700: '#B42318',
              800: '#912018',
              900: '#7A271A',
              1000: '#86131d', // Missing in Design System
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
