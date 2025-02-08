import { memo } from "react";
import { TextStyle, StyleProp } from "react-native";
import * as Icons from "@expo/vector-icons";
import useIconStyles, { IconAction, IconFamily, IconVariant } from "./Icon.style";

type FeatherIcons = keyof (typeof Icons.Feather)["glyphMap"];
type MaterialIcons = keyof (typeof Icons.MaterialIcons)["glyphMap"];
type AntDesignIcons = keyof (typeof Icons.AntDesign)["glyphMap"];
type FontAwesomeIcons = keyof (typeof Icons.FontAwesome)["glyphMap"];
type IoniconsIcons = keyof (typeof Icons.Ionicons)["glyphMap"];

type IconName =
  | FeatherIcons
  | MaterialIcons
  | AntDesignIcons
  | FontAwesomeIcons
  | IoniconsIcons;

export interface IconProps {
  name: IconName;
  family?: IconFamily;
  variant?: IconVariant;
  action?: IconAction;
  style?: StyleProp<TextStyle>;
}

const iconMap = {
  Feather: Icons.Feather,
  Material: Icons.MaterialIcons,
  AntDesign: Icons.AntDesign,
  FontAwesome: Icons.FontAwesome,
  Ionicons: Icons.Ionicons,
};

const Icon = memo(
  ({
    name,
    family = "Feather",
    variant = "md",
    action = "default",
    style,
  }: IconProps) => {
    const IconComponent = iconMap[family];
    const iconStyles = useIconStyles({action, variant});
    return (
      <IconComponent
        name={name as any}
        size={iconStyles.icon.fontSize}
        color={iconStyles.icon.color}
        style={style}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
