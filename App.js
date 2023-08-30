// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {
//   ViroARScene,
//   ViroARPlane,
//   ViroBox,
//   ViroScene,
//   Viro3DObject,
//   Viro360Image,
// } from '@viro-community/react-viro';

// const App = () => {
//   // const jogginGlb = require('./src/assets/jogging.obj');

//   return (
//     <ViroARScene>
//       {/* <Viro3DObject
//         source={jogginGlb}
//         type="OBJ"
//         position={[0.0, 0.0, -10]}
//         scale={[0.1, 0.1, 0.1]}
//       /> */}
//       {/* <Viro3DObject source={require('./assets/jogging.glb')} type="GLB" /> */}
//       <ViroBox position={[0, 0.5, 0]} />
//     </ViroARScene>
//     // <ViroARScene>
//     //   <ViroARPlane>
//     //     <ViroBox position={[0, 0.5, 0]} />
//     //   </ViroARPlane>
//     // </ViroARScene>
//   );
// };

// export default App;

// var styles = StyleSheet.create({});

// import React from 'react';
// import {
//   ViroARScene,
//   Viro3DObject,
//   ViroAmbientLight,
//   Viro360Image,
//   ViroText,
// } from '@viro-community/react-viro';
// import {StyleSheet} from 'react-native';

// const App = () => {
//   // const model = require('./assets/running/images.jpg');

//   return (
//     <ViroARScene>
//       <ViroAmbientLight color="#ffffff" />
//       {/* <Viro3DObject
//         source={model}
//         position={[0, 0, -5]}
//         scale={[0.5, 0.5, 0.5]}
//         type="OBJ"
//       /> */}
//       <ViroText
//         text={'Hello Wold'}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

// export default App;

// var styles = StyleSheet.create({
//   f1: {flex: 1},
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  // Viro3DObject,
  // Viro360Image,
  // Viro360Video,
  ViroAnimatedImage,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {/* <Viro360Image
        source={require('./assets/jogging/scene.gltf')}
        resources={[
          require('./assets/jogging/scene.bin'),
          require('./assets/jogging/textures/Ch08_body_diffuse.png'),
          require('./assets/jogging/textures/Ch08_body_normal.png'),
          require('./assets/jogging/textures/Ch08_body_specularGlossiness.png'),
          require('./assets/jogging/textures/Ch08_body1_diffuse.png'),
          require('./assets/jogging/textures/Ch08_body1_normal.png'),
          require('./assets/jogging/textures/Ch08_body1_specularGlossiness.png'),
          require('./assets/jogging/textures/Ch08_hair_diffuse.png'),
        ]}
        position={[0, 0, -5]}
        scale={[0.5, 0.5, 0.5]}
        type="GLTF"
      /> */}
      <ViroAnimatedImage
        height={2}
        width={2}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        placeholderSource={require('./assets/running.gif')}
        source={require('./assets/running.gif')}
      />
      {/* <Viro3DObject
        source={require('./assets/jogging.glb')}
        position={[0, 0, -5]}
        scale={[0.5, 0.5, 0.5]}
        type="G"
      /> */}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
