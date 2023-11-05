// import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
// import React from 'react';
// import RenderHtml, {useInternalRenderer} from 'react-native-render-html';
// import {ZoomWrapper, ImageWrapper} from '../';
// const {width: SCREEN_WIDTH} = Dimensions.get('screen');

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     resizeMode: 'cover',
//     height: 200, // you can adjust this as per requirement or dynamically
//   },
//   break: {
//     height: 10,
//   },
//   liContainer: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   bullet: {
//     width: 10,
//     textAlign: 'center',
//     marginRight: 10,
//   },
//   liText: {
//     flex: 1,
//   },
//   strong: {
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   sup: {
//     fontSize: 10,
//     lineHeight: 10,
//     top: -4, // Adjust this value as needed
//   },
//   paragraph: {
//     marginVertical: 10,
//   },
//   sub: {
//     fontSize: 10,
//     lineHeight: 10,
//     bottom: -4, // Adjust this value as needed
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// const ImageRenderer = props => {
//   const {Renderer, rendererProps, imagesInitialDimensions} =
//     useInternalRenderer('img', props);

//   // Check if the `src` attribute exists using rendererProps or any other relevant data
//   const {uri} = rendererProps?.source;

//   if (!uri) {
//     return <Text style={{color: 'red'}}>No Image</Text>;
//   }

//   // Use the internal Renderer to render the image, or make custom adjustments if necessary
//   return (
//     <ZoomWrapper minZoom={1} maxZoom={5} zoomLevels={2}>
//       <ImageWrapper src={uri} width={SCREEN_WIDTH - 60} />
//     </ZoomWrapper>
//   );
// };

// const StrongRenderer = props => {
//   const {rendererProps} = useInternalRenderer('strong', props);

//   const text = rendererProps?.tnode?.data;

//   if (!text) {
//     return <Text style={{color: 'red'}}>Unable to render.</Text>;
//   }

//   return <Text style={styles.strong}>{text}</Text>;
// };

// const ParaRenderer = props => {
//   const {rendererProps} = useInternalRenderer('p', props);

//   if (contentInsideStrong) {
//     console.log(contentInsideStrong);
//   } else {
//     console.log(
//       'Expected structure not found or <strong> is not the first child of <p>',
//     );
//   }
//   const text = rendererProps?.tnode?.data;

//   if (!text) {
//     return <Text style={{color: 'red'}}>Unable to render.</Text>;
//   }

//   return <Text style={styles.paragraph}>{text}</Text>;
// };

// const renderers = {
//   img: ImageRenderer,
//   // br: () => <View style={styles.break} />,
//   //   ul: (_, children) => <View>{children}</View>,
//   //   li: (_, children) => (
//   //     <View style={styles.liContainer}>
//   //       <Text style={styles.bullet}>•</Text>
//   //       <Text style={styles.liText}>{children}</Text>
//   //     </View>
//   //   ),
//   //   strong:StrongRenderer,
//   //   p:ParaRenderer,
//   //   sup: (_, children) => <Text style={styles.sup}>{children}</Text>,
//   //   sub: (_, children) => <Text style={styles.sub}>{children}</Text>,
// };

// export default function RenderHTMLWrapper({htmlContent}) {
//   // console.log(htmlContent)
//   return (
//     <RenderHtml
//       contentWidth={SCREEN_WIDTH - 60}
//       source={{html: htmlContent}}
//       renderers={renderers}
//     />
//   );
// }
