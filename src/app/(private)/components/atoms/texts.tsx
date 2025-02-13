import Text from "@/src/components/atom/text/Text";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";

export default function TextsPage() {
  return (
    <PrivateRouteTemplate viewStyle={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="h1_small" weight="bold" action="primary">Text</Text>
    </PrivateRouteTemplate>
  );
}
