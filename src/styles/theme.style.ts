import { borderRadius, borderWidth } from "./tokens/border.style";
import { colors } from "./tokens/colors.style";
import { fontsFamily, fontSizes } from "./tokens/fonts.style";
import { spacing } from "./tokens/spacing.style";
import { zIndex } from "./tokens/zIndex.style";

export interface BaseTheme {
  colors: {
    neutral: {
      neutral_50: string;
      neutral_100: string;
      neutral_200: string;
      neutral_300: string;
      neutral_400: string;
      neutral_default: string;
      neutral_600: string;
      neutral_700: string;
      neutral_800: string;
    };
    primary: {
      primary_200: string;
      primary_default: string;
      primary_600: string;
      primary_700: string;
    };
    secondary: {
      secondary_default: string;
      secondary_600: string;
    };
    warning: {
      orange_100: string;
      warning_200: string;
      warning_300: string;
      warning_400: string;
      warning_default: string;
      warning_600: string;
      warning_700: string;
    };
    danger: {
      danger_100: string;
      danger_200: string;
      danger_300: string;
      danger_400: string;
      danger_default: string;
    };
    generic: {
      white: string;
      black: string;
    };
  };
  borderWidth: {
    none: number;
    bw_default_1: number;
    bw_2: number;
    bw_4: number;
    bw_8: number;
  };
  borderRadius: {
    none: number;
    r_1: number;
    r_4: number;
    r_8: number;
    r_14: number;
    r_26: number;
    full: number;
  };
  spacing: {
    s_4: number;
    s_6: number;
    s_8: number;
    s_12: number;
    s_16: number;
    s_20: number;
    s_24: number;
    s_28: number;
    s_32: number;
    s_40: number;
    s_48: number;
    s_64: number;
    s_80: number;
    s_96: number;
    s_128: number;
    s_160: number;
    s_192: number;
  };
  fontSizes: {
    h1_display: { size: number; lineHeight: number; letterSpacing: number };
    h1: { size: number; lineHeight: number; letterSpacing: number };
    h2: { size: number; lineHeight: number; letterSpacing: number };
    h3: { size: number; lineHeight: number; letterSpacing: number };
    h4: { size: number; lineHeight: number; letterSpacing: number };
    h5: { size: number; lineHeight: number; letterSpacing: number };
    h6: { size: number; lineHeight: number; letterSpacing: number };
    h1_display_small: { size: number; lineHeight: number; letterSpacing: number };
    h1_small: { size: number; lineHeight: number; letterSpacing: number };
    h2_small: { size: number; lineHeight: number; letterSpacing: number };
    h3_small: { size: number; lineHeight: number; letterSpacing: number };
    h4_small: { size: number; lineHeight: number; letterSpacing: number };
    h5_small: { size: number; lineHeight: number; letterSpacing: number };
    h6_small: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_large_18: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_medium_16: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_small_14: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_xsmall_12: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_overline_large_14: { size: number; lineHeight: number; letterSpacing: number };
    paragraph_overline_small_12: { size: number; lineHeight: number; letterSpacing: number };
    label_large_18: { size: number; lineHeight: number; letterSpacing: number };
    label_medium_16: { size: number; lineHeight: number; letterSpacing: number };
    label_small_14: { size: number; lineHeight: number; letterSpacing: number };
    label_xsmall_12: { size: number; lineHeight: number; letterSpacing: number };
  };
  fontFamily: {
    primary: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    secondary: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  };
  zIndex: {
    background: number;
    standard: number;
    dropdown: number;
    popover: number;
    tooltip: number;
    modalOverlay: number;
    modal: number;
    drawerOverlay: number;
    drawer: number;
    toast: number;
  };
  mapped: {
    text: {
      default: string;
      defaultInverted: string;
      neutral: string;
      primary: string;
      primaryInverted: string;
      secondary: string;
      warning: string;
      danger: string;
      disabled: string;
      on: {
        neutral: string;
        default: string;
        defaultInverted: string;
        primary: string;
        primaryInverted: string;
        secondary: string;
        warning: string;
        danger: string;
        disabled: string;
      };
      active: {
        default: string;
      };
    };
    surface: {
      page: {
        default: string;
        inverted: string;
      };
      neutral: string;
      default: string;
      defaultInverted: string;
      primary: string;
      primaryInverted: string;
      secondary: string;
      danger: string;
      warning: string;
      disabled: string;
      hover: {
        default: string;
        defaultInverted: string;
        primary: string;
        primaryInverted: string;
        warning: string;
        danger: string;
      };
      pressed: {
        default: string;
        defaultInverted: string;
        primary: string;
        primaryInverted: string;
        warning: string;
        danger: string;
      };
    };
    border: {
      default: string;
      defaultFocused: string;
      error: string;
      errorFocused: string;
      disabled: string;
      filled: {
        default: string;
        defaultFocused: string;
        error: string;
        errorFocused: string;
        disabled: string;
      };
    };
  };
}

export const Theme: BaseTheme = {
  colors: {
    neutral: {
      neutral_50: colors.grey_50,
      neutral_100: colors.grey_100,
      neutral_200: colors.grey_200,
      neutral_300: colors.grey_300,
      neutral_400: colors.grey_400,
      neutral_default: colors.grey_default,
      neutral_600: colors.grey_600,
      neutral_700: colors.grey_700,
      neutral_800: colors.grey_800,
    },
    primary: {
      primary_200: colors.aqua_200,
      primary_default: colors.aqua_default,
      primary_600: colors.aqua_600,
      primary_700: colors.aqua_700,
    },
    secondary: {
      secondary_default: colors.blue_default,
      secondary_600: colors.blue_600,
    },
    warning: {
      orange_100: colors.orange_100,
      warning_200: colors.orange_200,
      warning_300: colors.orange_300,
      warning_400: colors.orange_400,
      warning_default: colors.orange_default,
      warning_600: colors.orange_600,
      warning_700: colors.orange_700,
    },
    danger: {
      danger_100: colors.red_100,
      danger_200: colors.red_200,
      danger_300: colors.red_300,
      danger_400: colors.red_400,
      danger_default: colors.red_default,
    },
    generic: {
      white: colors.white,
      black: colors.black,
    },
  },
  borderWidth: { ...borderWidth },
  borderRadius: { ...borderRadius },
  spacing: { ...spacing },
  fontSizes: { ...fontSizes },
  fontFamily: { ...fontsFamily },
  zIndex: { ...zIndex },

  mapped: {
    text: {
      default: colors.white,
      defaultInverted: colors.black,
      neutral: colors.grey_default,
      secondary: colors.white,
      primary: colors.aqua_default,
      primaryInverted: colors.white,
      warning: colors.orange_default,
      danger: colors.red_300,
      disabled: colors.grey_default,
      on: {
        default: colors.black,
        defaultInverted: colors.white,
        primary: colors.white,
        secondary: colors.white,
        primaryInverted: colors.aqua_default,
        warning: colors.white,
        danger: colors.white,
        neutral: colors.white,
        disabled: colors.grey_700,
      },
      active: {
        default: colors.aqua_600,
      },
    },
    surface: {
      page: {
        default: colors.white,
        inverted: colors.black,
      },
      neutral: colors.grey_default,
      default: colors.white,
      defaultInverted: colors.black,
      primary: colors.aqua_default,
      primaryInverted: colors.white,
      secondary: colors.blue_default,
      warning: colors.orange_default,
      danger: colors.red_default,
      disabled: colors.grey_200,
      hover: {
        default: colors.grey_200,
        defaultInverted: colors.black,
        primary: colors.aqua_600,
        primaryInverted: colors.grey_100,
        warning: colors.orange_300,
        danger: colors.red_300,
      },
      pressed: {
        default: colors.grey_600,
        defaultInverted: colors.grey_400,
        primary: colors.aqua_700,
        primaryInverted: colors.grey_200,
        warning: colors.orange_400,
        danger: colors.red_400,
      },
    },
    border: {
      default: colors.grey_400,
      defaultFocused: colors.grey_700,
      error: colors.red_default,
      errorFocused: colors.red_600,
      disabled: colors.grey_200,
      filled: {
        default: colors.grey_400,
        defaultFocused: colors.grey_700,
        error: colors.red_600,
        errorFocused: colors.red_800,
        disabled: colors.grey_200,
      },
    },
  },
};

// Tema de exemplo
export const LightTheme: BaseTheme = {
  ...Theme,
};

export const DarkTheme: BaseTheme = {
  ...Theme,
  mapped: {
    text: {
      default: colors.black,
      defaultInverted: colors.white,
      neutral: colors.grey_400,
      secondary: colors.black,
      primary: colors.aqua_default,
      primaryInverted: colors.black,
      warning: colors.orange_700,
      danger: colors.red_700,
      disabled: colors.grey_700,
      on: {
        default: colors.white,
        defaultInverted: colors.black,
        primary: colors.white,
        secondary: colors.black,
        primaryInverted: colors.aqua_700,
        warning: colors.black,
        danger: colors.black,
        neutral: colors.black,
        disabled: colors.grey_300,
      },
      active: {
        default: colors.aqua_700,
      },
    },
    surface: {
      page: {
        default: colors.black,
        inverted: colors.white,
      },
      neutral: colors.grey_700,
      default: colors.black,
      defaultInverted: colors.white,
      primary: colors.aqua_default,
      primaryInverted: colors.black,
      secondary: colors.blue_600,
      warning: colors.orange_700,
      danger: colors.red_700,
      disabled: colors.grey_800,
      hover: {
        default: colors.grey_800,
        defaultInverted: colors.white,
        primary: colors.aqua_700,
        primaryInverted: colors.grey_800,
        warning: colors.orange_700,
        danger: colors.red_700,
      },
      pressed: {
        default: colors.grey_800,
        defaultInverted: colors.grey_800,
        primary: colors.aqua_700,
        primaryInverted: colors.grey_800,
        warning: colors.orange_800,
        danger: colors.red_800,
      },
    },
    border: {
      default: colors.grey_700,
      defaultFocused: colors.grey_400,
      error: colors.red_700,
      errorFocused: colors.red_400,
      disabled: colors.grey_800,
      filled: {
        default: colors.grey_700,
        defaultFocused: colors.grey_400,
        error: colors.red_700,
        errorFocused: colors.red_400,
        disabled: colors.grey_800,
      },
    },
  },
};


