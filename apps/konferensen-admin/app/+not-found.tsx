import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, Box, Card } from "@konferensen/ui";

export default function NotFoundScreen() {
  return (
    <Box>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Card flex={1} alignItems="center" justifyContent="center" padding="m">
        <Text variant="body">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="body">Go to home screen!</Text>
        </Link>
      </Card>
    </Box>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
