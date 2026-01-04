import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className={`flex-1 ${className ?? ''}`}>
      {children}
    </SafeAreaView>
  );
};
