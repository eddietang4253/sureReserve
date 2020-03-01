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
            'https://www.geomotion.com.au/uploads/8/2/5/2/82525882/marina-barrage-singapore_1_orig.jpg',
        },
        {
          name: 'OMB Car park',
          distance: 4,
          time: 20,
          availableSpots: 0,
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/a/ae/NTUC_Centre.JPG',
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
              contentContainerStyle={{paddingBottom: 50}}
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
    maxWidth: 200,
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
