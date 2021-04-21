import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {

  return (
    <TouchableOpacity
      style={styles.button}
      {...rest}
    >
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

export { Button };