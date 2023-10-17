import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroAnimatedImage,
} from '@viro-community/react-viro';

const ARScreenYoga = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroAnimatedImage
        source={require('../../assets/yoga-no-background.gif')}
        position={[0, 0, -3]}
        scale={[2, 2, 0]}
      />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ARScreenYoga,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
});
