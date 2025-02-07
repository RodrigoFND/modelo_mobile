import Icon, { IconProps } from '@/src/components/atom/icon/Icon';
import { useFormInputContext } from '../FormInputContext';
import useFormInputIconStyles from './FormInputIcon.style';

interface FormInputIconProps extends IconProps {
}


const FormInputIcon: React.FC<FormInputIconProps> = ({name, family, size, color}) => {
    const { variant, filled, status } = useFormInputContext();
    const inputIconStyles = useFormInputIconStyles({filledState: filled, status, variant});
    return <Icon name={name} family={family} size={size} color={color} style={inputIconStyles.icon} />
}

export default FormInputIcon;