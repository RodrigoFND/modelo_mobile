
import InputEmail from "./elements/email-input/EmailInput";
import InputNumber from "./elements/number-input/NumberInput";
import InputText from "./elements/text-input/TextInput";
import InputIcon from "./icon/InputIcon";
import { InputRoot } from "./root/InputRoot";

const Input = {
    Root: InputRoot,
    Icon: InputIcon,
    Number: InputNumber,
    Text: InputText,
    Email: InputEmail
}

export { Input };