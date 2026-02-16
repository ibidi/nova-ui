import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import {
  ThemeProvider,
  ToastProvider,
  useTheme,
  useToast,
  // Core
  Button,
  NovaText,
  Input,
  // Layout
  Card,
  Divider,
  Box,
  VStack,
  HStack,
  // Data Display
  Avatar,
  Badge,
  BadgeDot,
  Chip,
  // Form
  NovaSwitch,
  Checkbox,
  RadioGroup,
  // Overlay
  NovaModal,
} from 'nova-native-ui';
import type { RadioOption } from 'nova-native-ui';

// ─── Section Wrapper ───
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <VStack spacing="sm" style={{ marginBottom: theme.spacing.lg }}>
      <NovaText variant="h4" color="primary">{title}</NovaText>
      <Divider />
      {children}
    </VStack>
  );
}

// ─── Button Showcase ───
function ButtonShowcase() {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Section title="Button">
      <NovaText variant="label" color="secondary">Variants</NovaText>
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        <Button variant="solid" color="primary">Solid</Button>
        <Button variant="outline" color="primary">Outline</Button>
        <Button variant="ghost" color="primary">Ghost</Button>
        <Button variant="soft" color="primary">Soft</Button>
      </HStack>

      <NovaText variant="label" color="secondary">Colors</NovaText>
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        <Button color="primary" size="sm">Primary</Button>
        <Button color="secondary" size="sm">Secondary</Button>
        <Button color="success" size="sm">Success</Button>
        <Button color="error" size="sm">Error</Button>
        <Button color="warning" size="sm">Warning</Button>
        <Button color="info" size="sm">Info</Button>
      </HStack>

      <NovaText variant="label" color="secondary">Sizes</NovaText>
      <HStack spacing="sm" align="center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </HStack>

      <NovaText variant="label" color="secondary">States</NovaText>
      <HStack spacing="sm">
        <Button loading={loading} onPress={handleLoading}>
          {loading ? 'Loading...' : 'Click Me'}
        </Button>
        <Button disabled>Disabled</Button>
      </HStack>

      <Button fullWidth variant="outline" color="secondary">Full Width Button</Button>
    </Section>
  );
}

// ─── Text Showcase ───
function TextShowcase() {
  return (
    <Section title="Typography">
      <NovaText variant="h1">Heading 1</NovaText>
      <NovaText variant="h2">Heading 2</NovaText>
      <NovaText variant="h3">Heading 3</NovaText>
      <NovaText variant="h4">Heading 4</NovaText>
      <NovaText variant="body">Body text — the quick brown fox jumps over the lazy dog.</NovaText>
      <NovaText variant="bodySmall" color="secondary">Small body text for secondary information.</NovaText>
      <NovaText variant="caption" color="disabled">Caption text</NovaText>
      <NovaText variant="label">Label Text</NovaText>
      <NovaText variant="overline">Overline Text</NovaText>
      <HStack spacing="md">
        <NovaText weight="bold" color="primary">Bold</NovaText>
        <NovaText italic color="secondary">Italic</NovaText>
        <NovaText underline color="info">Underline</NovaText>
        <NovaText strikethrough color="error">Strike</NovaText>
      </HStack>
    </Section>
  );
}

// ─── Input Showcase ───
function InputShowcase() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Section title="Input">
      <Input
        variant="outline"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        helperText="We'll never share your email"
        keyboardType="email-address"
      />
      <Input
        variant="filled"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        variant="underline"
        label="Username"
        placeholder="Pick a username"
      />
      <Input
        variant="outline"
        label="Error State"
        placeholder="Invalid input"
        errorText="This field is required"
      />
      <Input
        variant="outline"
        label="Disabled"
        placeholder="Cannot edit"
        disabled
      />
    </Section>
  );
}

// ─── Card Showcase ───
function CardShowcase() {
  return (
    <Section title="Card">
      <Card variant="elevated" padding="lg">
        <NovaText variant="h4">Elevated Card</NovaText>
        <NovaText variant="bodySmall" color="secondary">
          This card has a shadow elevation effect.
        </NovaText>
      </Card>
      <Card variant="outlined" padding="lg">
        <NovaText variant="h4">Outlined Card</NovaText>
        <NovaText variant="bodySmall" color="secondary">
          This card has a subtle border.
        </NovaText>
      </Card>
      <Card variant="filled" padding="lg">
        <NovaText variant="h4">Filled Card</NovaText>
        <NovaText variant="bodySmall" color="secondary">
          This card has a background fill.
        </NovaText>
      </Card>
    </Section>
  );
}

// ─── Avatar Showcase ───
function AvatarShowcase() {
  return (
    <Section title="Avatar">
      <HStack spacing="md" align="center">
        <Avatar name="Ihsan Baki Dogan" size="xl" />
        <Avatar name="John Doe" size="lg" />
        <Avatar name="Alice Smith" size="md" />
        <Avatar name="Bob" size="sm" />
        <Avatar name="CK" size="xs" />
      </HStack>
    </Section>
  );
}

// ─── Badge Showcase ───
function BadgeShowcase() {
  return (
    <Section title="Badge">
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        <Badge label="New" color="primary" variant="solid" />
        <Badge label="Sale" color="error" variant="solid" />
        <Badge label="Beta" color="warning" variant="outline" />
        <Badge label="Free" color="success" variant="soft" />
        <Badge label="Pro" color="secondary" variant="solid" />
        <Badge label="Info" color="info" variant="soft" />
      </HStack>
      <HStack spacing="sm" align="center">
        <NovaText variant="body">Status:</NovaText>
        <BadgeDot color="success" />
        <NovaText variant="bodySmall" color="success">Online</NovaText>
      </HStack>
    </Section>
  );
}

// ─── Chip Showcase ───
function ChipShowcase() {
  const [selected, setSelected] = useState<string[]>(['react-native']);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <Section title="Chip">
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        {['react-native', 'typescript', 'ios', 'android', 'expo'].map((tag) => (
          <Chip
            key={tag}
            label={tag}
            selected={selected.includes(tag)}
            onPress={() => toggle(tag)}
            color="primary"
          />
        ))}
      </HStack>
      <HStack spacing="sm">
        <Chip label="Closable" color="error" onClose={() => {}} />
        <Chip label="Disabled" color="secondary" disabled />
      </HStack>
    </Section>
  );
}

// ─── Form Controls Showcase ───
function FormShowcase() {
  const [switchVal, setSwitchVal] = useState(true);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [radio, setRadio] = useState('md');

  const radioOptions: RadioOption[] = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  return (
    <Section title="Form Controls">
      <NovaText variant="label" color="secondary">Switch</NovaText>
      <VStack spacing="sm">
        <NovaSwitch value={switchVal} onValueChange={setSwitchVal} label="Notifications" />
        <NovaSwitch value={true} onValueChange={() => {}} label="Dark Mode" color="secondary" />
        <NovaSwitch value={false} onValueChange={() => {}} label="Disabled" disabled />
      </VStack>

      <NovaText variant="label" color="secondary">Checkbox</NovaText>
      <VStack spacing="sm">
        <Checkbox checked={check1} onCheckedChange={setCheck1} label="I agree to the terms" />
        <Checkbox checked={check2} onCheckedChange={setCheck2} label="Subscribe to newsletter" color="secondary" />
        <Checkbox checked={true} onCheckedChange={() => {}} label="Disabled checked" disabled />
      </VStack>

      <NovaText variant="label" color="secondary">Radio Group</NovaText>
      <RadioGroup
        options={radioOptions}
        value={radio}
        onValueChange={setRadio}
        color="primary"
      />
      <NovaText variant="bodySmall" color="secondary">
        Selected: {radio}
      </NovaText>
    </Section>
  );
}

// ─── Modal Showcase ───
function ModalShowcase() {
  const [visible, setVisible] = useState(false);

  return (
    <Section title="Modal">
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <NovaModal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Example Modal"
        size="md"
      >
        <VStack spacing="md">
          <NovaText variant="body">
            This is a modal dialog. It supports multiple sizes, backdrop close,
            keyboard avoidance, and smooth animations.
          </NovaText>
          <Input label="Your Name" placeholder="Enter your name" />
          <HStack spacing="sm" justify="flex-end">
            <Button variant="ghost" onPress={() => setVisible(false)}>Cancel</Button>
            <Button color="primary" onPress={() => setVisible(false)}>Confirm</Button>
          </HStack>
        </VStack>
      </NovaModal>
    </Section>
  );
}

// ─── Toast Showcase ───
function ToastShowcase() {
  const toast = useToast();

  return (
    <Section title="Toast">
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        <Button
          color="success"
          size="sm"
          onPress={() => toast.show({ type: 'success', title: 'Success!', description: 'Operation completed.' })}
        >
          Success
        </Button>
        <Button
          color="error"
          size="sm"
          onPress={() => toast.show({ type: 'error', title: 'Error!', description: 'Something went wrong.' })}
        >
          Error
        </Button>
        <Button
          color="warning"
          size="sm"
          onPress={() => toast.show({ type: 'warning', title: 'Warning', description: 'Please check your input.' })}
        >
          Warning
        </Button>
        <Button
          color="info"
          size="sm"
          onPress={() => toast.show({ type: 'info', title: 'Info', description: 'Here is some info for you.' })}
        >
          Info
        </Button>
      </HStack>
    </Section>
  );
}

// ─── Layout Showcase ───
function LayoutShowcase() {
  const theme = useTheme();

  return (
    <Section title="Layout (Box, Stack, Divider)">
      <NovaText variant="label" color="secondary">Box with theme spacing</NovaText>
      <Box
        padding="md"
        direction="row"
        align="center"
        gap="sm"
        rounded="lg"
        bg={theme.colors.surfaceVariant}
      >
        <Avatar name="Nova UI" size="sm" />
        <VStack spacing="xs">
          <NovaText variant="label">nova-ui</NovaText>
          <NovaText variant="caption" color="secondary">React Native UI Library</NovaText>
        </VStack>
      </Box>

      <NovaText variant="label" color="secondary">Horizontal Divider</NovaText>
      <Divider />

      <NovaText variant="label" color="secondary">HStack with spacing</NovaText>
      <HStack spacing="sm" align="center">
        <Badge label="Tag 1" color="primary" />
        <Divider orientation="vertical" />
        <Badge label="Tag 2" color="secondary" />
        <Divider orientation="vertical" />
        <Badge label="Tag 3" color="success" />
      </HStack>
    </Section>
  );
}

// ─── Theme Showcase ───
function ThemeShowcase() {
  const theme = useTheme();

  const colors = [
    { label: 'Primary', color: theme.colors.primary },
    { label: 'Secondary', color: theme.colors.secondary },
    { label: 'Success', color: theme.colors.success },
    { label: 'Warning', color: theme.colors.warning },
    { label: 'Error', color: theme.colors.error },
    { label: 'Info', color: theme.colors.info },
  ];

  return (
    <Section title="Theme Colors">
      <HStack spacing="sm" style={{ flexWrap: 'wrap' }}>
        {colors.map((c) => (
          <VStack key={c.label} spacing="xs" align="center">
            <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: c.color }} />
            <NovaText variant="caption">{c.label}</NovaText>
          </VStack>
        ))}
      </HStack>
    </Section>
  );
}

// ─── Main App Content ───
function AppContent() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { padding: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <VStack spacing="xs" style={{ marginBottom: theme.spacing.lg }}>
          <NovaText variant="h2">nova-ui</NovaText>
          <NovaText variant="body" color="secondary">
            Component showcase & example app
          </NovaText>
        </VStack>

        <ThemeShowcase />
        <ButtonShowcase />
        <TextShowcase />
        <InputShowcase />
        <CardShowcase />
        <LayoutShowcase />
        <AvatarShowcase />
        <BadgeShowcase />
        <ChipShowcase />
        <FormShowcase />
        <ModalShowcase />
        <ToastShowcase />

        <Box padding="lg" align="center">
          <NovaText variant="caption" color="secondary">
            nova-native-ui v0.1.0
          </NovaText>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Root App ───
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider darkMode={darkMode}>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});
