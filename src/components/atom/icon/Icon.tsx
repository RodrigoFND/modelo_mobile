import { memo } from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import * as Icons from '@expo/vector-icons';

type IconFamily = 'Feather' | 'Material' | 'AntDesign' | 'FontAwesome' | 'Ionicons';

type IconName = keyof (typeof Icons.Feather['glyphMap'] | 
  typeof Icons.MaterialIcons['glyphMap'] | 
  typeof Icons.AntDesign['glyphMap'] | 
  typeof Icons.FontAwesome['glyphMap'] | 
  typeof Icons.Ionicons['glyphMap']);

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
  return <IconComponent name={name} size={size} color={color} style={style} />;
});

Icon.displayName = 'Icon';

export default Icon;