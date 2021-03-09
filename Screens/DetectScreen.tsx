import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { StackScreenProps } from '@react-navigation/stack';
import {
  DetectScreenScreenNavigationProp,
  RootStackParamList,
} from '../Navigation/StackNavigation';

const { width, height } = Dimensions.get('screen');
// const PORT = '192.168.3.175:9999';

const styles = StyleSheet.create({
  box: { margin: 20 },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DetectScreen = ({
  route,
}: StackScreenProps<RootStackParamList, 'DetectScreen'>) => {
  const [image, setImage] = React.useState<string>('');
  const [txt, setTxt] = React.useState<string>('');
  const [imageForm, setImageForm] = React.useState<ImageInfo | null>(null);
  const [portInput, setPortInput] = React.useState<string>('');
  console.log(route.params.PORT_INPUT);
  // const PORT = '192.168.3.175:9999';
  const PORT = route.params.PORT_INPUT;

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          // eslint-disable-next-line no-alert
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const ImageHanderElement = () => {
    if (image === 'loading')
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: image }}
            style={{
              width,
              height: height / 3,
              flex: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: '#000',
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'white',
              opacity: 0.7,
              width,
              height: height / 2,
              flex: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                // ...StyleSheet.absoluteFillObject,
                width: 400,
                height: 400,
                // flex: 1,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                // shadowColor: '#000',
              }}
              source={
                // eslint-disable-next-line global-require
                require('../assets/gif/animation_640_result.gif')
              }
            />
          </View>
        </View>
      );
    return image ? (
      <Image
        source={{ uri: image }}
        style={{
          width,
          height: height / 2,
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
        }}
      />
    ) : (
      <Image
        style={{
          width,
          height: height / 2,
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
        }}
        source={
          // eslint-disable-next-line global-require
          require('../assets/gif/server.gif')
        }
      />
    );
  };
  const Detect = async () => {
    if (imageForm) {
      setImage('loading');
      const localUri = imageForm.uri;
      const filename = localUri.split('/').pop();
      // Infer the type of the image
      if (filename) {
        const match = /\.(\w+)$/.exec(filename);

        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        const dataPicture = JSON.parse(
          JSON.stringify({ uri: localUri, name: filename, type }),
        );

        formData.append('files', dataPicture);

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        axios
          .post(`http://${PORT}/uploadfilesjs/`, formData, config)
          .then(response => {
            setImage(`http://${PORT}/${response.data.result.path}`);
            setTxt(response.data.result.result);
          })
          .catch(error => {
            // eslint-disable-next-line no-alert
            alert(error);
          });
      }
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });
    if (result.cancelled === false) {
      setImage(result.uri);
      setImageForm(result);
    }
  };
  const ResultElement = () => {
    if (image === 'loading')
      return (
        <Image
          // eslint-disable-next-line global-require
          source={require('../assets/scan.gif')}
          style={{ width: 200, height: 200 }}
        />
      );
    return image ? (
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    ) : (
      <Image
        // eslint-disable-next-line global-require
        source={require('../assets/scan.gif')}
        style={{ width: 200, height: 200 }}
      />
    );
  };
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'white',
            height: height / 2,
            width,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: '#000',
            }}
          >
            <ImageHanderElement />
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            icon="chevron-down-box"
            mode="contained"
            style={styles.box}
            onPress={pickImage}
          >
            Get
          </Button>
          <Button
            icon="chevron-down-box"
            mode="contained"
            style={{
              margin: 20,
            }}
            onPress={Detect}
          >
            detect
          </Button>
          {/* <ResultElement /> */}
          <Text>{txt}</Text>
        </View>
      </View>
    </>
  );
};

export default DetectScreen;
