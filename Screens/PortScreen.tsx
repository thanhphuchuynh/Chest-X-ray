/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { Audio, Video } from 'expo-av';
import { Button, TextInput } from 'react-native-paper';
import { PortScreenNavigationProp } from '../Navigation/StackNavigation';

type OnboardingScreenProps = {
  navigation: PortScreenNavigationProp;
  PORT_INPUT: string;
};
const { width, height } = Dimensions.get('screen');
const PortScreens: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const animationRef = useRef<LottieView | null>(null);
  const [isLoad, setISLoad] = useState<boolean>(true);
  const [text, setText] = React.useState<string>('');
  useEffect(() => {
    if (isLoad) {
      if (animationRef.current) {
        animationRef.current.play(0, 500);
      }
      const timer = setInterval(() => setISLoad(false), 5000);
      if (!isLoad) clearInterval(timer);
    }
  }, [isLoad]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width,
      }}
    >
      {!isLoad ? (
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
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1 / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 20,
                }}
              >
                Type Port Server
              </Text>
              <Text style={{ fontSize: 10, fontStyle: 'italic' }}>
                ex: 192.168.1.15:9999 or domain
              </Text>
            </View>
            <TextInput
              mode="outlined"
              style={{
                height: 50,
                width: 400,
              }}
              label="PROT"
              value={text}
              onChangeText={text => setText(text)}
            />
            <Button
              icon="chevron-down-box"
              mode="contained"
              style={{
                margin: 20,
              }}
              onPress={() =>
                navigation.navigate('DetectScreen', {
                  PORT_INPUT: text,
                })
              }
            >
              CLICK OK
            </Button>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width,
          }}
        >
          <View
            style={{
              flex: 1 / 2,
              height: height / 4,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LottieView
              style={{
                height: 300,
                width: 300,
              }}
              ref={animationRef}
              // eslint-disable-next-line
           source={require('../assets/json/data1.json')}
              // loop
            />
          </View>
          <View
            style={{
              flex: 1 / 2,
              height: height / 2,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20 }}>Waiting</Text>
              <Image
                style={{
                  width: 200,
                  height: 200,
                }}
                source={
                  // eslint-disable-next-line global-require
                  require('../assets/gif/loading.gif')
                }
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
export default PortScreens;
