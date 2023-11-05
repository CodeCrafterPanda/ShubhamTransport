import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Block, Text} from '../../components';

export default function ImageWrapper({src, style, width}) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [loadingImageSize, setLoadingImageSize] = useState(true);
  const [error, setError] = useState(false);
  const [originalImageWidth, setOriginalImageWidth] = useState(0);
  const [originalImageHeight, setOriginalImageHeight] = useState(0);
  const [finalImageWidth, setFinalImageWidth] = useState(0);
  const [finalImageHeight, setFinalImageHeight] = useState(0);

  useEffect(() => {
    setError(false);
    setLoadingImageSize(true);
    Image.getSize(
      src,
      (w, h) => {
        setOriginalImageWidth(w);
        setOriginalImageHeight(h);
        setLoadingImageSize(false);
        let tempW = width || screenWidth;
        let tempH = tempW * (h / w);
        setFinalImageWidth(tempW);
        setFinalImageHeight(tempH);
      },
      error => {
        setLoadingImageSize(false);
        setError(true);
      },
    );
  }, [src]);

  if (!!loadingImageSize)
    return (
      <Block flex={1} align="center" justify="center">
        <ActivityIndicator size="small" />
      </Block>
    );

  if (!!error)
    return (
      <Block flex={1} align="center" justify="center">
        <Text color={'red'}>Unable to Load Image</Text>
      </Block>
    );

  return (
    <>
      {!!originalImageWidth && !!originalImageHeight && (
        <FastImage
          style={[
            {
              width: finalImageWidth,
              height: finalImageHeight,
              resizeMode: 'contain',
            },
            style,
          ]}
          source={{
            uri: src,
          }}
        />
      )}
    </>
  );
}
