import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { NovaModalProps, ModalSize } from './Modal.types';

export const NovaModal: React.FC<NovaModalProps> = ({
  visible,
  onClose,
  size = 'md',
  title,
  closeOnBackdrop = true,
  showCloseButton = true,
  animationType = 'fade',
  style,
  children,
}) => {
  const theme = useTheme();

  const sizeMap: Record<ModalSize, { width: string; maxHeight: string }> = {
    sm: { width: '75%', maxHeight: '50%' },
    md: { width: '85%', maxHeight: '70%' },
    lg: { width: '92%', maxHeight: '85%' },
    full: { width: '100%', maxHeight: '100%' },
  };

  const { width, maxHeight } = sizeMap[size];

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Pressable
          style={[
            styles.backdrop,
            { backgroundColor: theme.colors.overlay },
          ]}
          onPress={closeOnBackdrop ? onClose : undefined}
        >
          <Pressable
            style={[
              styles.container,
              {
                width,
                maxHeight,
                backgroundColor: theme.colors.surface,
                borderRadius: size === 'full' ? 0 : theme.radii.xl,
                ...theme.shadows.xl,
              },
              style,
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {(title || showCloseButton) && (
              <View
                style={[
                  styles.header,
                  {
                    paddingHorizontal: theme.spacing.md,
                    paddingTop: theme.spacing.md,
                    paddingBottom: theme.spacing.sm,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.borderLight,
                  },
                ]}
              >
                {title && (
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontFamily: theme.typography.fontFamily.semibold,
                      color: theme.colors.text,
                      flex: 1,
                    }}
                  >
                    {title}
                  </Text>
                )}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Close modal"
                    style={styles.closeBtn}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.xl,
                        color: theme.colors.textSecondary,
                        lineHeight: theme.typography.fontSize.xl,
                      }}
                    >
                      ✕
                    </Text>
                  </Pressable>
                )}
              </View>
            )}

            <ScrollView
              style={{ padding: theme.spacing.md }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: {
    padding: 4,
  },
});
