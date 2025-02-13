import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";
import Button from "@/src/components/atom/button/Button";


/* const buttonVariants : { [key in ButtonVariants]: string } = {
  sm: "sm",
  md: "md",
  lg: "lg",

};

const buttonActions : { [key in ButtonActions]: string } = {
  default: "default",
  defaultInverted: "defaultInverted",
  primary: "primary",
  secondary: "secondary",
  warning: "warning",
  danger: "danger",
}; */

/* const buttonData = Object.entries(buttonVariants).flatMap(([variantKey, variant]) =>
  Object.entries(buttonActions).map(([actionKey, action]) => ({
    variant,
    action,
    label: `${actionKey} - ${variantKey}`,
  }))
);
 */
export default function ButtonsPage() {
  return <PrivateRouteTemplate viewStyle={{ justifyContent: "center", alignItems: "center" }}>
    <Button.Root variant="md" action="primary">
      <Button.Text>Button</Button.Text>
    </Button.Root>
  </PrivateRouteTemplate>;
}
