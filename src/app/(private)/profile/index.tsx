import { View,  StyleSheet, TouchableOpacity } from "react-native";
import PrivateRouteTemplate from "@/src/components/template/PrivateRouteTemplate";
import { useTheme } from "@/src/providers/ThemeProvider";
import Text from "@/src/components/atom/text/Text";
import { DarkTheme } from "@/src/styles/theme.style";
export default function ProfileIndex() {
    const { theme, toggleTheme } = useTheme();
  return (
    <PrivateRouteTemplate>
      <View style={[styles.container, {backgroundColor: theme.mapped.surface.page.default}]}>
        <View style={styles.contentContainer}>
          <Text variant="h1" action="primary" style={styles.title}>
            Configurations
          </Text>
          
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              Appearance
            </Text>
            
            <TouchableOpacity 
              style={[styles.themeButton, {
                backgroundColor: theme.mapped.surface.default,
                borderColor: theme.mapped.border.default
              }]} 
              onPress={toggleTheme}
            >
              <Text variant="paragraph_medium_16" action="on.default">
                {theme === DarkTheme ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PrivateRouteTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    gap: 32,
  },
  title: {
    marginBottom: 8,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  themeButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
