import { memo } from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import * as Icons from '@expo/vector-icons';

type IconFamily = 'Feather' | 'Material' | 'AntDesign' | 'FontAwesome' | 'Ionicons';

type FeatherIcons = keyof typeof Icons.Feather['glyphMap'];
type MaterialIcons = keyof typeof Icons.MaterialIcons['glyphMap'];
type AntDesignIcons = keyof typeof Icons.AntDesign['glyphMap'];
type FontAwesomeIcons = keyof typeof Icons.FontAwesome['glyphMap'];
type IoniconsIcons = keyof typeof Icons.Ionicons['glyphMap'];

type IconName = 
  | FeatherIcons
  | MaterialIcons
  | AntDesignIcons
  | FontAwesomeIcons
  | IoniconsIcons;
  

export interface IconProps {
  name: IconName;
  family?: IconFamily;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const iconMap = {
  Feather: Icons.Feather,
  Material: Icons.MaterialIcons,
  AntDesign: Icons.AntDesign,
  FontAwesome: Icons.FontAwesome,
  Ionicons: Icons.Ionicons
};

const Icon = memo(({ 
  name, 
  family = 'Feather', 
  size = 24, 
  color = '#000',
  style
}: IconProps) => {
  const IconComponent = iconMap[family];
  return <IconComponent name={name as any} size={size} color={color} style={style} />;
});

Icon.displayName = 'Icon';

export default Icon;