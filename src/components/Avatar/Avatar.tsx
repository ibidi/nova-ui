import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { AvatarProps, AvatarSize } from './Avatar.types';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444',
  '#F59E0B', '#22C55E', '#14B8A6', '#3B82F6',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  rounded = true,
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  const sizeMap: Record<AvatarSize, { container: number; font: number }> = {
    xs: { container: 24, font: theme.typography.fontSize.xs },
    sm: { container: 32, font: theme.typography.fontSize.sm },
    md: { container: 44, font: theme.typography.fontSize.lg },
    lg: { container: 56, font: theme.typography.fontSize.xl },
    xl: { container: 72, font: theme.typography.fontSize['2xl'] },
  };

  const { container: containerSize, font: fontSize } = sizeMap[size];
  const borderRadius = rounded ? containerSize / 2 : theme.radii.md;
  const bgColor = backgroundColor || (name ? getColorFromName(name) : theme.colors.surfaceVariant);

  const showImage = source && !imageError;
  const showInitials = !showImage && name;

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius,
          backgroundColor: bgColor,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={name ? `Avatar of ${name}` : 'Avatar'}
    >
      {showImage && (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: containerSize,
              height: containerSize,
              borderRadius,
            },
          ]}
          onError={() => setImageError(true)}
        />
      )}
      {showInitials && (
        <Text
          style={[
            styles.initials,
            {
              fontSize,
              color: textColor || theme.colors.textInverse,
              fontFamily: theme.typography.fontFamily.semibold,
            },
            textStyle,
          ]}
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    textAlign: 'center',
  },
});
