
  import { Dimensions, PixelRatio,ViewStyle } from 'react-native';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const guidelineBaseWidth = 350;

// Função para verificar se o dispositivo é um tablet
export const isTablet = WINDOW_WIDTH >= 600;

// Funções de escala ajustadas manualmente para diferentes dispositivos
export const scaleSize = (size: number): number => {
  if (isTablet) {
    return size * 1.2;  // Ajuste para tablets (por exemplo, 1.5x maior)
  }
  return size;  // Ajuste para telefones (tamanho padrão)
};


function dimensions(
  top: number, 
  right: number = top, 
  bottom: number = top, 
  left: number = right, 
  property: 'margin' | 'padding'
): { [key: string]: number } {
  let styles: { [key: string]: number } = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top: number, right?: number, bottom?: number, left?: number): { [key: string]: number } {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top: number, right?: number, bottom?: number, left?: number): { [key: string]: number } {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color: string, 
  offset: { height: number; width: number } = { height: scaleSize(2), width: scaleSize(2) }, 
  radius: number = scaleSize(8), 
  opacity: number = scaleSize(0.2)
): ViewStyle {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export const SCALE_18 = scaleSize(18);
export const SCALE_16 = scaleSize(16);
export const SCALE_12 = scaleSize(12);
export const SCALE_8 = scaleSize(8);
  