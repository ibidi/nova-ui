# nova-ui

A modern, customizable, and accessible React Native UI component library built with TypeScript.

## Features

- **17+ Components** — Buttons, inputs, cards, modals, toasts, and more
- **Theming System** — Light/dark mode with full customization support
- **TypeScript First** — Complete type definitions for all components and props
- **Accessible** — Built with accessibility roles and states
- **Animated** — Smooth animations for interactive components
- **Zero Dependencies** — Only requires React and React Native as peer dependencies
- **Tree Shakeable** — Import only what you need

## Installation

```bash
npm install nova-native-ui
# or
yarn add nova-native-ui
```

### Peer Dependencies

Make sure you have `react` and `react-native` installed:

```bash
npm install react react-native
```

## Quick Start

Wrap your app with `ThemeProvider` and optionally `ToastProvider`:

```tsx
import { ThemeProvider, ToastProvider } from 'nova-native-ui';

export default function App() {
  return (
    <ThemeProvider darkMode={false}>
      <ToastProvider>
        <MyApp />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Components

### Core

#### Button

```tsx
import { Button } from 'nova-native-ui';

<Button variant="solid" color="primary" size="md" onPress={() => {}}>
  Click Me
</Button>

<Button variant="outline" color="error" loading>
  Loading...
</Button>

<Button variant="soft" color="success" leftIcon={<Icon name="check" />}>
  Confirm
</Button>
```

**Props:** `variant` (`solid` | `outline` | `ghost` | `soft`), `color`, `size` (`sm` | `md` | `lg`), `fullWidth`, `loading`, `disabled`, `leftIcon`, `rightIcon`

#### Text (NovaText)

```tsx
import { NovaText } from 'nova-native-ui';

<NovaText variant="h1">Heading 1</NovaText>
<NovaText variant="body" color="secondary">Body text</NovaText>
<NovaText variant="caption" weight="bold" italic>Small bold italic</NovaText>
```

**Props:** `variant` (`h1`-`h4`, `body`, `bodySmall`, `caption`, `label`, `overline`), `weight`, `color`, `align`, `italic`, `underline`, `strikethrough`, `uppercase`

#### Input

```tsx
import { Input } from 'nova-native-ui';

<Input
  variant="outline"
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

<Input
  variant="filled"
  label="Password"
  errorText="Password is required"
  secureTextEntry
/>
```

**Props:** `variant` (`outline` | `filled` | `underline`), `size`, `label`, `helperText`, `errorText`, `leftIcon`, `rightIcon`, `disabled`, `fullWidth`

---

### Layout

#### Card

```tsx
import { Card } from 'nova-native-ui';

<Card variant="elevated" padding="lg" rounded="xl">
  <NovaText>Card content</NovaText>
</Card>
```

**Props:** `variant` (`elevated` | `outlined` | `filled`), `padding` (`none` | `sm` | `md` | `lg`), `rounded`

#### Box

A flexible layout primitive with theme-aware spacing props.

```tsx
import { Box } from 'nova-native-ui';

<Box padding="md" direction="row" align="center" gap="sm" rounded="lg">
  <NovaText>Flexible box</NovaText>
</Box>
```

**Props:** `padding`, `paddingX`, `paddingY`, `margin`, `marginX`, `marginY`, `gap`, `flex`, `direction`, `align`, `justify`, `wrap`, `bg`, `rounded`, `shadow`

#### Stack / HStack / VStack

```tsx
import { VStack, HStack } from 'nova-native-ui';

<VStack spacing="md" align="stretch">
  <HStack spacing="sm" align="center">
    <Avatar name="John" size="sm" />
    <NovaText>John Doe</NovaText>
  </HStack>
</VStack>
```

#### Divider

```tsx
import { Divider } from 'nova-native-ui';

<Divider orientation="horizontal" spacing={16} />
```

---

### Data Display

#### Avatar

```tsx
import { Avatar } from 'nova-native-ui';

<Avatar source={{ uri: 'https://example.com/photo.jpg' }} size="lg" />
<Avatar name="John Doe" size="md" />
```

**Props:** `source`, `name` (generates initials + color), `size` (`xs`-`xl`), `rounded`

#### Badge

```tsx
import { Badge, BadgeDot } from 'nova-native-ui';

<Badge label="New" color="success" variant="solid" />
<Badge label="3" color="error" size="sm" rounded />
<BadgeDot color="success" />
```

#### Chip

```tsx
import { Chip } from 'nova-native-ui';

<Chip label="React Native" variant="soft" color="primary" onPress={() => {}} />
<Chip label="Removable" onClose={() => {}} />
<Chip label="Selected" selected color="secondary" />
```

---

### Form

#### Switch (NovaSwitch)

```tsx
import { NovaSwitch } from 'nova-native-ui';

<NovaSwitch
  value={enabled}
  onValueChange={setEnabled}
  label="Notifications"
  color="primary"
/>
```

#### Checkbox

```tsx
import { Checkbox } from 'nova-native-ui';

<Checkbox
  checked={agreed}
  onCheckedChange={setAgreed}
  label="I agree to the terms"
  color="primary"
/>
```

#### RadioGroup

```tsx
import { RadioGroup } from 'nova-native-ui';

<RadioGroup
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
  value={selected}
  onValueChange={setSelected}
  color="primary"
/>
```

---

### Overlay

#### Modal (NovaModal)

```tsx
import { NovaModal } from 'nova-native-ui';

<NovaModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
>
  <NovaText>Are you sure you want to proceed?</NovaText>
  <Button onPress={() => setShowModal(false)}>Close</Button>
</NovaModal>
```

**Props:** `visible`, `onClose`, `size` (`sm` | `md` | `lg` | `full`), `title`, `closeOnBackdrop`, `showCloseButton`, `animationType`

#### Toast

```tsx
import { ToastProvider, useToast } from 'nova-native-ui';

// Wrap your app
<ToastProvider maxVisible={3}>
  <App />
</ToastProvider>

// Use in any component
function MyComponent() {
  const toast = useToast();

  return (
    <Button onPress={() => toast.show({
      type: 'success',
      title: 'Saved!',
      description: 'Your changes have been saved.',
      duration: 3000,
    })}>
      Save
    </Button>
  );
}
```

---

## Theming

### Custom Theme

```tsx
import { ThemeProvider } from 'nova-native-ui';

const customTheme = {
  colors: {
    primary: '#FF6B6B',
    primaryLight: '#FFA8A8',
    primaryDark: '#C92A2A',
  },
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
  },
};

<ThemeProvider theme={customTheme} darkMode={false}>
  <App />
</ThemeProvider>
```

### Using the Theme Hook

```tsx
import { useTheme } from 'nova-native-ui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.surface, padding: theme.spacing.md }}>
      <Text style={{ color: theme.colors.text }}>Themed content</Text>
    </View>
  );
}
```

---

## Utility Functions

```tsx
import { withOpacity, lighten, darken, isLightColor } from 'nova-native-ui';

withOpacity('#6366F1', 0.5);    // 'rgba(99, 102, 241, 0.5)'
lighten('#6366F1', 0.3);        // lighter shade
darken('#6366F1', 0.3);         // darker shade
isLightColor('#FFFFFF');         // true
```

---

## TypeScript

All components are fully typed. Import types as needed:

```tsx
import type { ButtonProps, NovaTheme, NovaColors } from 'nova-native-ui';
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

MIT
