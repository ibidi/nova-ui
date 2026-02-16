// Theme
export {
  ThemeProvider,
  useTheme,
  lightTheme,
  darkTheme,
} from './theme';
export type {
  ThemeProviderProps,
  NovaTheme,
  NovaThemeOverride,
  NovaColors,
  NovaSpacing,
  NovaRadii,
  NovaTypography,
  NovaShadows,
  ShadowStyle,
} from './theme';

// Components — re-export everything
export {
  // Core
  Button,
  NovaText,
  Input,
  // Layout
  Card,
  Divider,
  Box,
  Stack, HStack, VStack,
  // Data Display
  Avatar,
  Badge, BadgeDot,
  Chip,
  Skeleton,
  Spinner,
  // Form
  NovaSwitch,
  Checkbox,
  RadioGroup,
  OTPInput,
  Progress,
  Slider,
  // Navigation
  Tabs,
  SearchBar,
  Accordion,
  // Utility
  IconButton,
  FAB,
  // Overlay
  NovaModal,
  BottomSheet,
  ToastProvider, useToast,
  // Animated (Aceternity/React Bits)
  GlowCard,
  AnimatedNumber,
  Marquee,
  ShimmerButton,
  GradientText,
  StaggeredList,
  Ripple,
  LogoCloud,
} from './components';

export type {
  // Core
  ButtonProps, ButtonVariant, ButtonSize, ButtonColor,
  NovaTextProps, TextVariant, TextWeight, TextColor, TextAlign,
  NovaInputProps, InputVariant, InputSize,
  // Layout
  CardProps, CardVariant,
  DividerProps, DividerOrientation,
  BoxProps,
  StackProps, HStackProps, VStackProps,
  // Data Display
  AvatarProps, AvatarSize,
  BadgeProps, BadgeDotProps, BadgeVariant, BadgeColor, BadgeSize,
  ChipProps, ChipVariant, ChipColor,
  SkeletonProps, SkeletonVariant,
  SpinnerProps, SpinnerSize, SpinnerColor,
  // Form
  NovaSwitchProps, SwitchColor, SwitchSize,
  CheckboxProps, CheckboxColor, CheckboxSize,
  RadioGroupProps, RadioOption, RadioColor, RadioSize,
  OTPInputProps,
  ProgressProps, ProgressVariant, ProgressColor, ProgressSize,
  SliderProps, SliderColor,
  // Navigation
  TabsProps, TabItem, TabVariant, TabSize,
  SearchBarProps,
  AccordionProps, AccordionItem,
  // Utility
  IconButtonProps, IconButtonVariant, IconButtonSize, IconButtonColor,
  FABProps, FABSize, FABPosition, FABColor,
  // Overlay
  NovaModalProps, ModalSize,
  BottomSheetProps, BottomSheetHeight,
  ToastConfig, ToastType, ToastPosition, ToastContextType,
  // Animated
  GlowCardProps, GlowColor,
  AnimatedNumberProps,
  MarqueeProps, MarqueeDirection,
  ShimmerButtonProps, ShimmerButtonColor,
  GradientTextProps,
  StaggeredListProps, StaggerAnimation,
  RippleProps,
  LogoCloudProps, LogoItem, LogoCloudVariant, LogoCloudColumns, LogoCloudSize,
} from './components';

// Utils
export {
  withOpacity,
  lighten,
  darken,
  isLightColor,
  createSpacing,
} from './utils';
