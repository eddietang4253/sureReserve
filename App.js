/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import MapView, {Marker} from 'react-native-maps';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Marina Bay sands open car park',
          distance: 2,
          time: 14,
          availableSpots: 7,
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Marina_Bays_Sands_Hotel_and_ArtScience_Museum_Singapore.jpg/338px-Marina_Bays_Sands_Hotel_and_ArtScience_Museum_Singapore.jpg',
        },
        {
          name: 'Marina financial center',
          distance: 2.3,
          time: 17,
          availableSpots: 170,
          picture:
            'https://www.eco-business.com/media/cache/61/33/6133b1d5dc6a95c040b7b8fcd3a584de.jpg',
        },
        {
          name: 'Marina Barrage car park',
          distance: 2.5,
          time: 14,
          availableSpots: 16,
          picture:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'OMB Car park',
          distance: 4,
          time: 20,
          availableSpots: 0,
          picture:
            'data:image/jpeg;base64,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',
        },
      ],
    };
  }
  sum(array, prop) {
    var total = 0;
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][prop];
    }
    return total;
  }

  render() {
    return (
      <View>
        <MapView
          initialRegion={{
            latitude: 1.298,
            longitude: 103.8579,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.map}>
          <MapView.Marker
            coordinate={{
              latitude: 1.3,
              longitude: 103.86,
            }}>
            <Image
              style={styles.car}
              resizeMode={'contain'}
              source={require('./image/car.png')}
            />
          </MapView.Marker>
        </MapView>
        <View style={styles.header}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('./image/menu.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={{height: 40}}
              placeholder={' Where would you like to park?'}
              placeholderTextColor={'#4A8986'}
              style={{fontWeight: 'bold', paddingLeft: 20}}
            />
            <Image
              source={require('./image/search.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 0, maxHeight: height / 2}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.spotIndicatorContainer}>
              <View style={styles.center}>
                <Text style={styles.spotIndicatorText}>
                  {this.sum(this.state.data, 'availableSpots')} spots available
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.locationIconContainter}>
              <View style={styles.center}>
                <Image
                  source={require('./image/location.png')}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(241, 241, 241,0.7)',
              paddingTop: 15,
              borderRadius: 20,
            }}>
            <View
              style={{
                borderBottomColor: '#70E5C8',
                borderBottomWidth: 3,
                width: 50,
                alignSelf: 'center',
              }}
            />
            <FlatList
              data={this.state.data}
              style={{}}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{
                        uri: item.picture,
                      }}
                      style={styles.picture}
                      resizeMode="cover"
                    />
                    <View style={{justifyContent: 'center', paddingLeft: 10}}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.details}>
                        {item.distance + 'km  -' + item.time + ' mins away'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  map: {
    height: height,
    width: width,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    justifyContent: 'center',
  },
  searchBar: {
    height: 45,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },

  searchIcon: {
    position: 'absolute',
    right: 20,
    width: 25,
    height: 25,
    marginLeft: 10,
    justifyContent: 'center',
  },
  car: {
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  itemContainer: {
    height: 80,
    width: width,
    backgroundColor: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
  },
  picture: {
    height: 80,
    width: 120,
  },
  name: {
    color: '#4A8986',
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    fontSize: 12,
    color: '#c1c1c1',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  spotIndicatorContainer: {
    backgroundColor: '#fff',
    width: 200,
    height: 35,
    borderRadius: 20,
    margin: 10,
    opacity: 0.85,
  },
  spotIndicatorText: {
    color: '#4A8986',
    fontWeight: 'bold',
    fontSize: 15,
  },
  locationIconContainter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  locationIcon: {
    width: 25,
    height: 25,
  },
});
