import Icon, { IconProps } from '@/src/components/atom/icon/Icon';
import { StyleProp } from 'react-native';
import { TextStyle } from 'react-native';
import { IconAction } from '@/src/components/atom/icon/Icon.style';
import { useInputContext } from '@/src/components/atom/input/InputContext';

type  FormInputIconProps = Omit<IconProps, 'style' | 'color' | 'action' | 'size' | 'variant'  > & {
    style?: StyleProp<TextStyle>
}

const iconActionMap: {
    [key in FormInputFilledState]: {
        [key in FormInputStatus]: IconAction
    }
  } = {
    filled: {
     default: 'defaultInverted',
     error: 'danger',
     disabled: 'disabled'
    },
    notFilled: {
      default: 'disabled',
      error: 'danger',
      disabled: 'disabled',
    },
  };


const FormInputIcon: React.FC<FormInputIconProps> = ({name = 'user', family = 'Feather', style}) => {
    const { variant, filled, status } = useInputContext();
    const action = iconActionMap[filled][status]
    return <Icon name={name} family={family} variant={variant} action={action}  style={style} />
}


export default FormInputIcon;