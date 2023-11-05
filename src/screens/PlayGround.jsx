// import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
// import React, {useEffect} from 'react';
// import Draggable from '../utils-cmp/DraggableWrapper';
// import {Parser} from 'htmlparser2';
// import {ImageWrapper} from '../utils-cmp';
// import MathView,{MathText} from 'react-native-math-view';
// // import {  } from '../components';
// function parseHTMLString(htmlString) {
//   const elements = [];
//   const stack = []; // To keep track of open tags and handle nesting

//   const parser = new Parser({
//     onopentag(name, attribs) {
//       const element = {tagName: name};

//       if (attribs.class) element.class = attribs.class;
//       if (attribs.style) element.style = attribs.style;
//       if (name === 'img' && attribs.src) element.src = attribs.src; // Capture src for img tags

//       if (stack.length > 0) {
//         const parent = stack[stack.length - 1];
//         if (!parent.children) {
//           parent.children = [];
//         }
//         parent.children.push(element);

//         // Add a marker for child's position in parent's textContent
//         parent.textContent = (parent.textContent || '') + '{{child}}';
//       } else {
//         elements.push(element); // Add to root level only if there's no parent
//       }

//       stack.push(element);
//     },
//     ontext(text) {
//       if (stack.length > 0) {
//         const element = stack[stack.length - 1];
//         element.textContent = (element.textContent || '') + text.trim();
//       }
//     },
//     onclosetag() {
//       if (stack.length > 1) {
//         // Check if there's a parent
//         const element = stack.pop();
//         const parent = stack[stack.length - 1];
//         // Replace child marker in parent's textContent with child's content
//         parent.textContent = (parent.textContent || '').replace(
//           '{{child}}',
//           `{{${element.tagName}}}` || '',
//         );
//       } else {
//         stack.pop();
//       }
//     },
//   });

//   parser.write(htmlString);
//   parser.end();

//   return elements;
// }
// export default function PlayGround(props) {
//   const screenWidth = Dimensions.get('window').width;
//   // useEffect(() => {
//   //   const navigationOptions = createNavigationOptions({
//   //     headerTitle: ''+x,
//   //     headerRight: () => (
//   //       <TouchableOpacity onPress={()=>console.log(x)}>
//   //         {/* Your custom headerRight content */}
//   //         <Text>{x}</Text>
//   //       </TouchableOpacity>
//   //     ),
//   //   })(props);

//   //   // Set the navigation options for this screen
//   //   props.navigation.setOptions({
//   //     ...navigationOptions,
//   //   });
//   // }, [x]);

//   const htmlString = `<img class="w-100" style="height:auto;display:block;vertical-align: middle;border:0;" src="https://d19tx39t2q3u48.cloudfront.net/FMGEMCQ/cfd9cc28-d04b-48ca-8689-2c563f2759be.png"><br>
// <ul>
//     <li>Red line – Transpyloric plane</li>
//     <li>Blue line – Mid clavicular line</li>
//     <li>Green Line - Transtubercular plane</li>
//     <li>The Transtubercular plane passes through the tubercles of the iliac crest and the body of vertebra L5 near its upper border.</li>
// </ul>
// <img class="w-100" style="height:auto;display:block;vertical-align: middle;border:0;" src="https://d19tx39t2q3u48.cloudfront.net/FMGEMCQ/8a5a195d-c478-47cc-a260-a6cd2c3866b1.png">
// <p><strong>Reference</strong>: Textbook of Clinical Embryology, Vishram Singh, 2<sup>nd</sup>  <sub>nd</sub> Edition page No – 234</p>

// `;

//   const renderTags = data => {
//     return data.map((item, index) => {
//       switch (item.tagName) {
//         case 'img':
//           return (
//             <ImageWrapper
//               key={`${item.tagName}-${index}`}
//               width={screenWidth - 40}
//               src={item.src}
//             />
//           );
//         case 'br':
//           return <View key={`${item.tagName}-${index}`} style={{height: 10}} />;
//         case 'ul':
//           return (
//             <View key={`${item.tagName}-${index}`}>
//               {item.children && renderTags(item.children)}
//             </View>
//           );
//         case 'li':
//           return (
//             <Text key={`${item.tagName}-${index}`}>{item.textContent}</Text>
//           );
//         case 'p':
//           const contentFragments = item.textContent.split(/{{.*?}}/);
//           const placeholders = (item.textContent.match(/{{.*?}}/g) || []).map(
//             placeholder => placeholder.slice(2, -2),
//           );
//           const childrenComponents = [];

//           contentFragments.forEach((fragment, idx) => {
//             if (fragment) {
//               childrenComponents.push(
//                 <Text
//                   key={`text-${item.tagName}-${idx}`}
//                   style={{}}
//                   numberOfLines={1}>
//                   {fragment}
//                 </Text>,
//               );
//             }

//             if (placeholders[idx]) {
//               const childTag = item.children.find(
//                 child => child.tagName === placeholders[idx],
//               );
//               if (childTag) {
//                 const childComponents = renderTags([childTag]);
//                 childrenComponents.push(
//                   ...childComponents.map(comp =>
//                     React.cloneElement(comp, {
//                       key: `${childTag.tagName}-${idx}`,
//                     }),
//                   ),
//                 );
//               }
//             }
//           });

//           return (
//             <Text
//               key={`${item.tagName}-${index}`}
//               style={{flexDirection: 'row', alignSelf: 'flex-start',textAlignVertical:'center'}}>
//               {childrenComponents}
//             </Text>
//           );

//         case 'strong':
//           return (
//             <Text key={`${item.tagName}-${index}`} style={{fontWeight: 'bold',}}>
//               {item.textContent}
//             </Text>
//           );
//         case 'sup':
//           return (
//             <MathText
//             value={`${item.textContent}`}
//             direction="ltr"
//             CellRendererComponent={<Text />}
//             />
//             // <MathView math={`^{${item.textContent}}`} style={{color:'white',textAlignVertical:'center'}}/>
//           );
//         case 'sub':
//           return (

//             <MathView math={`_{${item.textContent}}`} style={{color:'white',textAlignVertical:'center'}}/>
//           );
//         default:
//           return null;
//       }
//     });
//   };
//   return (
//     // <Text style={{fontSize: 15, color: 'black'}}>
//     //   {JSON.stringify(parseHTMLString(htmlString, null, 2))}
//     // </Text>
//     <View
//       style={{
//         backgroundColor: 'grey',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//       }}>
//       {/* {renderTags(parseHTMLString(htmlString))} */}

//       <MathText
//             value={`\textbf{Reference:} \mathrm{Textbook\ of\ Clinical\ Embryology,\ Vishram\ Singh,\ 2^{nd}\ \textsubscript{nd}\ Edition\ page\ No\ –\ 234}
//             `}
//             direction="ltr"
//             CellRendererComponent={<Text />}
//             style={{marginVertical:0}}
//         />

//       {/* <MathView math="a_{subtext}^{supertext}" style={{color:'white'}}/> */}
//       {/* <Text>
//       <MathView math="_{subtext}" />
//         2<Text style={{fontSize: 10, bottom: -4}}>nd</Text>{' '}
//         <Text style={{fontSize: 10, top: -4}}>th </Text>
//         <MathView math="_{subtext}" />
//         <MathView math="a^{supertext}" />

//       </Text> */}
//     </View>
//     // <Draggable
//     //   initialOffsetX={20}
//     //   initialOffsetY={20}
//     //   onDragStart={v => console.log(v)}
//     //   onDraggging={v => console.log(v)}
//     //   onDragRelease={v => console.log(v)}
//     //   shouldStartDrag={true}
//     //   >
//     //   <View
//     //     style={{
//     //       width: 150,
//     //       height: 80,
//     //       backgroundColor: 'green',
//     //       alignItems: 'center',
//     //       justifyContent: 'center',
//     //       borderRadius: 5,
//     //     }}>
//     //     <Text>PlayGround</Text>
//     //   </View>
//     // </Draggable>
//   );
// }

// const parseStyle = styleString => {
//   const styles = {};
//   styleString.split(';').forEach(style => {
//     const [property, value] = style.split(':');
//     if (property && value) {
//       const formattedProperty = property
//         .trim()
//         .replace(/-([a-z])/g, g => g[1].toUpperCase());
//       styles[formattedProperty] = value.trim();
//     }
//   });
//   return styles;
// };

// const MyComponent = () => {
//   const jsonData = [
//     /* ... your JSON data ... */
//   ];

//   return <View>{renderTags(jsonData)}</View>;
// };

import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useOrientation} from '../hooks';

export const OtpInput = ({
  otpLength = 6,
  onOtpComplete,
  resendOtp,
  customStyle,
}) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const [copiedText, setCopiedText] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    Clipboard.getString().then(text => {
      if (text.length === otpLength && /^[0-9]+$/.test(text)) {
        setCopiedText(true);
      }
    });
  }, []);

  const focusNext = (index, value) => {
    if (index < otpLength - 1 && value) {
      inputsRef.current[index + 1].focus();
    }
    if (index === otpLength - 1 && value) {
      onOtpComplete(otp.join(''));
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp]; // Create a copy of the OTP array
    newOtp[index] = text;
    setOtp(newOtp); // Set the new OTP array

    // Focus the next input or call onOtpComplete after the state has been updated
    if (text) {
      if (index === otpLength - 1) {
        inputsRef.current[index].blur(); // Optionally blur the last input
        onOtpComplete(newOtp.join('')); // Ensure we're using the updated OTP
      } else {
        focusNext(index, text);
      }
    }
  };

  const handleResendOtp = () => {
    setOtp(new Array(otpLength).fill(''));
    inputsRef.current[0].focus();
    resendOtp();
  };

  const handlePasteCopiedText = () => {
    Clipboard.getString().then(text => {
      if (text.length === otpLength && /^[0-9]+$/.test(text)) {
        setOtp([...text]);
        text.split('').forEach((value, index) => {
          inputsRef.current[index].setNativeProps({text: value});
        });
        inputsRef.current[otpLength - 1].focus();
        onOtpComplete(text);
      }
    });
  };

  const handleClearOtp = () => {
    setOtp(new Array(otpLength).fill(''));
    inputsRef.current[0].focus();
  };
  return (
    <>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={{...styles.otpBox, ...customStyle}}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={({nativeEvent}) =>
              focusPrevious(nativeEvent.key, index)
            }
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (inputsRef.current[index] = ref)}
            textContentType="oneTimeCode"
          />
        ))}
      </View>
      <View style={styles.container}>
        <View>
          {copiedText && (
            <TouchableOpacity
              onPress={handlePasteCopiedText}
              style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Paste OTP</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearOtp} style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Clear OTP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
    padding: 10,
  },
  resendButtonText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

const YourScreen = () => {
  const [lockToLandscape, setLockToLandscape] = useState(false);
  const {currentOrientation,previousOrientation, toggleLockToLandScape} = useOrientation();
  const handleOrientationChange = () => {
    let tempLock = lockToLandscape;
    toggleLockToLandScape(!tempLock);
    setLockToLandscape(!tempLock);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.resendButtonText}>Previous Orientation: {previousOrientation}</Text>
      <Text style={styles.resendButtonText}>Current Orientation: {currentOrientation}</Text>
      <TouchableOpacity
        onPress={handleOrientationChange}
        style={styles.resendButton}>
        <Text style={styles.resendButtonText}>
          {!lockToLandscape ? 'Lock' : 'Unlock'} Landscape
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default YourScreen;
