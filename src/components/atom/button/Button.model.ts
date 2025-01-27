const buttonVariants = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'

  }
  
   const buttonActions = {
    default: 'default',
    defaultInverted: 'defaultInverted',
    primary: 'primary',
    secondary: 'secondary',
    warning: 'warning',
    danger: 'danger',
  }


  export type ButtonVariants = keyof typeof buttonVariants
  export type ButtonActions = keyof typeof buttonActions
  export type ButtonType = 'default' | 'outline'
  export type ButtonAlignments = 'flex-start' | 'center' | 'flex-end';
  export type ButtonBorder = 'full' | 'semiSquare';
  export type ButtonFontFamily = 'primary' | 'secondary';
  