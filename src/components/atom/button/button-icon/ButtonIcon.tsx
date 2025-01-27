import Icon, { IconProps } from '@/src/components/atom/icon/Icon';
import { useButtonContext } from '../ButtonContext';
import { useButtonIconStyles } from './ButtonIcon.style';


interface ButtonIconProps extends IconProps {
}

const ButtonIcon: React.FC<ButtonIconProps> = ({name, family, size, color}) => {
    const { action, variant, type } = useButtonContext();
    const buttonIconStyles = useButtonIconStyles({action, variant, type});
    return <Icon name={name} family={family} size={size} color={color} style={buttonIconStyles.buttonIcon} />
}

export default ButtonIcon;