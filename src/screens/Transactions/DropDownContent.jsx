import React, {memo, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from './index.styles';

const DropdownContent = memo(
  ({
    data,
    value,
    setValue,
    style,
    placeholder = '',
    searchPlaceholder = '',
  }) => {
    const [isFocus, setIsFocus] = useState(false);
    const DropdownChangeHandler = (value, setter) => {
      setter(value);
      setIsFocus(false);
    };
    return (
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={!!searchPlaceholder}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => DropdownChangeHandler(item.value, setValue)}
      />
    );
  },
);

export default DropdownContent;
