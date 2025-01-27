import Icon, { IconProps } from '@/src/components/atom/icon/Icon';
import { useInputContext } from '../InputContext';
import useInputIconStyles from './InputIcon.style';

interface InputIconProps extends IconProps {
}


const InputIcon: React.FC<InputIconProps> = ({name, family, size, color}) => {
    const { variant, filled, status } = useInputContext();
    const inputIconStyles = useInputIconStyles({filledState: filled, status, variant});
    return <Icon name={name} family={family} size={size} color={color} style={inputIconStyles.icon} />
}

export default InputIcon;